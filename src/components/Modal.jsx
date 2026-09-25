import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current.showModal();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return createPortal(<dialog ref={ref} className="app-dialog" aria-labelledby={titleId}
    onCancel={e => { e.preventDefault(); onClose(); }}
    onClick={e => { if (e.target === ref.current) onClose(); }}>
    <div className="dialog-body">
      <div className="split"><h2 id={titleId}>{title}</h2><button type="button" className="btn small" onClick={onClose} aria-label="Close dialog">Close</button></div>
      {children}
    </div>
  </dialog>, document.body);
}
