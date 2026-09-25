import React, { useState } from 'react';
import Modal from './Modal';

export function DetailsButton({ title, data, children = 'View Details', className = 'btn small', style }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" className={className} style={style} onClick={() => setOpen(true)}>{children}</button>
    {open && <Modal title={title} onClose={() => setOpen(false)}>{typeof data === 'string' ? <p>{data}</p> : <dl className="details-list">{Object.entries(data || {}).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{Array.isArray(value) ? value.join(', ') : String(value)}</dd></div>)}</dl>}</Modal>}</>;
}

export function DraftButton({ title, fields, storageKey, children = title }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(() => { try { return JSON.parse(localStorage.getItem(storageKey)) || null; } catch { return null; } });
  return <div><button type="button" className="btn small" onClick={() => setOpen(true)}>{children}</button>
    {saved && <DetailsButton title={`${title} — saved draft`} data={saved}>View saved draft</DetailsButton>}
    {open && <Modal title={title} onClose={() => setOpen(false)}>
      <p className="notice">Demo workspace: save a draft on this device. Drafts are not submitted to an institution or sent to another user.</p>
      <form className="grid" onSubmit={e => { e.preventDefault(); const values = Object.fromEntries(new FormData(e.currentTarget)); try { localStorage.setItem(storageKey, JSON.stringify(values)); setSaved(values); setOpen(false); } catch { setError('Unable to save on this device. Please allow browser storage and retry.'); } }}>
        {fields.map(field => <label className="field" key={field.name}>{field.name}<input name={field.name} type={field.type || 'text'} required defaultValue={saved?.[field.name] ?? field.value ?? ''} min={field.type === 'number' ? 1 : undefined}/></label>)}
        {error && <p role="alert">{error}</p>}<button className="btn primary" type="submit">Save draft</button>
      </form>
    </Modal>}</div>;
}

export function DownloadButton({ title, data, children = 'Download' }) {
  function download() {
    const blob = new Blob([`FarmLink demo report: ${title}\n\n${JSON.stringify(data, null, 2)}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `${title.replace(/[^a-z0-9]/gi, '-')}.txt`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <button type="button" className="btn small" onClick={download}>{children}</button>;
}

export function ReviewButton({ title, data }) {
  const [decision, setDecision] = useState('');
  return <div><DetailsButton title={title} data={data}>Review</DetailsButton><select aria-label={`Demo decision for ${title}`} value={decision} onChange={e => setDecision(e.target.value)}><option value="">Demo decision</option><option>Approved</option><option>Action Required</option><option>Rejected</option></select>{decision && <span role="status">{decision} (this session)</span>}</div>;
}

export function UploadButton() {
  const [files, setFiles] = useState([]);
  const input = React.useRef(null);
  return <div><input ref={input} type="file" hidden multiple accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={e => setFiles(Array.from(e.target.files))}/>
    <button type="button" className="btn primary" onClick={() => input.current.click()}>Upload Document</button>
    {files.length > 0 && <div role="status"><p>Selected for this session. Server upload is not connected.</p>{files.map(file => <p key={file.name}>{file.name} ({Math.ceil(file.size / 1024)} KB)</p>)}</div>}
  </div>;
}

export function SavedSettings({ storageKey, title, fields }) {
  const [values, setValues] = useState(() => { try { return JSON.parse(localStorage.getItem(storageKey)) || Object.fromEntries(fields.map(f => [f.name, f.value])); } catch { return Object.fromEntries(fields.map(f => [f.name, f.value])); } });
  const [message, setMessage] = useState('');
  return <form className="card grid" onSubmit={e => { e.preventDefault(); try { localStorage.setItem(storageKey, JSON.stringify(values)); setMessage('Saved on this device.'); } catch { setMessage('Unable to save. Please allow browser storage and retry.'); } }}>
    <h3>{title}</h3>{fields.map(field => <label className="field" key={field.name}>{field.name}<input type={field.type || 'text'} required value={values[field.name] ?? ''} onChange={e => setValues({ ...values, [field.name]: e.target.value })}/></label>)}
    <button className="btn primary" type="submit">Save Changes</button><p role="status">{message}</p>
  </form>;
}
