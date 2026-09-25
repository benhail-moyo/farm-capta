import React, { useEffect, useState } from "react";
import { MapPin, ArrowUpRight, FileText, Upload, Check } from "lucide-react";
import { useStore } from "./store.jsx";
import { FarmMap } from "./farm-map.jsx";
import { parseGPS } from "./locations.js";
import {
  Button,
  Heading,
  Metric,
  Badge,
  Field,
  Empty,
  Modal,
  Tabs,
  download,
} from "./ui.jsx";
import {
  accessibleDocuments,
  validateFile,
  money,
  date,
  uid,
  stamp,
  investmentNotice,
} from "./model.js";

export function FarmCard({ farm, go, publicView = false }) {
  return (
    <article className="card farm-card">
      <div
        className={`farm-art crop-${farm.crop.toLowerCase()}`}
        aria-hidden="true"
      >
        <span>{farm.crop}</span>
        <span>{farm.size} ha</span>
      </div>
      <div className="split">
        <h3>{farm.name}</h3>
        <Badge status={farm.status} />
      </div>
      <p className="muted location">
        <MapPin size={14} />
        {farm.loc}
      </p>
      <div className="farm-facts">
        <div>
          <small>Financing request</small>
          <strong>{money(farm.need)}</strong>
        </div>
        <div>
          <small>Readiness</small>
          <strong>{farm.ready}</strong>
        </div>
      </div>
      <Button
        className="full"
        onClick={() =>
          go(`${publicView ? "business-profile" : "farm-report"}/${farm.id}`)
        }
      >
        {publicView ? "View public profile" : "View farm report"}
        <ArrowUpRight size={16} />
      </Button>
    </article>
  );
}
export function Discovery({ go }) {
  const { state } = useStore();
  const [filter, setFilter] = useState({
    q: "",
    province: "",
    crop: "",
    ready: "",
    status: "",
    min: "",
    max: "",
    tenure: "",
    irrigation: "",
  });
  const [advanced, setAdvanced] = useState(false);
  const change = (key, value) => setFilter((x) => ({ ...x, [key]: value }));
  const farms = state.farms.filter(
    (f) =>
      `${f.name} ${f.farmer} ${f.crop} ${f.loc}`
        .toLowerCase()
        .includes(filter.q.toLowerCase()) &&
      (!filter.province || filter.province === f.province) &&
      (!filter.crop || filter.crop === f.crop) &&
      (!filter.ready || filter.ready === f.ready) &&
      (!filter.status || filter.status === f.status) &&
      (!filter.tenure || filter.tenure === f.tenure) &&
      (!filter.min || f.size >= Number(filter.min)) &&
      (!filter.max || f.need <= Number(filter.max)) &&
      (!filter.irrigation ||
        f.irrigation.toLowerCase().includes(filter.irrigation.toLowerCase())),
  );
  return (
    <>
      <Heading
        eyebrow="Agricultural intelligence"
        title="Discover farms"
        description="Find the evidence behind the opportunity."
      />
      <div className="card filter-panel">
        <div className="form-grid">
          <Field
            label="Search farms, farmers or districts"
            value={filter.q}
            onChange={(e) => change("q", e.target.value)}
          />
          {[
            ["province", "Province"],
            ["crop", "Crop"],
            ["ready", "Readiness"],
          ].map(([key, label]) => (
            <Field
              key={key}
              label={label}
              options={[...new Set(state.farms.map((f) => f[key]))]}
              value={filter[key]}
              onChange={(e) => change(key, e.target.value)}
            />
          ))}
        </div>
        <div className="actions">
          <Button
            aria-expanded={advanced}
            onClick={() => setAdvanced(!advanced)}
          >
            Advanced filters
          </Button>
          <Button
            onClick={() =>
              setFilter({
                q: "",
                province: "",
                crop: "",
                ready: "",
                status: "",
                min: "",
                max: "",
                tenure: "",
                irrigation: "",
              })
            }
          >
            Clear filters
          </Button>
        </div>
        {advanced && (
          <div className="form-grid">
            <Field
              label="Verification status"
              options={[...new Set(state.farms.map((f) => f.status))]}
              value={filter.status}
              onChange={(e) => change("status", e.target.value)}
            />
            <Field
              label="Tenure evidence"
              options={[...new Set(state.farms.map((f) => f.tenure))]}
              value={filter.tenure}
              onChange={(e) => change("tenure", e.target.value)}
            />
            <Field
              label="Minimum size (ha)"
              type="number"
              min="0"
              value={filter.min}
              onChange={(e) => change("min", e.target.value)}
            />
            <Field
              label="Maximum request (USD)"
              type="number"
              min="0"
              value={filter.max}
              onChange={(e) => change("max", e.target.value)}
            />
            <Field
              label="Water / irrigation keyword"
              value={filter.irrigation}
              onChange={(e) => change("irrigation", e.target.value)}
            />
          </div>
        )}
      </div>
      <p role="status" className="muted">
        {farms.length} farm{farms.length !== 1 ? "s" : ""} found
      </p>
      <div className="grid cols2">
        {farms.map((f) => (
          <FarmCard key={f.id} farm={f} go={go} />
        ))}
      </div>
      <FarmMap farms={farms} go={go} />
      {!farms.length && (
        <Empty
          title="No matching farms"
          text="Clear some filters or try another farm, crop or district."
        />
      )}
    </>
  );
}
export function Documents({ role, farmId = 1, embedded = false }) {
  const { state, update, files, notify } = useStore();
  const [type, setType] = useState("Land tenure");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState(null);
  const [remove, setRemove] = useState(null);
  const [shared, setShared] = useState(false);
  const [url, setUrl] = useState("");
  const owner = ["farmer", "business"].includes(role) && farmId === 1;
  const docs = accessibleDocuments(state, role, farmId);
  useEffect(() => {
    if (!view || !files.current.has(view.id)) {
      setUrl("");
      return;
    }
    const next = URL.createObjectURL(files.current.get(view.id));
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [view]);
  async function upload(e) {
    e.preventDefault();
    const err = validateFile(selected);
    if (err) {
      setError(err);
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 250));
    const id = uid();
    files.current.set(id, selected);
    update(
      (s) =>
        s.documents.push({
          id,
          farmId,
          name: selected.name,
          type,
          status: "Submitted",
          sample: false,
          shared: shared && type !== "Identity",
        }),
      "Supporting document added",
      role,
    );
    setSelected(null);
    setBusy(false);
    setError("");
    e.target.reset();
    notify("Document added to this session. Refresh clears uploaded files.");
  }
  return (
    <>
      {!embedded && (
        <Heading
          title="Documents"
          description="Organise your verification evidence. Uploaded files stay in memory and clear on refresh."
        />
      )}
      {owner && (
        <form className="card" onSubmit={upload}>
          <h2>Add supporting evidence</h2>
          <div className="form-grid">
            <Field
              label="Document type"
              options={[
                "Identity",
                "Land tenure",
                "Production",
                "Buyer evidence",
                "Other",
              ]}
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
            <Field
              label="PDF, JPG or PNG · up to 10 MB"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                setSelected(e.target.files[0]);
                setError("");
              }}
              error={error}
            />
          </div>
          <label className="check">
            <input
              type="checkbox"
              checked={shared}
              disabled={type === "Identity"}
              onChange={(e) => setShared(e.target.checked)}
            />
            Share this non-identity document with financing partners
          </label>
          <Button primary disabled={busy}>
            <Upload size={16} />
            {busy ? "Adding document…" : "Add document"}
          </Button>
        </form>
      )}
      <div className="card">
        <h2>Evidence library</h2>
        {docs.length ? (
          docs.map((d) => (
            <div className="list-row" key={d.id}>
              <div>
                <strong>
                  <FileText size={15} /> {d.name}
                </strong>
                <p className="muted small-text">
                  {d.type} ·{" "}
                  {d.sample ? "Fictional sample" : "Session-only upload"} ·{" "}
                  {d.shared ? "Partner access" : "Private"}
                </p>
              </div>
              <div className="actions">
                <Badge status={d.status} />
                <Button onClick={() => setView(d)}>View</Button>
                {owner && (
                  <>
                    <Button
                      onClick={() =>
                        update(
                          (s) => {
                            const x = s.documents.find((x) => x.id === d.id);
                            x.shared = !x.shared;
                          },
                          "Document sharing preference updated",
                          role,
                        )
                      }
                      disabled={d.type === "Identity"}
                    >
                      {d.shared ? "Make private" : "Share"}
                    </Button>
                    <Button onClick={() => setRemove(d)}>Remove</Button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty
            title="No accessible documents"
            text="Private identity documents are available only to the owner and compliance reviewers."
          />
        )}
      </div>
      {view && (
        <Modal title={view.name} onClose={() => setView(null)}>
          {view.sample ? (
            <>
              <p className="notice">
                Fictional evidence preview. No real identity or land document is
                included.
              </p>
              <div className="sample-document">
                <span>FARM-CAPTA / SAMPLE EVIDENCE</span>
                <h2>{view.type}</h2>
                <p>Reference: {view.id}</p>
                <p>
                  Evidence supplied for demonstration of the review workflow.
                </p>
                <Badge status={view.status} />
              </div>
              <Button
                onClick={() =>
                  download(
                    `${view.id}.txt`,
                    `Fictional sample evidence\n${view.name}\nType: ${view.type}\nStatus: ${view.status}`,
                  )
                }
              >
                Download sample
              </Button>
            </>
          ) : url ? (
            <>
              {files.current.get(view.id)?.type.startsWith("image/") ? (
                <img
                  className="document-preview"
                  src={url}
                  alt={`Preview of ${view.name}`}
                />
              ) : (
                <iframe
                  className="document-frame"
                  title={view.name}
                  src={url}
                />
              )}
              <a className="btn" href={url} download={view.name}>
                Download selected file
              </a>
            </>
          ) : (
            <Empty
              title="File no longer available"
              text="Upload the file again. Uploaded contents are not saved across refreshes."
            />
          )}
          {role === "admin" && (
            <div className="actions">
              {["Documents Reviewed", "Action Required", "Rejected"].map(
                (status) => (
                  <Button
                    key={status}
                    onClick={() => {
                      update(
                        (s) => {
                          s.documents.find((d) => d.id === view.id).status =
                            status;
                        },
                        `Document review: ${status}`,
                        role,
                      );
                      setView(null);
                    }}
                  >
                    {status}
                  </Button>
                ),
              )}
            </div>
          )}
        </Modal>
      )}
      {remove && (
        <Modal title="Remove this document?" onClose={() => setRemove(null)}>
          <p>{remove.name} will be removed from your library.</p>
          <Button onClick={() => setRemove(null)}>Keep document</Button>{" "}
          <Button
            primary
            onClick={() => {
              update(
                (s) => {
                  s.documents = s.documents.filter((d) => d.id !== remove.id);
                },
                "Document removed",
                role,
              );
              files.current.delete(remove.id);
              setRemove(null);
            }}
          >
            Remove document
          </Button>
        </Modal>
      )}
    </>
  );
}
export function FarmProfile({ role, go, id = 1, publicView = false }) {
  const { state, update, notify } = useStore();
  const farm = state.farms.find((f) => f.id === Number(id));
  const [tab, setTab] = useState("Overview");
  const [edit, setEdit] = useState(false);
  if (!farm)
    return (
      <Empty
        title="Farm not found"
        text="This farm may no longer be available."
        action="Browse farms"
        onAction={() => go("discovery")}
      />
    );
  const owner = ["farmer", "business"].includes(role) && farm.id === 1;
  const tabs = publicView
    ? ["Overview", "Production", "Updates"]
    : [
        "Overview",
        "Verification",
        "Land & tenure",
        "Production",
        "Infrastructure",
        "Market",
        "Documents",
        "Monitoring",
      ];
  function save(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!parseGPS(data.gps)) {
      notify("Enter valid GPS coordinates as latitude, longitude.");
      return;
    }
    update(
      (s) => {
        Object.assign(
          s.farms.find((f) => f.id === farm.id),
          data,
          {
            size: Number(data.size),
            need: Number(data.need),
            loc: `${data.district}, ${data.province}`,
            status: "Submitted",
            ready: "Pending assessment",
          },
        );
        const c = s.cases.find(
          (c) => c.farmId === farm.id && c.kind === "Farm verification",
        );
        if (c) c.status = "Submitted";
      },
      "Farm profile updated; review requested",
      role,
    );
    setEdit(false);
    notify("Profile saved and returned to review.");
  }
  return (
    <>
      <div className={`farm-cover crop-${farm.crop.toLowerCase()}`}>
        <span>FARM-CAPTA / AGRICULTURAL PROFILE</span>
        <div>
          {farm.crop}
          <small>{farm.loc}</small>
        </div>
      </div>
      <Heading
        title={farm.name}
        description={`${farm.loc} · ${farm.size} hectares · ${farm.crop}`}
      >
        <Badge status={farm.status} />
        {owner && !publicView && (
          <Button primary onClick={() => setEdit(true)}>
            Edit farm
          </Button>
        )}
        {role === "lender" && !publicView && (
          <Button
            onClick={() =>
              download(
                `farm-${farm.id}-report.txt`,
                `${farm.name}\nFictional Farm-Capta report — not a credit decision\nLocation: ${farm.loc}\nSize: ${farm.size} ha\nCrop: ${farm.crop}\nTenure: ${farm.tenure}\nStatus: ${farm.status}\nRequested: ${money(farm.need)}\nPurpose: ${farm.purpose}\nReadiness: ${farm.ready}\nLast verified: ${date(farm.date)}`,
              )
            }
          >
            Export report
          </Button>
        )}
      </Heading>
      <Tabs items={tabs} value={tab} onChange={setTab} />
      {tab === "Overview" && (
        <>
          <FarmMap farms={[farm]} publicView={publicView} />
          <div className="grid cols3">
            <Metric label="Farm size" value={`${farm.size} ha`} />
            <Metric label="Primary activity" value={farm.crop} />
            <Metric
              label={publicView ? "Verification" : "Financing request"}
              value={publicView ? farm.status : money(farm.need)}
            />
          </div>
          <div className="grid cols2">
            <section className="card">
              <h2>About the farm</h2>
              <p>
                {farm.name} is a fictional {farm.crop.toLowerCase()} operation
                in {farm.district}. Its profile brings production, tenure and
                market evidence into one place.
              </p>
              <dl>
                <dt>Tenure evidence</dt>
                <dd>{farm.tenure}</dd>
                <dt>Water source</dt>
                <dd>{farm.irrigation}</dd>
                <dt>Market relationships</dt>
                <dd>{farm.offtaker}</dd>
              </dl>
            </section>
            <section className="card">
              <h2>Verification & readiness</h2>
              <Badge status={farm.status} />
              <p>
                Readiness: <b>{farm.ready}</b>
              </p>
              <p className="muted">Last verified: {date(farm.date)}</p>
              <p className="notice">
                Verification describes reviewed evidence. It does not guarantee
                ownership, repayment, yields or financing approval.
              </p>
            </section>
          </div>
        </>
      )}
      {tab === "Verification" && (
        <div className="card">
          <h2>Evidence and review</h2>
          <Badge status={farm.status} />
          <dl>
            <dt>Documentation</dt>
            <dd>
              {
                state.documents.filter((d) => d.farmId === farm.id && d.shared)
                  .length
              }{" "}
              shared records
            </dd>
            <dt>Production history</dt>
            <dd>{farm.history.length} sample seasons</dd>
            <dt>Market evidence</dt>
            <dd>{farm.offtaker}</dd>
            <dt>Assessment</dt>
            <dd>{farm.ready}</dd>
          </dl>
          <p className="notice">
            These transparent factors support assessment; they are not a credit
            score.
          </p>
        </div>
      )}
      {tab === "Land & tenure" && (
        <div className="card">
          <h2>{farm.tenure}</h2>
          <p>
            {farm.size} hectares in {farm.loc}.
          </p>
          <p>Coordinates: {farm.gps}</p>
          <p className="notice">
            The supplied tenure document is recorded as evidence and is not
            automatically equivalent to title ownership.
          </p>
        </div>
      )}
      {tab === "Production" && (
        <div className="card">
          <h2>Production record</h2>
          {farm.productionNotes && (
            <p>
              <strong>Submitted production history:</strong>{" "}
              {farm.productionNotes}
            </p>
          )}
          {farm.currentSeason && (
            <p>
              Current season: {farm.currentSeason} ? Estimated annual
              production: {farm.annualProduction}
            </p>
          )}
          <div className="table-wrap">
            <table>
              <caption>Illustrative yield history, tonnes per hectare</caption>
              <thead>
                <tr>
                  <th scope="col">Season</th>
                  <th scope="col">Yield (t/ha)</th>
                </tr>
              </thead>
              <tbody>
                {farm.history.map((v, i) => (
                  <tr key={i}>
                    <td>{2023 + i}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === "Infrastructure" && (
        <div className="card">
          <h2>Water, equipment & storage</h2>
          <dl>
            <dt>Water</dt>
            <dd>{farm.irrigation}</dd>
            <dt>Equipment</dt>
            <dd>
              {farm.equipment ||
                "Sample tractor and planter; condition review pending."}
            </dd>
            <dt>Storage</dt>
            <dd>
              {farm.storage ||
                "Seasonal storage access declared; supporting evidence required."}
            </dd>
            <dt>Labour</dt>
            <dd>{farm.labour || "Sample seasonal labour plan"}</dd>
          </dl>
        </div>
      )}
      {tab === "Market" && (
        <div className="card">
          <h2>Market & financing context</h2>
          <dl>
            <dt>Buyer evidence</dt>
            <dd>{farm.offtaker}</dd>
            <dt>Requested financing</dt>
            <dd>{money(farm.need)}</dd>
            <dt>Purpose</dt>
            <dd>{farm.purpose}</dd>
            <dt>Existing financing</dt>
            <dd>
              {farm.existingFinancing ||
                "Declared in the sample assessment; further evidence required."}
            </dd>
          </dl>
          <Button onClick={() => go("messages")}>Open inbox</Button>
        </div>
      )}
      {tab === "Documents" && (
        <Documents role={role} farmId={farm.id} embedded />
      )}
      {tab === "Monitoring" && (
        <Monitoring role={role} farmId={farm.id} embedded />
      )}
      {tab === "Updates" && (
        <div className="card">
          <h2>Farm updates</h2>
          {state.posts
            .filter((p) => p.author === farm.name && !p.hidden)
            .map((p) => (
              <p key={p.id}>{p.text}</p>
            ))}
          <p className="muted">
            Follow agricultural businesses in the Agri Feed for more sample
            updates.
          </p>
          <Button onClick={() => go("feed")}>Open Agri Feed</Button>
        </div>
      )}
      {edit && (
        <Modal title="Edit farm profile" onClose={() => setEdit(false)}>
          <form onSubmit={save}>
            <div className="form-grid">
              {[
                ["name", "Farm name"],
                ["district", "District"],
                ["province", "Province"],
                ["gps", "GPS coordinates (latitude, longitude)"],
                ["crop", "Crop"],
                ["size", "Size (ha)"],
                ["need", "Financing request (USD)"],
                ["tenure", "Tenure evidence"],
                ["irrigation", "Water source"],
                ["offtaker", "Buyer / offtaker"],
                ["purpose", "Purpose"],
              ].map(([key, label]) => (
                <Field
                  key={key}
                  label={label}
                  name={key}
                  defaultValue={farm[key]}
                  required
                  type={["size", "need"].includes(key) ? "number" : "text"}
                  min="1"
                />
              ))}
            </div>
            <p className="muted">
              Material profile changes return the farm to review.
            </p>
            <Button primary>Save changes</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Monitoring({ role, farmId, embedded = false }) {
  const { state, update } = useStore();
  const [add, setAdd] = useState(false);
  const ids = ["farmer", "business"].includes(role)
    ? [1]
    : state.applications
        .filter(
          (a) =>
            ["Funded", "Monitoring"].includes(a.status) &&
            a.institutionId === "1",
        )
        .map((a) => a.farmId);
  const rows = state.milestones.filter((m) =>
    farmId ? m.farmId === farmId : ids.includes(m.farmId),
  );
  const canEdit = ["farmer", "business"].includes(role);
  return (
    <>
      {!embedded && (
        <Heading
          title="Farm monitoring"
          description="Season milestones and evidence updates. Weather integration is not live."
        >
          {canEdit && (
            <Button primary onClick={() => setAdd(true)}>
              Add milestone
            </Button>
          )}
        </Heading>
      )}
      <div className="card">
        <h2>Season plan</h2>
        {rows.length ? (
          rows.map((m) => (
            <div key={m.id} className="list-row">
              <div>
                <strong>{m.title}</strong>
                <p className="muted">
                  {state.farms.find((f) => f.id === m.farmId)?.name} · Due{" "}
                  {date(m.due)}
                </p>
              </div>
              {canEdit ? (
                <label className="check">
                  <input
                    type="checkbox"
                    checked={m.done}
                    onChange={(e) =>
                      update(
                        (s) => {
                          s.milestones.find((x) => x.id === m.id).done =
                            e.target.checked;
                        },
                        "Monitoring milestone updated",
                        role,
                      )
                    }
                  />
                  Completed
                </label>
              ) : (
                <Badge status={m.done ? "Completed" : "In Progress"} />
              )}
            </div>
          ))
        ) : (
          <Empty
            title="No milestones yet"
            text="A farm owner can add a milestone to the seasonal plan."
          />
        )}
      </div>
      {add && (
        <Modal title="New milestone" onClose={() => setAdd(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = Object.fromEntries(new FormData(e.target));
              update(
                (s) =>
                  s.milestones.push({
                    id: uid(),
                    farmId: 1,
                    title: d.title,
                    due: d.due,
                    done: false,
                  }),
                "Monitoring milestone added",
                role,
              );
              setAdd(false);
            }}
          >
            <Field label="Milestone" name="title" required />
            <Field label="Due date" name="due" type="date" required />
            <Button primary>Add milestone</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
