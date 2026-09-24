import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { initialState, safePersist, uid, stamp, names } from "./model.js";
const Context = createContext(null);
const KEY = "farmcapta-demo-v2";
export function Provider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      return s?.version === 2 &&
        Array.isArray(s.farms) &&
        Array.isArray(s.audit)
        ? s
        : initialState();
    } catch {
      return initialState();
    }
  });
  const [toast, setToast] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [drafts, setDrafts] = useState({});
  const files = useRef(new Map());
  const submissions = useRef(new Map());
  function clearSessionData() {
    setDrafts({});
    files.current.clear();
    submissions.current.clear();
    setState((previous) => ({
      ...previous,
      documents: previous.documents.filter((d) => d.sample),
    }));
    setToast("");
  }
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(safePersist(state)));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 5000);
    return () => clearTimeout(t);
  }, [toast]);
  function update(recipe, text, role = "farmer") {
    setState((previous) => {
      const next = structuredClone(previous);
      recipe(next);
      if (text) {
        next.audit.unshift({
          id: uid(),
          text,
          actor: names[role] || role,
          at: stamp(),
        });
        next.notifications.unshift({
          id: uid(),
          role,
          text,
          page: role === "admin" ? "audit" : "overview",
          read: false,
        });
      }
      return next;
    });
  }
  return (
    <Context.Provider
      value={{
        state,
        update,
        notify: setToast,
        drafts,
        setDrafts,
        files,
        submissions,
        clearSessionData,
        storageError,
      }}
    >
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && <div className="toast">{toast}</div>}
      </div>
    </Context.Provider>
  );
}
export const useStore = () => useContext(Context);
