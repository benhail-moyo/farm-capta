import React, { useState } from "react";
import { useStore } from "./store.jsx";
import {
  Button,
  Heading,
  Field,
  Empty,
  Modal,
  Metric,
  Badge,
  Timeline,
  Tabs,
} from "./ui.jsx";
import {
  uid,
  stamp,
  money,
  date,
  eligibility,
  stages,
  transitions,
  canMove,
  investmentNotice,
} from "./model.js";
import { Documents } from "./farms.jsx";

export function Financing({ role, go, manage = false, institutionId }) {
  const { state, update, notify } = useStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [apply, setApply] = useState(false);
  const [create, setCreate] = useState(false);
  const [error, setError] = useState("");
  const farm = state.farms[0];
  const products = state.products.filter(
    (p) =>
      (manage ? p.institutionId === "1" : p.active) &&
      (!institutionId || p.institutionId === institutionId) &&
      `${p.type} ${p.provider} ${p.region}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const checks = selected ? eligibility(farm, selected) : [];
  const eligible = checks.every((c) => c.ok);
  function submit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const amount = Number(d.amount);
    if (amount < selected.min || amount > selected.max) {
      setError(
        `Enter an amount between ${money(selected.min)} and ${money(selected.max)}.`,
      );
      return;
    }
    if (
      state.applications.some(
        (a) =>
          a.farmId === 1 &&
          a.productId === selected.id &&
          !["Declined", "Completed"].includes(a.status),
      )
    ) {
      setError(
        "An active application already exists for this product. Review it in Applications.",
      );
      return;
    }
    update(
      (s) => {
        s.applications.push({
          id: `APP-${uid().slice(0, 8)}`,
          farmId: 1,
          productId: selected.id,
          institutionId: selected.institutionId,
          amount,
          purpose: d.purpose,
          status: "Submitted",
          notes: [],
          history: [{ text: "Demo application submitted", at: stamp() }],
          updated: stamp(),
        });
        s.notifications.unshift({
          id: uid(),
          role: "lender",
          text: "New demo financing application received.",
          page: "applications",
          read: false,
        });
      },
      "Financing application submitted",
      role,
    );
    setSelected(null);
    setApply(false);
    notify("Demo application submitted. No funds were transferred.");
    go("applications");
  }
  return (
    <>
      <Heading
        eyebrow="Financing ecosystem"
        title={manage ? "Financing products" : "Find financing"}
        description="Explore fictional financing products. Eligibility is indicative; applications are simulated."
      >
        {manage && (
          <Button
            primary
            disabled={!state.institutions.find((i) => i.id === "1")?.verified}
            onClick={() => setCreate(true)}
          >
            Publish product
          </Button>
        )}
      </Heading>
      <div className="card">
        <Field
          label="Search by provider, product or region"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="grid cols3">
        {products.map((p) => (
          <article className="card" key={p.id}>
            <span className="pill info">{p.type}</span>
            <h2>{p.provider}</h2>
            <p className="price">
              {money(p.min)} – {money(p.max)}
            </p>
            <dl>
              <dt>Duration</dt>
              <dd>{p.duration}</dd>
              <dt>Region</dt>
              <dd>{p.region}</dd>
              <dt>Eligibility</dt>
              <dd>{p.eligibility}</dd>
              <dt>Documents</dt>
              <dd>{p.docs}</dd>
            </dl>
            {manage ? (
              <div className="actions">
                <Button
                  onClick={() => {
                    setCreate(p);
                    setError("");
                  }}
                >
                  Edit product
                </Button>
                <Button
                  disabled={
                    !p.active &&
                    !state.institutions.find((i) => i.id === p.institutionId)
                      ?.verified
                  }
                  onClick={() =>
                    update(
                      (s) => {
                        s.products.find((x) => x.id === p.id).active =
                          !p.active;
                      },
                      `Product ${p.active ? "unpublished" : "published"}`,
                      role,
                    )
                  }
                >
                  {p.active ? "Unpublish" : "Publish"}
                </Button>
              </div>
            ) : (
              <Button
                primary
                onClick={() => {
                  setSelected(p);
                  setApply(false);
                  setError("");
                }}
              >
                {["farmer", "business"].includes(role)
                  ? "Check eligibility"
                  : "View product"}
              </Button>
            )}
          </article>
        ))}
      </div>
      {!products.length && (
        <Empty
          title="No matching products"
          text="Try a different provider or financing type."
        />
      )}
      {selected && (
        <Modal
          title={apply ? "Start a demo application" : selected.type}
          onClose={() => setSelected(null)}
        >
          <h3>{selected.provider}</h3>
          <p>{selected.eligibility}</p>
          {["farmer", "business"].includes(role) ? (
            <>
              {checks.map((c) => (
                <div className="list-row" key={c.label}>
                  <span>{c.label}</span>
                  <Badge status={c.ok ? "Completed" : "Action Required"} />
                </div>
              ))}
              <p className="notice">
                {eligible
                  ? "Your demo profile meets these initial checks. This is not a credit decision."
                  : "Complete the outstanding profile requirements before applying."}
              </p>
              {!eligible && (
                <Button
                  onClick={() => {
                    setSelected(null);
                    go("verification");
                  }}
                >
                  Review verification
                </Button>
              )}
              {!apply ? (
                <Button
                  primary
                  disabled={!eligible}
                  onClick={() => setApply(true)}
                >
                  Start application
                </Button>
              ) : (
                <form onSubmit={submit}>
                  <Field
                    label="Amount requested (USD)"
                    name="amount"
                    type="number"
                    min={selected.min}
                    max={selected.max}
                    defaultValue={farm.need}
                    required
                  />
                  <Field
                    label="Purpose"
                    name="purpose"
                    textarea
                    required
                    defaultValue={farm.purpose}
                  />
                  <label className="check">
                    <input type="checkbox" required />I agree to share relevant
                    farm information with this demo provider.
                  </label>
                  <p className="muted">
                    The request and provider will appear in your application
                    history.
                  </p>
                  {error && (
                    <p className="error" role="alert">
                      {error}
                    </p>
                  )}
                  <Button primary>Submit demo application</Button>
                </form>
              )}
            </>
          ) : (
            <p>
              Required documents: {selected.docs}. Farmers can check eligibility
              from their demo workspace.
            </p>
          )}
        </Modal>
      )}
      {create && (
        <Modal
          title={
            create.id ? "Edit financing product" : "Publish a financing product"
          }
          onClose={() => setCreate(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = Object.fromEntries(new FormData(e.target));
              if (Number(d.min) > Number(d.max)) {
                setError("Maximum amount must be at least the minimum.");
                return;
              }
              update(
                (s) => {
                  if (create.id) {
                    Object.assign(
                      s.products.find((p) => p.id === create.id),
                      d,
                      { min: Number(d.min), max: Number(d.max) },
                    );
                    return;
                  }
                  s.products.push({
                    ...d,
                    id: uid(),
                    institutionId: "1",
                    provider: s.institutions.find((i) => i.id === "1").name,
                    min: Number(d.min),
                    max: Number(d.max),
                    active: true,
                  });
                },
                create.id
                  ? "Financing product updated"
                  : "Financing product published",
                role,
              );
              setCreate(false);
              setError("");
            }}
          >
            <div className="form-grid">
              {[
                ["type", "Product name"],
                ["min", "Minimum (USD)"],
                ["max", "Maximum (USD)"],
                ["duration", "Duration"],
                ["region", "Regions served"],
                ["eligibility", "Eligibility criteria"],
                ["docs", "Required documents"],
              ].map(([name, label]) => (
                <Field
                  key={name}
                  label={label}
                  name={name}
                  defaultValue={create.id ? create[name] : ""}
                  type={["min", "max"].includes(name) ? "number" : "text"}
                  min="1"
                  required
                />
              ))}
            </div>
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <Button primary>
              {create.id ? "Save product changes" : "Publish demo product"}
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Applications({ role, go }) {
  const { state, update, notify } = useStore();
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState("");
  const [next, setNext] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const lender = role === "lender";
  const rows = state.applications.filter(
    (a) =>
      (lender ? a.institutionId === "1" : a.farmId === 1) &&
      (!filter || a.status === filter),
  );
  const app = state.applications.find((a) => a.id === selected);
  const farm = app && state.farms.find((f) => f.id === app.farmId);
  return (
    <>
      <Heading
        title={lender ? "Applications pipeline" : "My applications"}
        description="Follow each application from submission through assessment and monitoring."
      />
      <div className="card">
        <Field
          label="Filter by status"
          options={stages}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="card table-wrap">
        <table>
          <caption>{rows.length} demo applications</caption>
          <thead>
            <tr>
              {[
                "Reference / farm",
                "Product",
                "Amount",
                "Status",
                "Updated",
                "Action",
              ].map((x) => (
                <th key={x} scope="col">
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>
                    {state.farms.find((f) => f.id === a.farmId)?.name}
                  </strong>
                  <small>{a.id}</small>
                </td>
                <td>
                  {state.products.find((p) => p.id === a.productId)?.type}
                </td>
                <td>{money(a.amount)}</td>
                <td>
                  <Badge status={a.status} />
                </td>
                <td>{date(a.updated)}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSelected(a.id);
                      setNext("");
                      setReason("");
                      setError("");
                    }}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <Empty
            title="No applications in this view"
            text="Change the status filter or explore financing products."
            action="Browse financing"
            onAction={() => go("financing")}
          />
        )}
      </div>
      {app && (
        <Modal title={`Application ${app.id}`} onClose={() => setSelected("")}>
          <div className="split">
            <h3>{farm.name}</h3>
            <Badge status={app.status} />
          </div>
          <p>
            {money(app.amount)} · {app.purpose}
          </p>
          <Button
            onClick={() => {
              setSelected("");
              go(`farm-report/${farm.id}`);
            }}
          >
            Open farm report
          </Button>
          {lender && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!canMove(app, next, role)) {
                  setError("Choose a permitted next stage.");
                  return;
                }
                update(
                  (s) => {
                    const a = s.applications.find((x) => x.id === app.id);
                    a.status = next;
                    a.updated = stamp();
                    a.history.push({ text: `${next}: ${reason}`, at: stamp() });
                    s.notifications.unshift({
                      id: uid(),
                      role: "farmer",
                      text: `Application ${app.id}: ${next}`,
                      page: "applications",
                      read: false,
                    });
                  },
                  `Application moved to ${next}`,
                  role,
                );
                setNext("");
                setReason("");
                notify("Demo application status updated.");
              }}
            >
              <h3>Assessment decision</h3>
              <Field
                label="Next stage"
                options={transitions[app.status] || []}
                value={next}
                onChange={(e) => setNext(e.target.value)}
                required
              />
              <Field
                label="Decision notes"
                textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <Button
                primary
                disabled={!(transitions[app.status] || []).length}
              >
                Update stage
              </Button>
              <p className="muted">
                Funded is a simulated status; no payment is executed.
              </p>
            </form>
          )}
          <h3>Notes</h3>
          {app.notes.map((n, i) => (
            <p key={i}>{n.text}</p>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const text = new FormData(e.target).get("note").trim();
              if (!text) return;
              update(
                (s) =>
                  s.applications
                    .find((a) => a.id === app.id)
                    .notes.push({ text, at: stamp() }),
                "Application note added",
                role,
              );
              e.target.reset();
            }}
          >
            <Field label="Add a note" name="note" textarea required />
            <Button>Add note</Button>
          </form>
          <h3>Activity</h3>
          <Timeline items={app.history} />
        </Modal>
      )}
    </>
  );
}
export function Portfolio({ role, go }) {
  const { state } = useStore();
  if (role === "investor")
    return (
      <>
        <Heading
          title="Your future portfolio"
          description="Investment Marketplace — Coming soon"
        />
        <div className="notice">{investmentNotice}</div>
        <Empty
          title="No live investments"
          text="Build a watchlist and learn about agricultural risks while the marketplace is being developed."
          action="Explore illustrative opportunities"
          onAction={() => go("opportunities")}
        />
      </>
    );
  const rows = state.applications.filter(
    (a) =>
      a.institutionId === "1" &&
      ["Funded", "Monitoring", "Completed"].includes(a.status),
  );
  const total = rows.reduce((n, a) => n + a.amount, 0);
  const crops = Object.entries(
    rows.reduce((acc, a) => {
      const crop = state.farms.find((f) => f.id === a.farmId)?.crop;
      acc[crop] = (acc[crop] || 0) + a.amount;
      return acc;
    }, {}),
  );
  return (
    <>
      <Heading
        title="Portfolio intelligence"
        description="Exposure is derived from the funded demo application records."
      />
      <div className="grid cols3">
        <Metric label="Total demo financing" value={money(total)} />
        <Metric label="Facilities" value={rows.length} />
        <Metric label="Farms" value={new Set(rows.map((a) => a.farmId)).size} />
      </div>
      <div className="grid cols2">
        <div className="card">
          <h2>Crop exposure</h2>
          {crops.map(([crop, amount]) => (
            <div className="exposure" key={crop}>
              <div className="split">
                <span>{crop}</span>
                <strong>{Math.round((amount / total) * 100)}%</strong>
              </div>
              <progress
                value={amount}
                max={total}
                aria-label={`${crop} exposure`}
              />
              {amount / total > 0.4 && (
                <p className="notice">
                  Concentration: {crop} exceeds 40% of the demo portfolio.
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="card">
          <h2>Facilities</h2>
          {rows.map((a) => (
            <div className="list-row" key={a.id}>
              <div>
                <strong>
                  {state.farms.find((f) => f.id === a.farmId)?.name}
                </strong>
                <p>
                  {money(a.amount)} · {a.status}
                </p>
              </div>
              <Button onClick={() => go(`farm-report/${a.farmId}`)}>
                View farm
              </Button>
            </div>
          ))}
        </div>
      </div>
      {!rows.length && (
        <Empty
          title="No funded facilities"
          text="Facilities appear after a lender advances a demo application to Funded."
        />
      )}
    </>
  );
}
export function Opportunities({ page, go, id }) {
  const { state, update, notify } = useStore();
  const farms = state.farms.filter(
    (f) => !["saved", "watchlist"].includes(page) || state[page].includes(f.id),
  );
  const selected = id ? state.farms.find((f) => f.id === Number(id)) : null;
  const toggle = (key, f) => {
    update(
      (s) => {
        s[key] = s[key].includes(f.id)
          ? s[key].filter((x) => x !== f.id)
          : [...s[key], f.id];
      },
      `${key} updated`,
      "investor",
    );
  };
  if (id && !selected)
    return (
      <Empty
        title="Opportunity not found"
        action="Browse opportunities"
        onAction={() => go("opportunities")}
      />
    );
  return (
    <>
      <Heading
        eyebrow="Future investment infrastructure"
        title={
          selected
            ? selected.name
            : page === "saved"
              ? "Saved opportunities"
              : page === "watchlist"
                ? "Your watchlist"
                : "Agricultural opportunities"
        }
        description="Explore the farm evidence. Understand the risks."
      />
      <div className="notice">{investmentNotice}</div>
      {selected ? (
        <>
          <div className="grid cols3">
            <Metric
              label="Illustrative requirement"
              value={money(selected.need)}
            />
            <Metric label="Season" value="2026 / 27" />
            <Metric label="Verification" value={selected.status} />
          </div>
          <div className="card">
            <h2>Production plan & use of funds</h2>
            <p>
              {selected.name} plans {selected.crop.toLowerCase()} production
              across {selected.size} hectares. The illustrative requirement
              supports {selected.purpose.toLowerCase()}.
            </p>
            <dl>
              <dt>Water access</dt>
              <dd>{selected.irrigation}</dd>
              <dt>Market / offtaker</dt>
              <dd>{selected.offtaker}</dd>
              <dt>Historical yields</dt>
              <dd>
                {selected.history.join(", ")} t/ha in the three sample seasons
              </dd>
              <dt>Timeline</dt>
              <dd>
                Planning: October · Planting: November · Monitoring: monthly ·
                Harvest review: April (illustrative)
              </dd>
              <dt>Insurance</dt>
              <dd>
                No cover confirmed. Policy terms and exclusions would require
                assessment.
              </dd>
            </dl>
            <h2>Risks to understand</h2>
            <p>
              Weather, crop disease, water availability, input prices, market
              access and buyer default can affect outcomes. Historical yields do
              not predict future results. Tenure and verification evidence must
              be independently assessed.
            </p>
            <Button onClick={() => go(`business-profile/${selected.id}`)}>
              View public farm profile
            </Button>
          </div>
        </>
      ) : null}
      <div className={selected ? "grid" : "grid cols3"}>
        {(selected ? [selected] : farms).map((f) => (
          <article className="card" key={f.id}>
            <span className="pill warn">Prototype / coming soon</span>
            <h2>{f.name}</h2>
            <p className="muted">
              {f.crop} · {f.loc}
            </p>
            <p className="price">{money(f.need)}</p>
            <Badge status={f.status} />
            <p>Season: 2026/27 · Illustrative duration: 9 months</p>
            <div className="actions">
              {!selected && (
                <Button primary onClick={() => go(`opportunity/${f.id}`)}>
                  View details
                </Button>
              )}
              <Button
                aria-pressed={state.saved.includes(f.id)}
                onClick={() => toggle("saved", f)}
              >
                {state.saved.includes(f.id) ? "Unsave" : "Save"}
              </Button>
              <Button
                aria-pressed={state.watchlist.includes(f.id)}
                onClick={() => toggle("watchlist", f)}
              >
                {state.watchlist.includes(f.id) ? "Unwatch" : "Watch"}
              </Button>
              <Button
                onClick={() => {
                  toggle("waitlist", f);
                  notify(
                    state.waitlist.includes(f.id)
                      ? "Demo notification preference removed."
                      : "Demo notification preference saved. No external email is sent.",
                  );
                }}
              >
                {state.waitlist.includes(f.id)
                  ? "Cancel notification"
                  : "Notify me"}
              </Button>
            </div>
          </article>
        ))}
      </div>
      {!farms.length && !selected && (
        <Empty
          title="Your collection is empty"
          text="Save an opportunity or add a farm to your watchlist."
          action="Explore opportunities"
          onAction={() => go("opportunities")}
        />
      )}
    </>
  );
}
