import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  accessibleDocuments,
  validateFile,
  canMove,
  eligibility,
  safePersist,
} from "../src/model.js";

test("private identity evidence stays out of public and lender document views", () => {
  const s = initialState();
  assert.equal(accessibleDocuments(s, "public", 1).length, 0);
  assert.equal(accessibleDocuments(s, "investor", 1).length, 0);
  assert.equal(accessibleDocuments(s, "farmer", 2).length, 0);
  assert.deepEqual(
    accessibleDocuments(s, "lender", 1).map((d) => d.id),
    ["DOC-1"],
  );
  assert.equal(accessibleDocuments(s, "admin", 1).length, 2);
  s.documents[0].shared = false;
  assert.equal(accessibleDocuments(s, "lender", 1).length, 0);
});
test("uploads reject unsupported, empty and oversized files", () => {
  assert.equal(
    validateFile({ name: "sample.pdf", type: "application/pdf", size: 100 }),
    "",
  );
  for (const file of [
    { name: "payload.svg", type: "image/svg+xml", size: 100 },
    { name: "file.exe", type: "application/pdf", size: 100 },
    { name: "large.png", type: "image/png", size: 11 * 1024 * 1024 },
    { name: "empty.pdf", type: "application/pdf", size: 0 },
  ])
    assert.ok(validateFile(file));
});
test("lender cannot skip assessment or move another institution’s application", () => {
  const app = { institutionId: "1", status: "Submitted" };
  assert.equal(canMove(app, "Screening", "lender"), true);
  assert.equal(canMove(app, "Funded", "lender"), false);
  assert.equal(canMove(app, "Screening", "farmer"), false);
  assert.equal(
    canMove({ ...app, institutionId: "2" }, "Screening", "lender"),
    false,
  );
  assert.equal(
    canMove({ ...app, status: "Declined" }, "Funded", "lender"),
    false,
  );
});
test("verification, financing limits and market evidence gate eligibility", () => {
  const s = initialState();
  const p = s.products[0];
  const farm = s.farms[0];
  assert.equal(
    eligibility(farm, p).every((c) => c.ok),
    false,
  );
  assert.equal(
    eligibility({ ...farm, status: "Verified" }, p).every((c) => c.ok),
    true,
  );
  assert.equal(
    eligibility({ ...farm, status: "Verified", need: 999999 }, p).every(
      (c) => c.ok,
    ),
    false,
  );
  assert.equal(
    eligibility({ ...farm, status: "Verified", offtaker: "Pending" }, p).every(
      (c) => c.ok,
    ),
    false,
  );
});
test("uploaded metadata is session-only, saved demo activities persist", () => {
  const s = initialState();
  s.documents.push({ id: "upload", name: "private-id.pdf", sample: false });
  s.saved.push(2);
  const persisted = safePersist(s);
  assert.equal(
    persisted.documents.some((d) => d.id === "upload"),
    false,
  );
  assert.deepEqual(persisted.saved, [2]);
  assert.equal(
    s.documents.some((d) => d.id === "upload"),
    true,
  );
});
