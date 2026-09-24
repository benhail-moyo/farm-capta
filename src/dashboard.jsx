import React from "react";
import { useStore } from "./store.jsx";
import { Heading, Metric, Button, Badge, Empty } from "./ui.jsx";
import { FarmCard } from "./farms.jsx";
import { money, investmentNotice } from "./model.js";
export default function Dashboard({ role, go }) {
  const { state } = useStore();
  const farm = state.farms[0];
  const lender = role === "lender";
  const farmer = ["farmer", "business"].includes(role);
  const applications = state.applications.filter((a) =>
    farmer ? a.farmId === 1 : a.institutionId === "1",
  );
  const pending = applications.filter((a) =>
    ["Submitted", "Screening", "Due Diligence"].includes(a.status),
  );
  const funded = applications.filter((a) =>
    ["Funded", "Monitoring", "Completed"].includes(a.status),
  );
  const title = {
    farmer: "Your farm, moving forward.",
    business: "Grow your agricultural presence.",
    lender: "Agricultural finance intelligence.",
    investor: "Explore agriculture with confidence.",
    admin: "A clearer view of every review.",
  }[role];
  return (
    <>
      <Heading
        eyebrow={`Welcome back, ${state.profiles[role].name.split(" ")[0]}`}
        title={title}
        description="Your working overview of the Farm-Capta demonstration."
      >
        <Button
          primary
          onClick={() =>
            go(
              farmer
                ? "verification"
                : lender
                  ? "discovery"
                  : role === "admin"
                    ? "kyc"
                    : "opportunities",
            )
          }
        >
          {farmer
            ? "View verification"
            : lender
              ? "Discover farms"
              : role === "admin"
                ? "Review cases"
                : "Explore opportunities"}
        </Button>
      </Heading>
      {role === "investor" && <div className="notice">{investmentNotice}</div>}
      <div className="grid cols4">
        {farmer ? (
          <>
            <Metric label="Farm verification" value={farm.status} />
            <Metric
              label="Evidence records"
              value={state.documents.filter((d) => d.farmId === 1).length}
            />
            <Metric
              label="Active applications"
              value={
                applications.filter(
                  (a) => !["Declined", "Completed"].includes(a.status),
                ).length
              }
            />
            <Metric
              label="Financing products"
              value={state.products.filter((p) => p.active).length}
            />
          </>
        ) : lender ? (
          <>
            <Metric
              label="Verified farms"
              value={state.farms.filter((f) => f.status === "Verified").length}
            />
            <Metric label="Awaiting assessment" value={pending.length} />
            <Metric
              label="Demo portfolio"
              value={money(funded.reduce((n, a) => n + a.amount, 0))}
            />
            <Metric label="Active facilities" value={funded.length} />
          </>
        ) : role === "admin" ? (
          <>
            <Metric
              label="Open cases"
              value={
                state.cases.filter(
                  (c) => !["Verified", "Rejected"].includes(c.status),
                ).length
              }
            />
            <Metric
              label="Reports to review"
              value={state.reports.filter((r) => r.status === "Open").length}
            />
            <Metric label="Institutions" value={state.institutions.length} />
            <Metric label="Audit events" value={state.audit.length} />
          </>
        ) : (
          <>
            <Metric label="Saved opportunities" value={state.saved.length} />
            <Metric label="Watchlist" value={state.watchlist.length} />
            <Metric
              label="Notification preferences"
              value={state.waitlist.length}
            />
            <Metric label="Live investments" value="0" />
          </>
        )}
      </div>
      <div className="grid cols2">
        <section className="card">
          <div className="split">
            <h2>
              {role === "admin" ? "Review priorities" : "Your next steps"}
            </h2>
            <span className="pill neutral">Workspace</span>
          </div>
          {(farmer
            ? [
                [
                  "Complete verification",
                  "Add the evidence reviewers need.",
                  "onboarding",
                ],
                [
                  "Manage your documents",
                  "Review sharing and document status.",
                  "documents",
                ],
                [
                  "Plan this season",
                  "Keep milestones and production records current.",
                  "monitoring",
                ],
              ]
            : lender
              ? [
                  [
                    "Review applications",
                    `${pending.length} applications awaiting assessment.`,
                    "applications",
                  ],
                  [
                    "Review portfolio",
                    "Understand crop exposure and active facilities.",
                    "portfolio",
                  ],
                  [
                    "Publish financing",
                    "Manage the products farmers can discover.",
                    "products",
                  ],
                ]
              : role === "admin"
                ? [
                    [
                      "Identity checks",
                      "Review identity evidence and request changes.",
                      "kyc",
                    ],
                    [
                      "Farm verification",
                      "Record evidence-based decisions.",
                      "farm-verification",
                    ],
                    [
                      "Content reports",
                      "Resolve reports from the community.",
                      "reports",
                    ],
                  ]
                : [
                    [
                      "Complete your profile",
                      "Submit a simulated suitability and identity profile.",
                      "onboarding",
                    ],
                    [
                      "Build a watchlist",
                      "Follow farms you want to understand better.",
                      "opportunities",
                    ],
                    [
                      "Understand the risks",
                      "Learn what verification does and does not mean.",
                      "education",
                    ],
                  ]
          ).map(([label, text, page]) => (
            <button className="action-row" key={page} onClick={() => go(page)}>
              <span>
                <strong>{label}</strong>
                <small>{text}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </section>
        <section className="card">
          <h2>
            {farmer
              ? "Seasonal production"
              : role === "admin"
                ? "Recent workspace activity"
                : role === "investor"
                  ? "Your discovery journey"
                  : "Application stages"}
          </h2>
          {farmer ? (
            <>
              <p className="muted">Sample yield · tonnes per hectare</p>
              <div
                className="bar-chart"
                role="img"
                aria-label={`Sample yields: ${farm.history.map((x, i) => `${2023 + i}: ${x} tonnes per hectare`).join(", ")}`}
              >
                {farm.history.map((v, i) => (
                  <div key={i}>
                    <span>{v}</span>
                    <div style={{ height: `${(v / 6) * 130}px` }} />
                    <small>{2023 + i}</small>
                  </div>
                ))}
              </div>
              <Button onClick={() => go("farm-profile")}>
                View production records
              </Button>
            </>
          ) : role === "admin" ? (
            state.audit.slice(0, 4).map((a) => (
              <div className="list-row" key={a.id}>
                <span>{a.text}</span>
              </div>
            ))
          ) : role === "investor" ? (
            <>
              <p className="muted">
                Build understanding before making decisions.
              </p>
              {[
                [
                  "Review farm evidence",
                  "Understand tenure, production and market relationships.",
                  "opportunities",
                ],
                [
                  "Follow a farm",
                  "Keep a focused collection of farms to explore.",
                  "watchlist",
                ],
                [
                  "Learn about risk",
                  "Understand seasonality, liquidity and verification limits.",
                  "education",
                ],
              ].map(([title, text, page]) => (
                <button
                  className="action-row"
                  key={page}
                  onClick={() => go(page)}
                >
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </>
          ) : (
            [
              "Submitted",
              "Screening",
              "Due Diligence",
              "Approved",
              "Monitoring",
            ].map((stage) => (
              <div className="list-row" key={stage}>
                <span>{stage}</span>
                <strong>
                  {applications.filter((a) => a.status === stage).length}
                </strong>
              </div>
            ))
          )}
        </section>
      </div>
      <div className="split section-title">
        <h2>
          {farmer
            ? "Your agricultural profile"
            : role === "admin"
              ? "Farms in the workspace"
              : "Explore farm profiles"}
        </h2>
        <Button
          onClick={() =>
            go(
              farmer
                ? "farm-profile"
                : role === "investor"
                  ? "opportunities"
                  : role === "admin"
                    ? "farm-verification"
                    : "discovery",
            )
          }
        >
          View all
        </Button>
      </div>
      <div className="grid cols3">
        {(farmer ? [farm] : state.farms.slice(0, 3)).map((f) => (
          <FarmCard
            key={f.id}
            farm={f}
            go={go}
            publicView={role === "investor" || role === "admin"}
          />
        ))}
      </div>
    </>
  );
}
