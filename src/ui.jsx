import React, { useEffect, useId, useRef } from "react";
import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  X,
  ArrowRight,
  Leaf,
} from "lucide-react";
export function Button({
  children,
  primary = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn ${primary ? "primary" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Badge({ status }) {
  const success = [
    "Verified",
    "Identity Verified",
    "Farm Location Verified",
    "Documents Reviewed",
    "Operational Profile Verified",
    "Institutional Account Verified",
    "Completed",
  ];
  const tone = success.includes(status)
    ? ""
    : ["Rejected", "Declined", "Suspended"].includes(status)
      ? "red"
      : ["Action Required", "Field Verification"].includes(status)
        ? "warn"
        : "info";
  const Icon = success.includes(status)
    ? CheckCircle2
    : ["Under Review", "Document Review", "Screening"].includes(status)
      ? Clock3
      : ShieldCheck;
  return (
    <span className={`pill ${tone}`}>
      <Icon size={13} aria-hidden="true" />
      {status}
    </span>
  );
}
export function Heading({ eyebrow, title, description, children }) {
  return (
    <div className="page-heading split">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      {children && <div className="actions">{children}</div>}
    </div>
  );
}
export function Empty({ title = "Nothing here yet", text, action, onAction }) {
  return (
    <div className="empty">
      <Leaf size={28} />
      <h3>{title}</h3>
      <p className="muted">{text}</p>
      {action && (
        <Button primary onClick={onAction}>
          {action}
          <ArrowRight size={16} />
        </Button>
      )}
    </div>
  );
}
export function Field({ label, error, options, textarea = false, ...props }) {
  const id = useId();
  const a = {
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {props.required && <span aria-hidden="true"> *</span>}
      </label>
      {options ? (
        <select id={id} {...a} {...props}>
          <option value="">Choose an option</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea id={id} {...a} {...props} />
      ) : (
        <input id={id} {...a} {...props} />
      )}{" "}
      {error && (
        <small id={`${id}-error`} className="error">
          {error}
        </small>
      )}
    </div>
  );
}
export function Metric({ label, value, hint }) {
  return (
    <div className="metric">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {hint && <div className="muted small-text">{hint}</div>}
    </div>
  );
}
export function Tabs({ items, value, onChange }) {
  return (
    <div className="tabs" aria-label="Sections">
      {items.map((item) => (
        <button
          key={item}
          className={`tab ${value === item ? "active" : ""}`}
          aria-pressed={value === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
export function Modal({ title, children, onClose }) {
  const ref = useRef();
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-body">
        <div className="split">
          <h2 id={titleId}>{title}</h2>
          <Button aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
export function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((x, i) => (
        <li key={x.id || i}>
          <p>{x.text}</p>
          {x.at && (
            <time dateTime={x.at}>{new Date(x.at).toLocaleString()}</time>
          )}
        </li>
      ))}
    </ol>
  );
}
export function download(name, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
