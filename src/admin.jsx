import React, { useState } from "react";
import { useStore } from "./store.jsx";
import {
  Button,
  Heading,
  Field,
  Empty,
  Modal,
  Badge,
  Timeline,
  download,
} from "./ui.jsx";
import { roles, names, uid, stamp } from "./model.js";
import { Documents } from "./farms.jsx";
export function Admin({ page }) {
  const { state, update, notify, submissions } = useStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [action, setAction] = useState("");
  const [confirm, setConfirm] = useState(null);
  const review = state.cases.find((c) => c.id === selected);
  const log = (fn, text) => update(fn, text, "admin");
  const title =
    {
      kyc: "Identity review queue",
      "farm-verification": "Farm verification",
      users: "User management",
      institutions: "Institution review",
      content: "Content moderation",
      reports: "Reports & flags",
      audit: "Audit activity",
      settings: "Workspace settings",
    }[page] || "Compliance";
  return (
    <>
      <Heading
        eyebrow="Compliance workspace"
        title={title}
        description="Review evidence, record decisions and manage your workspace."
      />
      {["kyc", "farm-verification"].includes(page) && (
        <>
          <div className="card">
            <Field
              label="Search cases"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="card table-wrap">
            <table>
              <thead>
                <tr>
                  {["Case", "Subject", "Type", "Status", "Action"].map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.cases
                  .filter(
                    (c) =>
                      (page === "farm-verification"
                        ? c.kind === "Farm verification"
                        : c.kind !== "Farm verification") &&
                      `${c.name} ${c.id} ${c.status}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                  )
                  .map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.kind}</td>
                      <td>
                        <Badge status={c.status} />
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            setSelected(c.id);
                            setAction("");
                          }}
                        >
                          Review case
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {page === "users" && (
        <div className="card">
          {roles.map((r) => (
            <div className="list-row" key={r}>
              <div>
                <strong>{state.profiles[r].name}</strong>
                <p className="muted">
                  {r} · {state.profiles[r].email}
                </p>
              </div>
              <div className="actions">
                <Badge
                  status={state.suspended.includes(r) ? "Suspended" : "Active"}
                />
                <Button
                  disabled={r === "admin"}
                  onClick={() =>
                    setConfirm({ type: "user", id: r, name: names[r] })
                  }
                >
                  {state.suspended.includes(r)
                    ? "Restore access"
                    : "Suspend access"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {page === "institutions" && (
        <div className="card">
          {state.institutions.map((i) => (
            <div className="list-row" key={i.id}>
              <div>
                <strong>{i.name}</strong>
                <p>{i.description}</p>
                <Badge
                  status={
                    i.verified
                      ? "Institutional Account Verified"
                      : "Under Review"
                  }
                />
              </div>
              <Button
                onClick={() =>
                  setConfirm({ type: "institution", id: i.id, name: i.name })
                }
              >
                {i.verified ? "Return to review" : "Approve institution"}
              </Button>
            </div>
          ))}
        </div>
      )}
      {page === "content" && (
        <div className="card">
          {state.posts.map((p) => (
            <div className="list-row" key={p.id}>
              <div>
                <strong>{p.author}</strong>
                <p>{p.text}</p>
                <Badge status={p.hidden ? "Hidden" : "Published"} />
              </div>
              <Button
                onClick={() =>
                  setConfirm({ type: "post", id: p.id, name: p.author })
                }
              >
                {p.hidden ? "Restore post" : "Hide post"}
              </Button>
            </div>
          ))}
        </div>
      )}
      {page === "reports" && (
        <div className="card">
          {state.reports.length ? (
            state.reports.map((r) => (
              <div className="list-row" key={r.id}>
                <div>
                  <strong>{r.reason}</strong>
                  <p className="muted">
                    Reporter: {r.reporter} · {r.postId || "Conversation"}
                  </p>
                  <Badge status={r.status} />
                </div>
                <Button
                  disabled={r.status === "Resolved"}
                  onClick={() =>
                    setConfirm({ type: "report", id: r.id, name: r.reason })
                  }
                >
                  Resolve report
                </Button>
              </div>
            ))
          ) : (
            <Empty
              title="No reports to review"
              text="Reports from posts and conversations appear here."
            />
          )}
        </div>
      )}
      {page === "audit" && (
        <div className="card">
          <div className="split">
            <Field
              label="Search audit activity"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              onClick={() =>
                download(
                  "farmcapta-audit.json",
                  JSON.stringify(state.audit, null, 2),
                  "application/json",
                )
              }
            >
              Export audit
            </Button>
          </div>
          <p className="notice">
            Activity is stored in this browser; it is not a tamper-proof audit
            trail.
          </p>
          <Timeline
            items={state.audit
              .filter((a) =>
                `${a.actor} ${a.text}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .map((a) => ({ ...a, text: `${a.actor}: ${a.text}` }))}
          />
        </div>
      )}
      {page === "settings" && (
        <div className="card">
          <h2>Display preferences</h2>
          <label className="check">
            <input
              type="checkbox"
              checked={state.settings.compact}
              onChange={(e) =>
                log((s) => {
                  s.settings.compact = e.target.checked;
                }, "Display density updated")
              }
            />
            Compact desktop spacing
          </label>
          <p className="muted">Preferences apply to this browser.</p>
        </div>
      )}
      {review && (
        <Modal title={`Review ${review.name}`} onClose={() => setSelected("")}>
          <Badge status={review.status} />
          <Timeline items={review.notes} />
          <details className="card">
            <summary>Submitted profile details</summary>
            {submissions.current.has(review.id) ? (
              submissions.current.get(review.id).map((section) => (
                <section className="review-section" key={section.title}>
                  <h3>{section.title}</h3>
                  <dl>
                    {section.fields.map((field) => (
                      <React.Fragment key={field.label}>
                        <dt>{field.label}</dt>
                        <dd>{String(field.value || "Not provided")}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </section>
              ))
            ) : (
              <p className="muted">
                No session submission is available. Seeded cases use fictional
                evidence; newly entered identity and suitability answers clear
                on refresh. Request a fresh submission to review those answers.
              </p>
            )}
          </details>
          <Documents role="admin" farmId={review.farmId} embedded />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const note = new FormData(e.target).get("note").trim();
              if (!note) return;
              log((s) => {
                const c = s.cases.find((c) => c.id === review.id);
                c.status = action;
                c.notes.push({ text: note, at: stamp() });
                if (c.kind === "Farm verification") {
                  const f = s.farms.find((f) => f.id === c.farmId);
                  if (f) {
                    f.status = action;
                    f.ready =
                      action === "Verified" ? "Strong" : "Pending assessment";
                    f.date = action === "Verified" ? stamp() : null;
                  }
                }
                s.notifications.unshift({
                  id: uid(),
                  role: c.role,
                  text: `${c.kind}: ${action}. ${note}`,
                  page: "verification",
                  read: false,
                });
              }, `${review.kind} decision: ${action}`);
              setSelected("");
              notify("Review recorded and a workspace notification added.");
            }}
          >
            <Field
              label="Review decision"
              options={[
                "Under Review",
                "Action Required",
                "Verified",
                "Rejected",
              ]}
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
            />
            <Field
              label="Decision reason / next steps"
              name="note"
              textarea
              required
            />
            <label className="check">
              <input type="checkbox" required />I reviewed the available
              fictional evidence.
            </label>
            <Button primary>Record decision</Button>
          </form>
        </Modal>
      )}
      {confirm && (
        <Modal
          title={`Confirm action: ${confirm.name}`}
          onClose={() => setConfirm(null)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const reason = new FormData(e.target).get("reason").trim();
              if (!reason) return;
              log((s) => {
                if (confirm.type === "user") {
                  s.suspended = s.suspended.includes(confirm.id)
                    ? s.suspended.filter((r) => r !== confirm.id)
                    : [...s.suspended, confirm.id];
                }
                if (confirm.type === "institution") {
                  const i = s.institutions.find((i) => i.id === confirm.id);
                  i.verified = !i.verified;
                  if (!i.verified)
                    s.products
                      .filter((p) => p.institutionId === i.id)
                      .forEach((p) => {
                        p.active = false;
                      });
                }
                if (confirm.type === "post") {
                  const p = s.posts.find((p) => p.id === confirm.id);
                  p.hidden = !p.hidden;
                }
                if (confirm.type === "report")
                  s.reports.find((r) => r.id === confirm.id).status =
                    "Resolved";
              }, `${confirm.type} updated: ${reason}`);
              setConfirm(null);
              notify("Administrative action recorded.");
            }}
          >
            <Field
              label="Reason for this change"
              name="reason"
              textarea
              required
            />
            <Button primary>Confirm change</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
