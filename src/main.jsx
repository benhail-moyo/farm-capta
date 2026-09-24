import React, {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  Sprout,
  Home,
  Search,
  Bell,
  Menu,
  ShieldCheck,
  Tractor,
  FileText,
  WalletCards,
  MessageSquare,
  Newspaper,
  Users,
  Building2,
  BookOpen,
  Heart,
  Eye,
  Settings,
  LogOut,
  ArrowUpRight,
  ArrowRight,
  Check,
  Leaf,
  ChartNoAxesCombined,
  Radio,
  MapPin,
} from "lucide-react";
import { Provider, useStore } from "./store.jsx";
import { roles, names, investmentNotice, money } from "./model.js";
import { Button, Heading, Modal, Field, Empty } from "./ui.jsx";
import { Onboarding, Verification } from "./onboarding.jsx";
import {
  FarmCard,
  FarmProfile,
  Discovery,
  Documents,
  Monitoring,
} from "./farms.jsx";
import {
  Financing,
  Applications,
  Portfolio,
  Opportunities,
} from "./finance.jsx";
import {
  Feed,
  News,
  Institutions,
  Messages,
  Notifications,
  Profile,
} from "./community.jsx";
import { Admin } from "./admin.jsx";
import "./styles.css";
const Dashboard = lazy(() => import("./dashboard.jsx"));
const nav = {
  farmer: [
    ["overview", "Overview", Home],
    ["farm-profile", "My farm", Tractor],
    ["verification", "Verification", ShieldCheck],
    ["financing", "Find financing", WalletCards],
    ["applications", "Applications", FileText],
    ["monitoring", "Monitoring", ChartNoAxesCombined],
    ["documents", "Documents", FileText],
    ["institutions", "Institutions", Building2],
    ["feed", "Agri Feed", Radio],
    ["news", "Agri News", Newspaper],
    ["messages", "Messages", MessageSquare],
    ["profile", "My profile", Users],
  ],
  lender: [
    ["overview", "Overview", Home],
    ["discovery", "Farm discovery", Search],
    ["applications", "Applications", FileText],
    ["portfolio", "Portfolio", ChartNoAxesCombined],
    ["monitoring", "Monitoring", Eye],
    ["reports", "Farm reports", FileText],
    ["products", "Financing products", WalletCards],
    ["institution", "Institution profile", Building2],
    ["feed", "Agri Feed", Radio],
    ["news", "Agri News", Newspaper],
    ["messages", "Messages", MessageSquare],
    ["profile", "My profile", Users],
  ],
  investor: [
    ["overview", "Overview", Home],
    ["opportunities", "Opportunities", Leaf],
    ["saved", "Saved", Heart],
    ["watchlist", "Watchlist", Eye],
    ["portfolio", "Future portfolio", ChartNoAxesCombined],
    ["verification", "Verification", ShieldCheck],
    ["education", "Learning centre", BookOpen],
    ["feed", "Agri Feed", Radio],
    ["news", "Agri News", Newspaper],
    ["messages", "Support", MessageSquare],
    ["profile", "My profile", Users],
  ],
  business: [
    ["overview", "Overview", Home],
    ["farm-profile", "Business profile", Tractor],
    ["verification", "Verification", ShieldCheck],
    ["documents", "Documents", FileText],
    ["financing", "Find financing", WalletCards],
    ["applications", "Applications", FileText],
    ["monitoring", "Monitoring", ChartNoAxesCombined],
    ["feed", "Publish & feed", Radio],
    ["institutions", "Institutions", Building2],
    ["news", "Agri News", Newspaper],
    ["messages", "Messages", MessageSquare],
    ["profile", "My profile", Users],
  ],
  admin: [
    ["overview", "Overview", Home],
    ["kyc", "Identity reviews", Users],
    ["farm-verification", "Farm verification", ShieldCheck],
    ["users", "Users", Users],
    ["institutions", "Institutions", Building2],
    ["content", "Content moderation", Radio],
    ["reports", "Reports & flags", FileText],
    ["audit", "Audit activity", Eye],
    ["settings", "Settings", Settings],
    ["profile", "My profile", Users],
  ],
};
function readRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  return {
    scope: parts[0] || "public",
    page: parts[1] || "home",
    id: parts[2],
  };
}
function navigate(scope, page = "overview") {
  location.hash = `/${scope}/${page}`;
}
function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Sprout size={23} />
      </span>
      <span>
        Farm-Capta<small>ZIMBABWE</small>
      </span>
    </span>
  );
}
function PublicSite({ page, id, enter }) {
  const { state } = useStore();
  const [menu, setMenu] = useState(false);
  const go = (p) => navigate("public", p);
  const links = [
    ["home", "Home"],
    ["how", "How it works"],
    ["farms", "Farms"],
    ["financing", "Financing"],
    ["news", "Agri News"],
    ["about", "About"],
  ];
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="public-top">
        <div className="nav-wrap">
          <button
            className="brand-button"
            onClick={() => go("home")}
            aria-label="Farm-Capta home"
          >
            <Brand />
          </button>
          <nav className="public-links" aria-label="Public navigation">
            {links.map(([p, label]) => (
              <button
                className={page === p ? "active" : ""}
                key={p}
                onClick={() => go(p)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="actions">
            <Button className="sign-in" onClick={() => go("signin")}>
              Sign in
            </Button>
            <Button primary onClick={() => go("signup")}>
              Get started <ArrowUpRight size={16} />
            </Button>
            <Button
              className="mobile-menu-button"
              aria-label="Open navigation"
              onClick={() => setMenu(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex="-1">
        {page === "home" ? (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="live-dot" /> VERIFIED INFORMATION. BETTER
                  DECISIONS.
                </div>
                <h1>
                  Good land.
                  <br />
                  Better evidence.
                  <br />
                  <em>Greater possibility.</em>
                </h1>
                <p className="lead">
                  Making Zimbabwean agriculture more bankable. Build a credible
                  farm profile and connect with financing partners who can see
                  its potential.
                </p>
                <div className="actions">
                  <Button primary onClick={() => go("signup")}>
                    Get your farm verified <ArrowUpRight size={18} />
                  </Button>
                  <Button onClick={() => go("signin")}>
                    Explore lender workspace <ArrowRight size={17} />
                  </Button>
                </div>
                <div className="hero-proof">
                  <ShieldCheck size={18} />
                  <span>Farm verification first. Informed financing next.</span>
                </div>
              </div>
              <div className="hero-visual">
                <div
                  className="landscape"
                  aria-label="Illustration of agricultural fields and farm evidence"
                >
                  <svg
                    viewBox="0 0 560 520"
                    role="img"
                    aria-label="Illustrated Zimbabwean farmland"
                  >
                    <defs>
                      <linearGradient id="sky" x2="0" y2="1">
                        <stop stopColor="#dfebdd" />
                        <stop offset="1" stopColor="#f6efd9" />
                      </linearGradient>
                      <pattern
                        id="rows"
                        width="18"
                        height="18"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(-24)"
                      >
                        <path
                          d="M0 0V18"
                          stroke="#ffffff"
                          strokeOpacity=".2"
                          strokeWidth="2"
                        />
                      </pattern>
                    </defs>
                    <rect width="560" height="520" fill="url(#sky)" />
                    <circle cx="416" cy="108" r="54" fill="#e5bd68" />
                    <path
                      d="M0 231Q100 132 241 195T560 168V520H0Z"
                      fill="#849d72"
                    />
                    <path
                      d="M0 300L190 217 360 298 560 216V520H0Z"
                      fill="#4b7553"
                    />
                    <path
                      d="M0 375L244 275 460 382 560 343V520H0Z"
                      fill="#c0c792"
                    />
                    <path d="M0 453L278 346 560 450V520H0Z" fill="#274f3f" />
                    <path
                      d="M0 300L190 217 360 298 560 216V520H0Z"
                      fill="url(#rows)"
                    />
                    <path
                      d="M340 198L280 257 321 302 245 349 324 407 247 520"
                      fill="none"
                      stroke="#f3e5ba"
                      strokeWidth="9"
                    />
                    <rect
                      x="131"
                      y="261"
                      width="39"
                      height="23"
                      fill="#f5ead1"
                    />
                    <path d="M123 262L150 244 178 262Z" fill="#304c3c" />
                    <circle
                      cx="364"
                      cy="311"
                      r="20"
                      fill="#f5f8ef"
                      fillOpacity=".2"
                    />
                    <circle cx="364" cy="311" r="8" fill="#f7faf2" />
                  </svg>
                  <span className="map-label">
                    <MapPin size={14} /> Mashonaland Central · illustrated
                  </span>
                </div>
                <div className="evidence-card">
                  <span className="evidence-icon">
                    <ShieldCheck size={22} />
                  </span>
                  <div>
                    <small>THE VALUE OF VERIFIED DATA</small>
                    <strong>
                      From farm potential
                      <br />
                      to financing intelligence.
                    </strong>
                  </div>
                  <ArrowUpRight size={20} />
                </div>
                <div className="hero-caption">
                  <span>01 / THE FARM-CAPTA VISION</span>
                  <span>Our land, Our Agriculture, Our future.</span>
                </div>
              </div>
            </section>
            <section className="trust-strip">
              <span>BUILT AROUND TRUST</span>
              <p>
                <Check size={16} /> Identity & tenure evidence
              </p>
              <p>
                <Check size={16} /> Structured farm profiles
              </p>
              <p>
                <Check size={16} /> Informed lender decisions
              </p>
            </section>
            <section className="section">
              <div className="split section-title">
                <div>
                  <div className="eyebrow">A clearer path forward</div>
                  <h2>
                    Turn farm information
                    <br />
                    into opportunity.
                  </h2>
                </div>
                <p className="muted intro-copy">
                  One connected workflow, from the first document to a
                  better-informed financing conversation.
                </p>
              </div>
              <div className="process-grid">
                {[
                  [
                    "01",
                    "Build your profile",
                    "Record your land, production, water access and market relationships.",
                  ],
                  [
                    "02",
                    "Verify the evidence",
                    "Bring identity, tenure documents and operational records together for review.",
                  ],
                  [
                    "03",
                    "Connect with confidence",
                    "Help financing partners assess your farm through structured, transparent information.",
                  ],
                ].map(([n, t, d]) => (
                  <article key={n}>
                    <span>{n}</span>
                    <h3>{t}</h3>
                    <p className="muted">{d}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="section featured">
              <div className="split section-title">
                <div>
                  <div className="eyebrow">The agricultural landscape</div>
                  <h2>Meet the farms behind the data.</h2>
                </div>
                <Button onClick={() => go("farms")}>
                  Explore farms <ArrowUpRight size={16} />
                </Button>
              </div>
              <div className="grid cols3">
                {state.farms.slice(0, 3).map((f) => (
                  <FarmCard key={f.id} farm={f} go={go} publicView />
                ))}
              </div>
              <p className="small-text muted">
                Each badge describes the farm’s current evidence-review status.
              </p>
            </section>
            <section className="section">
              <div className="partner-section">
                <div>
                  <div className="eyebrow">For financing institutions</div>
                  <h2>
                    Less fragmented information.
                    <br />
                    More informed decisions.
                  </h2>
                  <p>
                    Discover farms, review evidence, manage applications and
                    understand your agricultural portfolio in one focused
                    workspace.
                  </p>
                  <Button onClick={() => go("signin")}>
                    Open the lender workspace <ArrowUpRight size={16} />
                  </Button>
                </div>
                <div className="partner-quote">
                  <ShieldCheck size={30} />
                  <p>
                    Verification is the foundation.
                    <br />
                    Agricultural intelligence is the advantage.
                  </p>
                  <small>B2B VERIFICATION & DATA SERVICES</small>
                </div>
              </div>
            </section>
            <section className="section final-cta">
              <div className="eyebrow">
                Our land, Our Agriculture, Our future.
              </div>
              <h2>Make the potential visible.</h2>
              <Button primary onClick={() => go("signup")}>
                Build your farm profile <ArrowUpRight size={17} />
              </Button>
              <p className="muted">
                A proof of concept built for Zimbabwe’s agricultural future.
              </p>
            </section>
          </>
        ) : page === "signin" || page === "signup" ? (
          <Auth mode={page} enter={enter} />
        ) : (
          <div className="public-content">
            {page === "farms" ? (
              <>
                <Heading
                  title="Agricultural profiles"
                  description="Explore farms and their evidence-review status."
                />
                <div className="grid cols3">
                  {state.farms.map((f) => (
                    <FarmCard key={f.id} farm={f} go={go} publicView />
                  ))}
                </div>
              </>
            ) : page === "business-profile" ? (
              <FarmProfile
                role="public"
                publicView
                id={id}
                go={(p) =>
                  ["feed", "messages"].includes(p) ? go("signin") : go(p)
                }
              />
            ) : page === "financing" ? (
              <Financing role="public" go={go} institutionId={id} />
            ) : page === "news" || page === "article" ? (
              <News id={id} go={go} />
            ) : page === "how" ? (
              <>
                <Heading
                  eyebrow="From evidence to opportunity"
                  title="How Farm-Capta works"
                  description="A structured path to credible agricultural information."
                />
                <div className="grid cols3">
                  {[
                    [
                      "Farmers & landowners",
                      "Complete identity, farm, tenure, production and consent steps. Track your evidence as it is reviewed.",
                    ],
                    [
                      "Lenders & institutions",
                      "Discover farms, assess due-diligence reports and manage financing applications using standardised information.",
                    ],
                    [
                      "Verification & monitoring",
                      "Review documents, request corrections, record decisions and keep seasonal farm information current.",
                    ],
                  ].map(([t, d]) => (
                    <div className="card" key={t}>
                      <h2>{t}</h2>
                      <p>{d}</p>
                    </div>
                  ))}
                </div>
                <Button primary onClick={() => go("signup")}>
                  Start your profile
                </Button>
              </>
            ) : page === "about" ? (
              <>
                <Heading
                  eyebrow="Agricultural verification & financing intelligence"
                  title="Our land, Our Agriculture, Our future."
                />
                <div className="card editorial">
                  <h2>Making farm potential easier to understand.</h2>
                  <p>
                    Farm-Capta is a Zimbabwean agricultural verification and
                    financing intelligence proof of concept. It helps farmers
                    build credible digital profiles and gives lenders structured
                    evidence for financing assessment.
                  </p>
                  <p>
                    The project starts as a B2B verification and data service,
                    bringing identity, land-tenure, production and operational
                    information into a connected workflow.
                  </p>
                  <h2>A foundation for the future</h2>
                  <p>
                    Future investment infrastructure is a longer-term ambition.
                    Farm-Capta focuses on verification, farm intelligence and
                    legitimate financing relationships.
                  </p>
                  <div className="notice">{investmentNotice}</div>
                  <h2>Built for a controlled pilot</h2>
                  <p>
                    The project is being developed by two Computer Science
                    students, with agricultural, financing and regulatory
                    expertise sought through advisors and institutional
                    partners.
                  </p>
                </div>
              </>
            ) : ["privacy", "terms"].includes(page) ? (
              <>
                <Heading title={page === "privacy" ? "Privacy" : "Terms"} />
                <div className="card">
                  <p>
                    Use sample information only. Live financial and
                    identity-verification services are not connected. Activity
                    is saved in your browser. Sensitive onboarding drafts and
                    uploaded file contents remain in memory and clear when the
                    page refreshes.
                  </p>
                  <p>
                    No live investment, loan contract, payment, credit decision
                    or external communication is made. Verification badges
                    describe simulated review decisions.
                  </p>
                </div>
              </>
            ) : (
              <Empty
                title="Page not found"
                action="Return home"
                onAction={() => go("home")}
              />
            )}
          </div>
        )}
      </main>
      <footer className="footer">
        <Brand />
        <p>Our land, Our Agriculture, Our future.</p>
        <div className="actions">
          <button onClick={() => go("about")}>About</button>
          <button onClick={() => go("privacy")}>Privacy</button>
          <button onClick={() => go("terms")}>Terms</button>
        </div>
      </footer>
      {menu && (
        <Modal title="Explore Farm-Capta" onClose={() => setMenu(false)}>
          <nav className="drawer-nav">
            {links.map(([p, label]) => (
              <Button
                key={p}
                onClick={() => {
                  go(p);
                  setMenu(false);
                }}
              >
                {label}
              </Button>
            ))}
          </nav>
        </Modal>
      )}
    </>
  );
}
function Auth({ mode, enter }) {
  const [role, setRole] = useState("farmer");
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);
  const { state } = useStore();
  return (
    <div className="auth-layout">
      <div className="auth-story">
        <div className="eyebrow">THE FARM-CAPTA WORKSPACE</div>
        <h1>
          See the evidence.
          <br />
          Understand the potential.
        </h1>
        <p>
          Step into Zimbabwe’s connected agricultural verification and financing
          ecosystem.
        </p>
        <ShieldCheck size={42} />
      </div>
      <div className="card">
        <Heading
          title={
            mode === "signup" ? "Start your journey" : "Welcome to Farm-Capta"
          }
          description="Choose an experience to explore."
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (state.suspended.includes(role)) {
              setError(
                "This account is suspended. An admin can restore access.",
              );
              return;
            }
            enter(
              role,
              mode === "signup" &&
                ["farmer", "business", "investor"].includes(role)
                ? "onboarding"
                : "overview",
            );
          }}
        >
          <Field
            label="Workspace"
            options={roles}
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError("");
            }}
            required
          />
          <div className="demo-account">
            <strong>{names[role]}</strong>
            <small>Sample account · no password required</small>
          </div>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <Button primary className="full">
            {mode === "signup" ? "Start profile" : "Enter workspace"}
            <ArrowRight size={16} />
          </Button>
        </form>
        <Button className="text-button" onClick={() => setForgot(true)}>
          About sign-in & account recovery
        </Button>
      </div>
      {forgot && (
        <Modal title="Account access" onClose={() => setForgot(false)}>
          <p>
            Sample accounts open without a password. Changes are saved in this
            browser. Live account authentication and password recovery are not
            connected yet.
          </p>
        </Modal>
      )}
    </div>
  );
}
function GlobalSearch({ role, go }) {
  const { state } = useStore();
  const [query, setQuery] = useState("");
  const results = query.trim()
    ? [
        ...state.farms
          .filter((f) =>
            `${f.name} ${f.farmer} ${f.crop}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
          .map((f) => ({
            label: f.name,
            group: "Farms",
            page: `${role === "lender" ? "farm-report" : "business-profile"}/${f.id}`,
          })),
        ...state.products
          .filter(
            (p) =>
              p.active &&
              `${p.type} ${p.provider}`
                .toLowerCase()
                .includes(query.toLowerCase()),
          )
          .map((p) => ({
            label: `${p.provider} · ${p.type}`,
            group: "Financing",
            page:
              role === "admin"
                ? "institutions"
                : `financing/${p.institutionId}`,
          })),
        ...state.institutions
          .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
          .map((i) => ({
            label: i.name,
            group: "Institutions",
            page: `institutions/${i.id}`,
          })),
        ...state.articles
          .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
          .map((a) => ({
            label: a.title,
            group: "News",
            page: role === "admin" ? "content" : `article/${a.id}`,
          })),
        ...state.posts
          .filter(
            (p) =>
              !p.hidden && p.text.toLowerCase().includes(query.toLowerCase()),
          )
          .map((p) => ({
            label: p.text.slice(0, 65),
            group: "Posts",
            page: role === "admin" ? "content" : "feed",
          })),
      ].slice(0, 8)
    : [];
  return (
    <div className="global-search">
      <label>
        <Search size={17} />
        <input
          aria-label="Search farms, institutions, products and news"
          placeholder="Search the agricultural ecosystem…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
        />
      </label>
      {query && (
        <div className="search-results">
          <div className="split">
            <small>{results.length} results</small>
            <button onClick={() => setQuery("")}>Close</button>
          </div>
          {results.length ? (
            results.map((r, i) => (
              <button
                key={i}
                onClick={() => {
                  go(r.page);
                  setQuery("");
                }}
              >
                <small>{r.group}</small>
                {r.label}
              </button>
            ))
          ) : (
            <p>No matches. Try a farm, crop or provider.</p>
          )}
        </div>
      )}
    </div>
  );
}
function Shell({ role, page, go, enter, logout, children }) {
  const { state, storageError } = useStore();
  const [drawer, setDrawer] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const items = nav[role];
  const unread = state.notifications.filter(
    (n) => n.role === role && !n.read,
  ).length;
  const navigation = (
    <nav className="workspace-nav" aria-label="Workspace navigation">
      {items.map(([p, label, Icon]) => (
        <button
          key={p}
          className={page === p ? "active" : ""}
          aria-current={page === p ? "page" : undefined}
          onClick={() => {
            go(p);
            setDrawer(false);
          }}
        >
          <Icon size={18} />
          {label}
        </button>
      ))}
    </nav>
  );
  return (
    <div className={`shell ${state.settings.compact ? "compact" : ""}`}>
      <a
        href="#workspace-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("workspace-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <aside className="sidebar">
        <button className="brand-button" onClick={() => go("overview")}>
          <Brand />
        </button>
        <div className="workspace-label">
          {role === "business" ? "Agricultural business" : role} workspace
        </div>
        {navigation}
        <div className="sidebar-bottom">
          <Button onClick={() => setSwitcher(true)}>Switch workspace</Button>
          <button className="logout" onClick={logout}>
            <LogOut size={16} /> Return to public site
          </button>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <GlobalSearch role={role} go={go} />
          <div className="actions">
            <button
              className="notification-button"
              onClick={() => go("notifications")}
              aria-label={`Notifications, ${unread} unread`}
            >
              <Bell size={20} />
              {unread > 0 && <span>{Math.min(unread, 99)}</span>}
            </button>
            <button
              className="avatar"
              aria-label="Open my profile"
              onClick={() => go("profile")}
            >
              {state.profiles[role].name[0]}
            </button>
          </div>
        </header>
        <main id="workspace-content" tabIndex="-1" className="content">
          {storageError && (
            <div className="notice" role="alert">
              Browser storage is unavailable. Changes work in this tab but
              cannot survive refresh. Check your browser storage settings.
            </div>
          )}
          {children}
        </main>
      </div>
      <nav className="mobile-tabs" aria-label="Primary mobile navigation">
        {items.slice(0, 4).map(([p, label, Icon]) => (
          <button
            key={p}
            className={page === p ? "active" : ""}
            aria-current={page === p ? "page" : undefined}
            onClick={() => go(p)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
        <button
          onClick={() => setDrawer(true)}
          aria-label="Open all navigation"
        >
          <Menu size={19} />
          <span>More</span>
        </button>
      </nav>
      {drawer && (
        <Modal title="Your workspace" onClose={() => setDrawer(false)}>
          {navigation}
          <div className="actions">
            <Button
              onClick={() => {
                setDrawer(false);
                setSwitcher(true);
              }}
            >
              Switch workspace
            </Button>
            <Button onClick={logout}>Public site</Button>
          </div>
        </Modal>
      )}
      {switcher && (
        <Modal title="Choose a workspace" onClose={() => setSwitcher(false)}>
          <p>Choose the workspace you want to open.</p>
          <div className="role-options">
            {roles.map((r) => (
              <Button
                key={r}
                disabled={state.suspended.includes(r)}
                onClick={() => {
                  enter(r, "overview");
                  setSwitcher(false);
                }}
              >
                {r}
                <small>{names[r]}</small>
              </Button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
function View({ role, page, id, go }) {
  const owner = ["farmer", "business"].includes(role);
  if (page === "overview") return <Dashboard role={role} go={go} />;
  if (page === "profile") return <Profile role={role} />;
  if (page === "notifications") return <Notifications role={role} go={go} />;
  if (page === "business-profile")
    return <FarmProfile role={role} publicView id={id} go={go} />;
  if (role === "admin" && nav.admin.some(([p]) => p === page))
    return <Admin page={page} />;
  if (page === "onboarding" && (owner || role === "investor"))
    return <Onboarding role={role} go={go} />;
  if (page === "verification" && (owner || role === "investor"))
    return <Verification role={role} go={go} />;
  if (page === "farm-profile" && owner)
    return <FarmProfile role={role} go={go} />;
  if (
    page === "farm-report" &&
    (role === "lender" || (owner && Number(id) === 1))
  )
    return <FarmProfile role={role} id={id} go={go} />;
  if (page === "documents" && owner) return <Documents role={role} />;
  if (["discovery", "reports"].includes(page) && role === "lender")
    return <Discovery go={go} />;
  if (page === "monitoring" && (owner || role === "lender"))
    return <Monitoring role={role} />;
  if (page === "financing" && role !== "admin")
    return <Financing role={role} go={go} institutionId={id} />;
  if (page === "products" && role === "lender")
    return <Financing role={role} go={go} manage />;
  if (page === "applications" && (owner || role === "lender"))
    return <Applications role={role} go={go} />;
  if (page === "portfolio" && ["lender", "investor"].includes(role))
    return <Portfolio role={role} go={go} />;
  if (
    ["opportunities", "opportunity", "saved", "watchlist"].includes(page) &&
    role === "investor"
  )
    return <Opportunities page={page} id={id} go={go} />;
  if (page === "feed" && role !== "admin") return <Feed role={role} />;
  if (["news", "article", "education"].includes(page) && role !== "admin")
    return <News education={page === "education"} id={id} go={go} />;
  if (["institution", "institutions"].includes(page) && role !== "admin")
    return (
      <Institutions
        id={id}
        role={role}
        go={go}
        manage={role === "lender" && page === "institution"}
      />
    );
  if (page === "messages" && role !== "admin") return <Messages role={role} />;
  return (
    <Empty
      title="This page isn’t available in your workspace"
      text="Choose a section from your navigation or switch workspaces."
      action="Back to overview"
      onAction={() => go("overview")}
    />
  );
}
class ErrorBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="error-page">
        <h1>Something didn’t load correctly.</h1>
        <p>Your saved activity remains in this browser. Reload to try again.</p>
        <Button primary onClick={() => location.reload()}>
          Reload workspace
        </Button>
      </div>
    ) : (
      this.props.children
    );
  }
}
function App() {
  const [route, setRoute] = useState(readRoute);
  const [session, setSession] = useState(() => {
    try {
      return sessionStorage.getItem("farmcapta-role");
    } catch {
      return null;
    }
  });
  const { state, clearSessionData } = useStore();
  useEffect(() => {
    const handler = () => setRoute(readRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    document.title = `${route.page.replace(/-/g, " ")} · Farm-Capta`;
    window.scrollTo(0, 0);
    document.querySelector("main")?.focus({ preventScroll: true });
  }, [route.scope, route.page, route.id]);
  const enter = (r, p) => {
    if (!roles.includes(r) || state.suspended.includes(r)) return;
    setSession(r);
    try {
      sessionStorage.setItem("farmcapta-role", r);
    } catch {}
    navigate(r, p);
  };
  const logout = () => {
    setSession(null);
    clearSessionData();
    try {
      sessionStorage.removeItem("farmcapta-role");
    } catch {}
    navigate("public", "home");
  };
  if (route.scope === "public")
    return <PublicSite page={route.page} id={route.id} enter={enter} />;
  if (!roles.includes(route.scope))
    return <PublicSite page="not-found" enter={enter} />;
  if (session !== route.scope)
    return <PublicSite page="signin" enter={enter} />;
  if (state.suspended.includes(session))
    return (
      <div className="error-page">
        <Heading
          title="Access suspended"
          description="An admin can restore this account."
        />
        <Button onClick={logout}>Return to sign-in</Button>
      </div>
    );
  const go = (p) => navigate(session, p);
  return (
    <Shell
      role={session}
      page={route.page}
      go={go}
      enter={enter}
      logout={logout}
    >
      <Suspense
        fallback={
          <div className="skeleton" role="status">
            Loading your workspace…
          </div>
        }
      >
        <View
          key={`${session}/${route.page}/${route.id || ""}`}
          role={session}
          page={route.page}
          id={route.id}
          go={go}
        />
      </Suspense>
    </Shell>
  );
}
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Provider>
      <App />
    </Provider>
  </ErrorBoundary>,
);
