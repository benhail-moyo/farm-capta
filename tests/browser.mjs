import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";

// Pass a local Playwright installation path; this keeps the runtime dependency optional.
const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
page.setDefaultTimeout(15000);
page.setDefaultNavigationTimeout(30000);
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("test-results", { recursive: true });
const base = process.env.TEST_URL || "http://127.0.0.1:5173";
async function route(role, path) {
  await page.evaluate((r) => sessionStorage.setItem("farmcapta-role", r), role);
  await page.goto(`${base}/#/${role}/${path}`);
  await page.waitForTimeout(150);
}
async function navigate(role, path) {
  await page.evaluate(
    ([r, p]) => {
      location.hash = `/${r}/${p}`;
    },
    [role, path],
  );
  await page.waitForTimeout(120);
}
async function switchRole(role, path = "overview") {
  await page.goto(`${base}/#/public/signin`);
  await page.getByRole("combobox", { name: "Workspace" }).selectOption(role);
  await page.getByRole("button", { name: "Enter workspace" }).click();
  await page.waitForTimeout(150);
  if (path !== "overview") await navigate(role, path);
}
const check = async (name, fn) => {
  await fn();
  console.log(`PASS ${name}`);
};
try {
  await page.goto(base);
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();
  await page.waitForTimeout(350);
  await check("public presentation and browser navigation", async () => {
    assert.match(await page.title(), /Farm-Capta/);
    await page.getByRole("heading", { name: /Good land/ }).waitFor();
    await page.screenshot({
      path: "test-results/landing-desktop.png",
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "How it works", exact: true })
      .click();
    await page.getByRole("heading", { name: "How Farm-Capta works" }).waitFor();
    await page.goBack();
    await page.getByRole("heading", { name: /Good land/ }).waitFor();
  });
  await check("demo login, selected farm report and filters", async () => {
    await switchRole("lender", "discovery");
    await page.getByLabel("Search farms, farmers or districts").fill("Mupfure");
    assert.equal(await page.locator(".farm-card").count(), 1);
    await page.getByRole("button", { name: "View farm report" }).click();
    await page
      .getByRole("heading", {
        name: "Mupfure Agri Estate",
        exact: true,
        level: 1,
      })
      .waitFor();
    await navigate("lender", "discovery");
    await page
      .getByRole("combobox", { name: "Crop", exact: true })
      .selectOption("Horticulture");
    assert.equal(await page.locator(".farm-card").count(), 2);
    await page.getByRole("button", { name: "Clear filters" }).click();
    assert.equal(await page.locator(".farm-card").count(), 5);
    await page.getByRole("button", { name: "Advanced filters" }).click();
    await page
      .getByLabel("Verification status", { exact: true })
      .selectOption("Verified");
    assert.equal(await page.locator(".farm-card").count(), 2);
    await navigate("lender", "overview");
    await page.screenshot({
      path: "test-results/lender-desktop.png",
      fullPage: true,
    });
  });
  await check("onboarding validates and retains step data", async () => {
    await switchRole("farmer", "onboarding");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByText("Email is required.", { exact: true }).waitFor();
    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill("demo@example.test");
    await page.getByLabel("Contact phone").fill("+263771234567");
    await page.getByLabel(/^Password/).fill("fictional-password");
    assert.equal(
      await page.getByLabel(/^Password/).getAttribute("type"),
      "password",
    );
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByRole("button", { name: "Back", exact: true }).click();
    assert.equal(
      await page
        .getByRole("textbox", { name: "Email", exact: true })
        .inputValue(),
      "demo@example.test",
    );
    await navigate("farmer", "overview");
    await navigate("farmer", "onboarding");
    assert.equal(
      await page
        .getByRole("textbox", { name: "Email", exact: true })
        .inputValue(),
      "demo@example.test",
    );
  });
  await check(
    "full farmer submission records evidence without auto-approval",
    async () => {
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      for (let step = 0; step < 6; step++) {
        for (const input of await page.locator("form .field input").all()) {
          const type = (await input.getAttribute("type")) || "text";
          const label = await input.evaluate(
            (el) => el.labels?.[0]?.textContent || "",
          );
          if (type === "file") {
            await input.setInputFiles({
              name: "onboarding-sample.pdf",
              mimeType: "application/pdf",
              buffer: Buffer.from("%PDF-1.4 Fictional evidence"),
            });
            continue;
          }
          const value =
            type === "date"
              ? "1990-01-01"
              : type === "number"
                ? label.includes("Amount")
                  ? "25000"
                  : "12"
                : label.includes("GPS")
                  ? "-17.32, 30.97"
                  : label.includes("Farm name")
                    ? "Nyika Plains Farm"
                    : label.includes("Full legal")
                      ? "Tendai Moyo"
                      : "Fictional sample detail";
          await input.fill(value);
        }
        for (const select of await page.locator("form .field select").all())
          await select.selectOption({ index: 1 });
        await page
          .getByRole("button", { name: "Continue", exact: true })
          .click();
      }
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page
        .getByText("Your agreement is required to submit.", { exact: true })
        .first()
        .waitFor();
      for (const checkbox of await page
        .locator("form input[type=checkbox]")
        .all())
        await checkbox.check();
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page
        .getByRole("heading", { name: "Review", exact: true })
        .waitFor();
      await page.getByLabel("I confirm that the information supplied").check();
      await page
        .getByRole("button", { name: "Submit for verification", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "Verification progress" })
        .waitFor();
      assert.ok(
        (await page.locator(".pill").allTextContents()).every(
          (x) => x === "Submitted",
        ),
      );
      const saved = await page.evaluate(() =>
        localStorage.getItem("farmcapta-demo-v2"),
      );
      assert.ok(!saved.includes("fictional-password"));
      assert.ok(!saved.includes("1990-01-01"));
      assert.ok(!saved.includes("onboarding-sample.pdf"));
    },
  );
  await check("document upload, preview and sharing", async () => {
    await navigate("farmer", "documents");
    await page.getByLabel("PDF, JPG or PNG").setInputFiles({
      name: "sample.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4\nSample fictional evidence"),
    });
    await page
      .getByRole("button", { name: "Add document", exact: true })
      .click();
    await page.getByText("sample.pdf", { exact: true }).waitFor();
    const row = page
      .locator(".list-row")
      .filter({ has: page.getByText("sample.pdf", { exact: true }) });
    await row.getByRole("button", { name: "View", exact: true }).click();
    await page.getByRole("dialog").waitFor();
    await page.getByRole("button", { name: "Close dialog" }).click();
    await row.getByRole("button", { name: "Share", exact: true }).click();
    await switchRole("lender", "farm-report/1");
    await page
      .getByRole("button", { name: "Documents", exact: true })
      .last()
      .click();
    await page.getByText("sample.pdf", { exact: true }).waitFor();
    assert.equal(
      await page.getByText("Sample identity evidence", { exact: true }).count(),
      0,
    );
  });
  await check("admin decision connects to farmer verification", async () => {
    await switchRole("admin", "farm-verification");
    await page.getByRole("button", { name: "Review case" }).first().click();
    await page.getByText("Submitted profile details", { exact: true }).click();
    await page.getByText("1990-01-01", { exact: true }).waitFor();
    await page.getByLabel("Review decision").selectOption("Verified");
    await page
      .getByLabel("Decision reason / next steps")
      .fill("Fictional evidence checked for the presentation.");
    await page
      .getByLabel("I reviewed the available fictional evidence.")
      .check();
    await page.getByRole("button", { name: "Record decision" }).click();
    await switchRole("farmer", "verification");
    assert.ok(
      (await page.locator(".pill").allTextContents()).includes("Verified"),
    );
  });
  await check(
    "eligibility and financing application update lender pipeline",
    async () => {
      await navigate("farmer", "financing");
      await page
        .getByRole("button", { name: "Check eligibility", exact: true })
        .first()
        .click();
      await page
        .getByRole("button", { name: "Start application", exact: true })
        .click();
      await page
        .getByLabel("I agree to share relevant farm information")
        .check();
      await page.getByRole("button", { name: "Submit application" }).click();
      await page
        .getByText("An active application already exists", { exact: false })
        .waitFor();
      await page.getByRole("button", { name: "Close dialog" }).click();
      await switchRole("lender", "applications");
      await page
        .getByRole("button", { name: "Review", exact: true })
        .first()
        .click();
      await page.getByLabel("Next stage").selectOption("Due Diligence");
      await page
        .getByLabel("Decision notes")
        .fill("Review crop budget and buyer evidence.");
      await page.getByRole("button", { name: "Update stage" }).click();
      await page.getByRole("button", { name: "Close dialog" }).click();
      await switchRole("farmer", "applications");
      assert.ok(
        (await page.locator(".pill").allTextContents()).includes(
          "Due Diligence",
        ),
      );
    },
  );
  await check(
    "investor collections persist and details identify the selected farm",
    async () => {
      await switchRole("investor", "opportunities");
      const card = page
        .locator("article")
        .filter({ hasText: "Mupfure Agri Estate" });
      await card.getByRole("button", { name: "Save", exact: true }).click();
      await card.getByRole("button", { name: "Watch", exact: true }).click();
      await card
        .getByRole("button", { name: "Notify me", exact: true })
        .click();
      await navigate("investor", "saved");
      assert.equal(await page.locator("article").count(), 1);
      await page.getByRole("button", { name: "View details" }).click();
      await page
        .getByRole("heading", {
          name: "Mupfure Agri Estate",
          exact: true,
          level: 1,
        })
        .first()
        .waitFor();
      await page.reload();
      await page
        .getByRole("heading", {
          name: "Mupfure Agri Estate",
          exact: true,
          level: 1,
        })
        .first()
        .waitFor();
      await navigate("investor", "watchlist");
      assert.equal(await page.locator("article").count(), 1);
    },
  );
  await check("feed reporting reaches moderation", async () => {
    await navigate("investor", "feed");
    await page
      .getByRole("button", { name: "Report", exact: true })
      .first()
      .click();
    await page
      .getByRole("combobox", { name: "Reason", exact: true })
      .selectOption("Misleading information");
    await page.getByRole("button", { name: "Submit report" }).click();
    await switchRole("admin", "reports");
    await page.getByText("Misleading information", { exact: true }).waitFor();
    await page.getByRole("button", { name: "Resolve report" }).click();
    await page
      .getByLabel("Reason for this change")
      .fill("Reviewed the fictional post.");
    await page.getByRole("button", { name: "Confirm change" }).click();
    await page.getByText("Resolved", { exact: true }).waitFor();
  });
  await check("published products accept new linked applications", async () => {
    await switchRole("lender", "products");
    await page
      .getByRole("button", { name: "Publish product", exact: true })
      .click();
    for (const [label, value] of [
      ["Product name", "Pilot seasonal finance"],
      ["Minimum (USD)", "1000"],
      ["Maximum (USD)", "100000"],
      ["Duration", "9 months"],
      ["Regions served", "National"],
      ["Eligibility criteria", "Verified farm and market evidence"],
      ["Required documents", "Crop budget and tenure evidence"],
    ])
      await page.getByLabel(label).fill(value);
    await page.getByRole("dialog")
      .getByRole("button", { name: "Publish product", exact: true })
      .click();
    await page.getByText("Pilot seasonal finance", { exact: true }).waitFor();
    await switchRole("farmer", "financing/1");
    const product = page
      .locator("article")
      .filter({ hasText: "Pilot seasonal finance" });
    await product.getByRole("button", { name: "Check eligibility" }).click();
    await page
      .getByRole("button", { name: "Start application", exact: true })
      .click();
    await page.getByLabel("I agree to share relevant farm information").check();
    await page.getByRole("button", { name: "Submit application" }).click();
    await page.getByRole("heading", { name: "My applications" }).waitFor();
    await page.getByText("Pilot seasonal finance", { exact: true }).waitFor();
    await switchRole("lender", "applications");
    await page.getByText("Pilot seasonal finance", { exact: true }).waitFor();
    await switchRole("farmer", "institutions/2");
    assert.equal(await page.locator("article").count(), 1);
    await page.getByRole("button", { name: "View financing products" }).click();
    assert.equal(await page.locator("article").count(), 1);
    await page.getByRole("heading", { name: "Zambezi Microfinance" }).waitFor();
  });
  await check("business posts and role-aware messages work", async () => {
    await switchRole("business", "feed");
    await page
      .getByLabel("Share an agricultural update")
      .fill("Presentation sample: planting milestone recorded.");
    await page
      .getByRole("button", { name: "Publish update", exact: true })
      .click();
    await page
      .getByText("Presentation sample: planting milestone recorded.", {
        exact: true,
      })
      .waitFor();
    await navigate("business", "messages");
    await page
      .getByLabel("Message", { exact: false })
      .fill("Can we review this demo crop budget?");
    await page.getByRole("button", { name: "Send message" }).click();
    await switchRole("lender", "messages");
    await page.getByLabel("Conversation").selectOption("business");
    await page
      .getByText("Can we review this demo crop budget?", { exact: true })
      .waitFor();
    await page.getByRole("button", { name: "Block contact" }).click();
    assert.equal(
      await page.getByRole("button", { name: "Send message" }).isDisabled(),
      true,
    );
    await page.getByRole("button", { name: "Unblock", exact: true }).click();
    await switchRole("investor", "messages");
    assert.equal(
      await page.getByLabel("Conversation").locator("option").count(),
      2,
    );
    await page
      .getByLabel("Message", { exact: false })
      .fill("Explain this demo verification status.");
    await page.getByRole("button", { name: "Send message" }).click();
    await page.getByText(/Automated acknowledgement/).waitFor();
  });
  await check(
    "investor suitability answers reach the session review",
    async () => {
      await switchRole("investor", "onboarding");
      await page
        .getByRole("textbox", { name: "Email", exact: true })
        .fill("investor@example.test");
      await page.getByLabel("Contact phone").fill("+263771234567");
      await page.getByLabel(/^Password/).fill("fictional-investor-password");
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      for (let step = 0; step < 5; step++) {
        for (const input of await page.locator("form .field input").all()) {
          const type = (await input.getAttribute("type")) || "text";
          if (type === "file")
            await input.setInputFiles({
              name: "investor-evidence.pdf",
              mimeType: "application/pdf",
              buffer: Buffer.from("%PDF-1.4 fictional"),
            });
          else
            await input.fill(
              type === "date" ? "1992-02-02" : "Fictional investor detail",
            );
        }
        for (const select of await page.locator("form .field select").all())
          await select.selectOption({ index: 1 });
        await page
          .getByRole("button", { name: "Continue", exact: true })
          .click();
      }
      for (const checkbox of await page
        .locator("form input[type=checkbox]")
        .all())
        await checkbox.check();
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page.getByLabel("I confirm that the information supplied").check();
      await page
        .getByRole("button", { name: "Submit for verification", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "Verification progress" })
        .waitFor();
      await switchRole("admin", "kyc");
      await page
        .locator("tr")
        .filter({ hasText: "Investor profile" })
        .getByRole("button", { name: "Review case" })
        .click();
      await page
        .getByText("Submitted profile details", { exact: true })
        .click();
      await page.getByText("Loss tolerance", { exact: true }).waitFor();
      await page.getByText("1992-02-02", { exact: true }).waitFor();
      assert.ok(
        !(
          await page.evaluate(() => localStorage.getItem("farmcapta-demo-v2"))
        ).includes("1992-02-02"),
      );
      await page.getByRole("button", { name: "Close dialog" }).click();
    },
  );
  await check(
    "all role pages render and reject unavailable routes",
    async () => {
      const pages = {
        farmer: [
          "overview",
          "farm-profile",
          "verification",
          "financing",
          "applications",
          "monitoring",
          "documents",
          "institutions",
          "feed",
          "news",
          "messages",
          "profile",
        ],
        lender: [
          "overview",
          "discovery",
          "applications",
          "portfolio",
          "monitoring",
          "reports",
          "products",
          "institution",
          "feed",
          "news",
          "messages",
          "profile",
        ],
        investor: [
          "overview",
          "opportunities",
          "saved",
          "watchlist",
          "portfolio",
          "verification",
          "education",
          "feed",
          "news",
          "messages",
          "profile",
        ],
        business: [
          "overview",
          "farm-profile",
          "verification",
          "documents",
          "financing",
          "applications",
          "monitoring",
          "feed",
          "institutions",
          "news",
          "messages",
          "profile",
        ],
        admin: [
          "overview",
          "kyc",
          "farm-verification",
          "users",
          "institutions",
          "content",
          "reports",
          "audit",
          "settings",
          "profile",
        ],
      };
      for (const [role, paths] of Object.entries(pages)) {
        await switchRole(role);
        for (const path of paths) {
          await navigate(role, path);
          assert.equal(
            await page.locator("main h1").count(),
            1,
            `${role}/${path}`,
          );
          assert.equal(
            await page
              .getByText("This page isn’t available in your workspace", {
                exact: true,
              })
              .count(),
            0,
            `${role}/${path}`,
          );
        }
      }
      await switchRole("farmer", "kyc");
      await page
        .getByRole("heading", {
          name: "This page isn’t available in your workspace",
        })
        .waitFor();
    },
  );
  await check("mobile secondary navigation and overflow", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await switchRole("farmer");
    await page.getByRole("button", { name: "Open all navigation" }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Documents", exact: true })
      .click();
    await page
      .getByRole("heading", { name: "Documents", exact: true })
      .waitFor();
    for (const path of [
      "overview",
      "feed",
      "documents",
      "onboarding",
      "farm-profile",
      "applications",
    ]) {
      await navigate("farmer", path);
      const widths = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        width: innerWidth,
      }));
      assert.ok(
        widths.scroll <= widths.width + 1,
        `${path}: ${JSON.stringify(widths)}`,
      );
    }
    await navigate("farmer", "overview");
    await page.screenshot({
      path: "test-results/farmer-mobile.png",
      fullPage: true,
    });
    await page.goto(`${base}/#/public/home`);
    await page.waitForTimeout(5100);
    await page.screenshot({
      path: "test-results/landing-mobile.png",
      fullPage: true,
    });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
  });
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log("All browser checks passed.");
} catch (error) {
  await page.screenshot({ path: "test-results/failure.png", fullPage: true });
  console.error((await page.locator("body").innerText()).slice(0, 5000));
  console.error("Runtime errors:", errors);
  throw error;
} finally {
  await browser.close();
}
