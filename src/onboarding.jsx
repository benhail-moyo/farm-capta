import React, { useState } from "react";
import { useStore } from "./store.jsx";
import { Button, Field, Heading, Badge, Modal } from "./ui.jsx";
import { uid, validateFile } from "./model.js";
const provinceOptions = [
  "Bulawayo",
  "Harare",
  "Manicaland",
  "Mashonaland Central",
  "Mashonaland East",
  "Mashonaland West",
  "Masvingo",
  "Matabeleland North",
  "Matabeleland South",
  "Midlands",
];
const f = (key, label, type = "text", options) => ({
  key,
  label,
  type,
  options,
});
const account = [
  f("email", "Email", "email"),
  f("phone", "Contact phone", "tel"),
  f("password", "Demo password", "password"),
];
const identity = [
  f("name", "Full legal name"),
  f("dob", "Date of birth", "date"),
  f("nationality", "Nationality"),
  f("idType", "ID type", "select", ["National ID", "Passport"]),
  f("idNumber", "ID number"),
  f("address", "Residential address"),
  f("identityFile", "Identity document", "file"),
  f("liveness", "Simulated selfie / liveness check", "select", [
    "Simulate successful capture",
  ]),
];
const farmerSteps = [
  ["Account", account],
  ["Identity", identity],
  [
    "Farm",
    [
      f("farmName", "Farm name"),
      f("province", "Province", "select", provinceOptions),
      f("district", "District"),
      f("gps", "GPS coordinates (latitude, longitude)"),
      f("size", "Farm size (ha)", "number"),
      f("crop", "Primary crop / activity", "select", [
        "Maize",
        "Soybeans",
        "Wheat",
        "Horticulture",
        "Tobacco",
        "Cotton",
        "Livestock",
        "Other",
      ]),
    ],
  ],
  [
    "Land & tenure",
    [
      f("tenure", "Tenure document", "select", [
        "Title deed",
        "Lease",
        "A1 offer letter",
        "A2 offer letter",
        "Communal/customary",
        "Other",
      ]),
      f("tenureRef", "Document reference"),
      f("landFile", "Supporting land document", "file"),
    ],
  ],
  [
    "Production",
    [
      f("history", "Historical yields / production"),
      f("season", "Current season"),
      f("irrigation", "Water and irrigation"),
      f("equipment", "Equipment and assets"),
      f("livestock", "Livestock (enter None if not applicable)"),
      f("labour", "Labour"),
      f("storage", "Storage"),
    ],
  ],
  [
    "Market",
    [
      f("offtaker", "Buyers / offtakers"),
      f("contracts", "Contract farming arrangements"),
      f("annualProduction", "Estimated annual production"),
      f("market", "Market access"),
    ],
  ],
  [
    "Financing",
    [
      f("existing", "Existing financing (enter None if none)"),
      f("need", "Amount required (USD)", "number"),
      f("purpose", "Financing purpose"),
      f("period", "Desired period (months)", "number"),
      f("partners", "Preferred financing partners"),
    ],
  ],
  ["Consent", []],
  ["Review", []],
];
const investorSteps = [
  ["Account", account],
  ["Identity", identity],
  [
    "Residence",
    [
      f("city", "City"),
      f("country", "Country"),
      f("residenceFile", "Proof of residence", "file"),
    ],
  ],
  [
    "Employment",
    [
      f("employment", "Employment status", "select", [
        "Employed",
        "Self-employed",
        "Retired",
        "Other",
      ]),
      f("business", "Employer / business"),
      f("income", "Monthly income band", "select", [
        "Under US$500",
        "US$500–2,000",
        "US$2,000–5,000",
        "Over US$5,000",
      ]),
    ],
  ],
  [
    "Source of funds",
    [
      f("funds", "Source of funds", "select", [
        "Salary",
        "Business income",
        "Savings",
        "Inheritance",
        "Other",
      ]),
      f("activity", "Expected investment activity", "select", [
        "Occasional",
        "Seasonal",
        "Regular",
      ]),
    ],
  ],
  [
    "Suitability",
    [
      f("experience", "Investment experience", "select", [
        "None",
        "Some",
        "Experienced",
      ]),
      f("risk", "Loss tolerance", "select", ["Low", "Moderate", "High"]),
      f("liquidity", "Liquidity needs", "select", [
        "Within 6 months",
        "6–12 months",
        "Over 12 months",
      ]),
      f("objectives", "Primary objective", "select", [
        "Income",
        "Capital growth",
        "Agricultural impact",
        "Diversification",
      ]),
      f("pep", "Politically exposed person or related party", "select", [
        "No",
        "Yes",
        "Unsure",
      ]),
    ],
  ],
  ["Consent", []],
  ["Review", []],
];
const consentFields = [
  ["terms", "I accept the demo terms."],
  ["identityConsent", "I consent to identity verification."],
  ["dataConsent", "I consent to processing this demo profile."],
];
export function Onboarding({ role, go }) {
  const { state, update, drafts, setDrafts, files, submissions, notify } =
    useStore();
  const investor = role === "investor";
  const steps = investor ? investorSteps : farmerSteps;
  const draftKey = `onboarding-${role}`;
  const draft = drafts[draftKey] || { step: 0, values: {} };
  const [errors, setErrors] = useState({});
  const [policy, setPolicy] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const values = draft.values;
  const step = draft.step;
  const [title, fields] = steps[step];
  function change(key, value) {
    setDrafts((all) => ({
      ...all,
      [draftKey]: { ...draft, values: { ...values, [key]: value } },
    }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }
  const consents = [
    ...consentFields,
    ...(!investor ? [["farmConsent", "I consent to farm verification."]] : []),
    [
      "partnerConsent",
      "Share relevant farm information with approved financing partners (optional).",
    ],
    ["marketing", "Receive marketing updates (optional)."],
  ];
  function validate(index) {
    const errs = {};
    for (const field of steps[index][1]) {
      const value = values[field.key];
      if (!value || (typeof value === "string" && !value.trim()))
        errs[field.key] = `${field.label} is required.`;
      else if (
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        errs[field.key] = "Enter a valid email.";
      else if (
        field.type === "tel" &&
        (!/^\+?[0-9 ()-]{7,25}$/.test(value) ||
          value.replace(/\D/g, "").length < 7 ||
          value.replace(/\D/g, "").length > 15)
      )
        errs[field.key] = "Enter a valid contact phone number.";
      else if (field.type === "password" && value.length < 8)
        errs[field.key] = "Use at least 8 characters for this demo.";
      else if (
        field.type === "number" &&
        (!Number.isFinite(Number(value)) || Number(value) <= 0)
      )
        errs[field.key] = "Enter a positive number.";
      else if (
        field.key === "dob" &&
        (new Date(value) >= new Date() || new Date(value).getFullYear() < 1900)
      )
        errs[field.key] = "Enter a valid past date.";
      else if (field.key === "gps") {
        const parts = value.split(",").map(Number);
        if (
          !/^\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*$/.test(value) ||
          parts.length !== 2 ||
          parts.some((x) => !Number.isFinite(x)) ||
          Math.abs(parts[0]) > 90 ||
          Math.abs(parts[1]) > 180
        )
          errs[field.key] =
            "Use latitude, longitude, for example -17.32, 30.97.";
      }
    }
    if (steps[index][0] === "Consent")
      for (const [key] of consents) {
        if (!["marketing", "partnerConsent"].includes(key) && !values[key])
          errs[key] = "Your agreement is required to submit.";
      }
    return errs;
  }
  async function next(e) {
    e.preventDefault();
    if (busy) return;
    const errs = validate(step);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (step < steps.length - 1) {
      setDrafts((a) => ({ ...a, [draftKey]: { ...draft, step: step + 1 } }));
      return;
    }
    for (let i = 0; i < steps.length - 1; i++) {
      const earlier = validate(i);
      if (Object.keys(earlier).length) {
        setErrors(earlier);
        setDrafts((a) => ({ ...a, [draftKey]: { ...draft, step: i } }));
        return;
      }
    }
    if (!values.accuracy) {
      setErrors({ accuracy: "Confirm your information is accurate." });
      return;
    }
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    update(
      (s) => {
        const caseRole = role === "business" ? "farmer" : role;
        const existing = s.cases.find(
          (c) =>
            c.role === caseRole &&
            c.kind === (investor ? "Investor identity" : "Farm verification"),
        );
        const submissionId = existing?.id || uid();
        const summary = steps
          .slice(0, -1)
          .map(([title, fields]) => ({
            title,
            fields: fields
              .filter((f) => f.type !== "password")
              .map((f) => ({
                label: f.label,
                value: f.type === "file" ? values[f.key]?.name : values[f.key],
              })),
          }));
        summary.push({
          title: "Consent decisions",
          fields: consents.map(([key, label]) => ({
            label,
            value: values[key] ? "Yes" : "No",
          })),
        });
        submissions.current.set(submissionId, summary);
        if (existing) {
          existing.status = "Submitted";
          existing.notes.push({
            text: "Updated profile submitted",
            at: new Date().toISOString(),
          });
        } else
          s.cases.push({
            id: submissionId,
            farmId: investor ? null : 1,
            role: caseRole,
            kind: investor ? "Investor identity" : "Farm verification",
            name: investor ? "Investor demo profile" : values.farmName,
            status: "Submitted",
            notes: [],
          });
        s.profiles[role].consents = {
          identity: !!values.identityConsent,
          data: !!values.dataConsent,
          farm: !!values.farmConsent,
          partnerSharing: !!values.partnerConsent,
          marketing: !!values.marketing,
          terms: true,
        };
        if (!investor) {
          const identityCase = s.cases.find(
            (c) => c.role === caseRole && c.kind === "Identity",
          );
          if (identityCase) {
            submissions.current.set(
              identityCase.id,
              summary.filter((s) =>
                ["Account", "Identity", "Consent decisions"].includes(s.title),
              ),
            );
            identityCase.status = "Submitted";
            identityCase.notes.push({
              text: "Updated identity evidence submitted for review.",
              at: new Date().toISOString(),
            });
          }
          Object.assign(s.farms[0], {
            name: values.farmName,
            province: values.province,
            district: values.district,
            loc: `${values.district}, ${values.province}`,
            gps: values.gps,
            size: Number(values.size),
            crop: values.crop,
            tenure: values.tenure,
            irrigation: values.irrigation,
            offtaker: values.offtaker,
            need: Number(values.need),
            purpose: values.purpose,
            productionNotes: values.history,
            currentSeason: values.season,
            equipment: values.equipment,
            labour: values.labour,
            storage: values.storage,
            livestock: values.livestock,
            annualProduction: values.annualProduction,
            marketAccess: values.market,
            existingFinancing: values.existing,
            status: "Submitted",
            score: 100,
            ready: "Pending assessment",
          });
        }
        for (const key of ["identityFile", "landFile", "residenceFile"]) {
          const file = values[key];
          if (file) {
            const id = uid();
            files.current.set(id, file);
            s.documents.push({
              id,
              farmId: investor ? null : 1,
              role: caseRole,
              name: file.name,
              type:
                key === "identityFile"
                  ? "Identity"
                  : key === "landFile"
                    ? "Land tenure"
                    : "Residence",
              status: "Submitted",
              sample: false,
              shared: key === "landFile" && !!values.partnerConsent,
            });
          }
        }
        s.notifications.unshift({
          id: uid(),
          role: "admin",
          text: "A demo verification submission is ready for review.",
          page: "kyc",
          read: false,
        });
      },
      "Profile submitted for simulated verification",
      role,
    );
    setDrafts((a) => {
      const copy = { ...a };
      delete copy[draftKey];
      return copy;
    });
    setBusy(false);
    notify("Submitted for review. This is not an approval.");
    go("verification");
  }
  return (
    <>
      <Heading
        eyebrow={
          investor ? "Future investment profile" : "Build your farm profile"
        }
        title={investor ? "Investor onboarding" : "Farm verification"}
        description="Use fictional information. Sensitive drafts and selected files stay in this tab’s memory and clear on refresh."
      />
      <form className="card wizard" onSubmit={next} noValidate>
        <ol className="wizard-steps" aria-label="Onboarding progress">
          {steps.map(([name], i) => (
            <li key={name} aria-current={i === step ? "step" : undefined}>
              <span>{i + 1}</span>
              {name}
            </li>
          ))}
        </ol>
        <div className="split">
          <h2>{title}</h2>
          <span className="muted">
            Step {step + 1} of {steps.length}
          </span>
        </div>
        {Object.keys(errors).some((k) => errors[k]) && (
          <p className="error" role="alert">
            Please correct the highlighted fields.
          </p>
        )}
        <div className="form-grid">
          {fields.map((field) =>
            field.type === "file" ? (
              <Field
                key={field.key}
                label={field.label}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                error={errors[field.key]}
                onChange={(e) => {
                  const file = e.target.files[0];
                  const error = validateFile(file);
                  if (error) {
                    change(field.key, null);
                    setErrors((x) => ({ ...x, [field.key]: error }));
                    return;
                  }
                  change(field.key, file);
                }}
              />
            ) : (
              <Field
                key={field.key}
                label={field.label}
                type={
                  field.type === "password" && showPassword
                    ? "text"
                    : field.type === "select"
                      ? "text"
                      : field.type
                }
                options={field.options}
                value={values[field.key] || ""}
                required
                min={field.type === "number" ? 0.01 : undefined}
                step={field.type === "number" ? "any" : undefined}
                autoComplete={
                  field.type === "password" ? "new-password" : "off"
                }
                error={errors[field.key]}
                onChange={(e) => change(field.key, e.target.value)}
              />
            ),
          )}
        </div>
        {fields
          .filter((f) => f.type === "file" && values[f.key])
          .map((f) => (
            <p key={f.key}>Selected: {values[f.key].name}</p>
          ))}
        {title === "Account" && (
          <label className="check">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show demo password
          </label>
        )}
        {title === "Consent" && (
          <>
            <div className="actions">
              <Button type="button" onClick={() => setPolicy("Terms")}>
                Read demo terms
              </Button>
              <Button type="button" onClick={() => setPolicy("Privacy")}>
                Read privacy information
              </Button>
            </div>
            {consents.map(([key, label]) => (
              <div key={key}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={!!values[key]}
                    onChange={(e) => change(key, e.target.checked)}
                  />
                  {label}
                </label>
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
          </>
        )}
        {title === "Review" && (
          <>
            {steps.slice(0, -1).map(([name, fs], i) => (
              <section className="review-section" key={name}>
                <div className="split">
                  <h3>{name}</h3>
                  <Button
                    type="button"
                    onClick={() =>
                      setDrafts((a) => ({
                        ...a,
                        [draftKey]: { ...draft, step: i },
                      }))
                    }
                  >
                    Edit {name}
                  </Button>
                </div>
                <dl>
                  {fs.map((f) => (
                    <React.Fragment key={f.key}>
                      <dt>{f.label}</dt>
                      <dd>
                        {f.type === "password"
                          ? "••••••••"
                          : f.type === "file"
                            ? values[f.key]?.name
                            : String(values[f.key] || "Not provided")}
                      </dd>
                    </React.Fragment>
                  ))}
                  {name === "Consent" &&
                    consents.map(([key, label]) => (
                      <React.Fragment key={key}>
                        <dt>{label}</dt>
                        <dd>{values[key] ? "Yes" : "No"}</dd>
                      </React.Fragment>
                    ))}
                </dl>
              </section>
            ))}
            <label className="check">
              <input
                type="checkbox"
                checked={!!values.accuracy}
                onChange={(e) => change("accuracy", e.target.checked)}
              />
              I confirm that the information supplied is accurate for this
              demonstration.
            </label>
            {errors.accuracy && <p className="error">{errors.accuracy}</p>}
          </>
        )}
        <div className="split wizard-footer">
          <Button
            type="button"
            disabled={step === 0 || busy}
            onClick={() => {
              setErrors({});
              setDrafts((a) => ({
                ...a,
                [draftKey]: { ...draft, step: step - 1 },
              }));
            }}
          >
            Back
          </Button>
          <Button primary disabled={busy} type="submit">
            {busy
              ? "Submitting…"
              : step === steps.length - 1
                ? "Submit for verification"
                : "Continue"}
          </Button>
        </div>
      </form>
      {policy && (
        <Modal title={`${policy} — prototype`} onClose={() => setPolicy("")}>
          <p>
            {policy === "Terms"
              ? "This demonstration has no financial transactions or binding financing commitments. Verification decisions are simulated and do not guarantee credit, ownership or investment outcomes."
              : "Use fictional information only. Demo interactions are stored in this browser. Passwords, identity drafts and uploaded file contents are kept in memory, not persisted or transmitted. Refresh clears those sensitive inputs. Partner sharing is optional and applies only to relevant farm documents."}
          </p>
        </Modal>
      )}
    </>
  );
}
export function Verification({ role, go }) {
  const { state } = useStore();
  const cases = state.cases.filter(
    (c) => c.role === (role === "business" ? "farmer" : role),
  );
  return (
    <>
      <Heading
        title="Verification progress"
        description="Track review decisions and respond to requests. All checks are simulated."
      >
        <Button primary onClick={() => go("onboarding")}>
          Complete / update profile
        </Button>
      </Heading>
      {cases.length ? (
        cases.map((c) => (
          <div className="card" key={c.id}>
            <div className="split">
              <h2>{c.kind}</h2>
              <Badge status={c.status} />
            </div>
            <p>{c.name}</p>
            {c.notes.map((n, i) => (
              <p key={i} className="notice">
                {n.text}
              </p>
            ))}
            {c.status === "Action Required" && (
              <Button onClick={() => go("documents")}>
                Manage supporting documents
              </Button>
            )}
          </div>
        ))
      ) : (
        <div className="empty">
          <h2>Start your verification</h2>
          <p>Your profile has not been submitted yet.</p>
          <Button primary onClick={() => go("onboarding")}>
            Start onboarding
          </Button>
        </div>
      )}
    </>
  );
}
