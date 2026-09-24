import React, { useState } from "react";
import { useStore } from "./store.jsx";
import {
  Button,
  Heading,
  Field,
  Empty,
  Modal,
  Tabs,
  Badge,
  Timeline,
} from "./ui.jsx";
import { uid, stamp, names } from "./model.js";
export function Feed({ role }) {
  const { state, update, notify } = useStore();
  const [tab, setTab] = useState("All updates");
  const [report, setReport] = useState(null);
  const posts = state.posts.filter(
    (p) =>
      !p.hidden &&
      (tab !== "Saved" || p.saved.includes(role)) &&
      (tab !== "Following" || state.following.includes(`${role}:${p.author}`)),
  );
  const publisher =
    ["lender", "business", "admin"].includes(role) &&
    (role !== "lender" ||
      state.institutions.find((i) => i.id === "1")?.verified);
  const toggle = (id, key) =>
    update(
      (s) => {
        const post = s.posts.find((p) => p.id === id);
        post[key] = post[key].includes(role)
          ? post[key].filter((r) => r !== role)
          : [...post[key], role];
      },
      undefined,
      role,
    );
  return (
    <>
      <Heading
        title="Agri Feed"
        description="Field updates, institutional insights and conversations around better agriculture."
      />
      <div className="feed-layout">
        <div>
          <Tabs
            items={["All updates", "Following", "Saved"]}
            value={tab}
            onChange={setTab}
          />
          {publisher && (
            <form
              className="card"
              onSubmit={(e) => {
                e.preventDefault();
                const text = new FormData(e.target).get("text").trim();
                if (!text) return;
                update(
                  (s) =>
                    s.posts.unshift({
                      id: uid(),
                      author:
                        role === "lender"
                          ? s.institutions[0].name
                          : role === "business"
                            ? s.farms[0].name
                            : "Farm-Capta Compliance",
                      text,
                      likes: [],
                      saved: [],
                      comments: [],
                      hidden: false,
                    }),
                  "Agricultural update published",
                  role,
                );
                e.target.reset();
                notify("Your demo update is published.");
              }}
            >
              <Field
                label="Share an agricultural update"
                name="text"
                textarea
                maxLength="2000"
                required
              />
              <Button primary>Publish update</Button>
            </form>
          )}
          {posts.map((p) => (
            <article className="card post" key={p.id}>
              <div className="split">
                <div className="actions">
                  <span className="avatar">{p.author[0]}</span>
                  <div>
                    <strong>{p.author}</strong>
                    <small>Fictional agricultural update</small>
                  </div>
                </div>
                <Button
                  aria-pressed={state.following.includes(`${role}:${p.author}`)}
                  onClick={() =>
                    update((s) => {
                      const key = `${role}:${p.author}`;
                      s.following = s.following.includes(key)
                        ? s.following.filter((x) => x !== key)
                        : [...s.following, key];
                    })
                  }
                >
                  {state.following.includes(`${role}:${p.author}`)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              </div>
              <p className="post-text">{p.text}</p>
              <div className="actions">
                <Button
                  aria-pressed={p.likes.includes(role)}
                  onClick={() => toggle(p.id, "likes")}
                >
                  {p.likes.includes(role) ? "Unlike" : "Like"} ·{" "}
                  {p.likes.length}
                </Button>
                <Button
                  aria-pressed={p.saved.includes(role)}
                  onClick={() => toggle(p.id, "saved")}
                >
                  {p.saved.includes(role) ? "Unsave" : "Save"}
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `${p.author}: ${p.text}`,
                      );
                      notify("Update copied to clipboard.");
                    } catch {
                      notify(
                        "Clipboard unavailable. Select and copy the update text.",
                      );
                    }
                  }}
                >
                  Copy to share
                </Button>
                <Button onClick={() => setReport(p)}>Report</Button>
              </div>
              <details>
                <summary>Comments ({p.comments.length})</summary>
                {p.comments.map((c) => (
                  <div className="comment" key={c.id}>
                    <strong>{c.author}</strong>
                    <p>{c.text}</p>
                  </div>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const text = new FormData(e.target).get("comment").trim();
                    if (!text) return;
                    update(
                      (s) =>
                        s.posts
                          .find((x) => x.id === p.id)
                          .comments.push({
                            id: uid(),
                            author: names[role],
                            text,
                            at: stamp(),
                          }),
                      "Comment added",
                      role,
                    );
                    e.target.reset();
                  }}
                >
                  <Field
                    label={`Comment on ${p.author}'s update`}
                    name="comment"
                    required
                    maxLength="1000"
                  />
                  <Button>Post comment</Button>
                </form>
              </details>
            </article>
          ))}
          {!posts.length && (
            <Empty
              title="No updates in this view"
              text="Follow an author or save an update from All updates."
            />
          )}
        </div>
        <aside className="card feed-aside">
          <div className="eyebrow">The field journal</div>
          <h2>Knowledge grows when shared.</h2>
          <p>
            Keep discussions practical: production evidence, seasonal planning,
            market access and lessons from the field.
          </p>
          <p className="muted">
            Only verified demo institutions and agricultural businesses can
            publish. Everyone can follow, save, comment and report.
          </p>
        </aside>
      </div>
      {report && (
        <Modal title="Report this update" onClose={() => setReport(null)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const reason = new FormData(e.target).get("reason");
              update(
                (s) =>
                  s.reports.push({
                    id: uid(),
                    postId: report.id,
                    reason,
                    reporter: role,
                    status: "Open",
                  }),
                "Content report submitted",
                role,
              );
              setReport(null);
              notify("Report sent to the demo moderation queue.");
            }}
          >
            <Field
              label="Reason"
              name="reason"
              options={[
                "Misleading information",
                "Financial solicitation",
                "Abuse or harassment",
                "Other",
              ]}
              required
            />
            <Button primary>Submit report</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function News({ education = false, id, go }) {
  const { state } = useStore();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const selected = state.articles.find((a) => a.id === id);
  const articles = state.articles.filter(
    (a) =>
      (category === "All" || a.cat === category) &&
      a.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Heading
        eyebrow="Farm-Capta intelligence"
        title={education ? "Agricultural learning centre" : "Agri News"}
        description="Fictional editorial examples for the prototype. These are not live market reports."
      />
      {education && (
        <div className="grid cols3">
          {[
            [
              "Understand verification",
              "A verified profile records reviewed evidence. It does not guarantee returns, land ownership or credit approval.",
            ],
            [
              "Understand agricultural risk",
              "Weather, disease, prices and buyer reliability affect farm outcomes. Diversification cannot remove every risk.",
            ],
            [
              "Understand liquidity",
              "Seasonal agriculture may require long time horizons. Future products would have specific withdrawal and loss terms.",
            ],
          ].map(([title, text]) => (
            <article className="card" key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      )}
      <div className="card">
        <Field
          label="Search articles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Tabs
          items={["All", "Markets", "Weather", "Finance"]}
          value={category}
          onChange={setCategory}
        />
      </div>
      <div className="grid cols3">
        {articles.map((a) => (
          <article className="card" key={a.id}>
            <span className="pill info">{a.cat}</span>
            <h2>{a.title.replace("Sample: ", "")}</h2>
            <p className="muted">
              {a.source} · {a.date}
            </p>
            <p>{a.body.slice(0, 100)}…</p>
            <Button onClick={() => go(`article/${a.id}`)}>Read article</Button>
          </article>
        ))}
      </div>
      {!articles.length && (
        <Empty
          title="No matching articles"
          text="Try another search or category."
        />
      )}
      {id && (
        <Modal
          title={selected?.title || "Article unavailable"}
          onClose={() => go(education ? "education" : "news")}
        >
          {selected ? (
            <>
              <p className="muted">
                {selected.source} · {selected.date}
              </p>
              <p>{selected.body}</p>
              <p className="notice">
                Sample educational content, not current market or financial
                advice.
              </p>
            </>
          ) : (
            <p>This article could not be found.</p>
          )}
        </Modal>
      )}
    </>
  );
}
export function Institutions({ role, go, manage = false, id }) {
  const { state, update, notify } = useStore();
  const [edit, setEdit] = useState(false);
  const institutions = manage
    ? state.institutions.filter((i) => i.id === "1")
    : state.institutions.filter((i) => !id || i.id === id);
  return (
    <>
      <Heading
        title={manage ? "Your institution" : "Institution directory"}
        description="Meet the fictional organisations in the Farm-Capta ecosystem."
      />
      <div className="grid cols2">
        {institutions.map((i) => (
          <article className="card" key={i.id}>
            <div className="avatar">{i.name[0]}</div>
            <h2>{i.name}</h2>
            <Badge
              status={
                i.verified ? "Institutional Account Verified" : "Under Review"
              }
            />
            <p>{i.description}</p>
            <dl>
              <dt>Focus</dt>
              <dd>{i.focus}</dd>
              <dt>Regions</dt>
              <dd>{i.regions}</dd>
              <dt>Contact</dt>
              <dd>{i.contact}</dd>
            </dl>
            <div className="actions">
              <Button
                primary
                onClick={() => go(manage ? "products" : `financing/${i.id}`)}
              >
                View financing products
              </Button>
              {manage ? (
                <Button onClick={() => setEdit(true)}>Edit institution</Button>
              ) : (
                <Button
                  onClick={() =>
                    update((s) => {
                      const key = `${role}:${i.name}`;
                      s.following = s.following.includes(key)
                        ? s.following.filter((x) => x !== key)
                        : [...s.following, key];
                    })
                  }
                >
                  {state.following.includes(`${role}:${i.name}`)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
      {edit && (
        <Modal title="Edit institution" onClose={() => setEdit(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = Object.fromEntries(new FormData(e.target));
              update(
                (s) =>
                  Object.assign(
                    s.institutions.find((i) => i.id === "1"),
                    d,
                  ),
                "Institution profile updated",
                role,
              );
              setEdit(false);
              notify("Institution profile saved.");
            }}
          >
            {[
              ["description", "Description"],
              ["focus", "Agriculture focus"],
              ["regions", "Regions served"],
              ["contact", "Contact information"],
            ].map(([key, label]) => (
              <Field
                key={key}
                label={label}
                name={key}
                required
                defaultValue={institutions[0][key]}
              />
            ))}
            <Button primary>Save profile</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Messages({ role }) {
  const { state, update, notify } = useStore();
  const contacts =
    role === "investor"
      ? ["support"]
      : role === "lender"
        ? ["farmer", "business", "support"]
        : ["lender", "support"];
  const [contact, setContact] = useState(contacts[0]);
  const [report, setReport] = useState(false);
  const messages = state.messages.filter(
    (m) =>
      (m.from === role && m.to === contact) ||
      (m.from === contact && m.to === role),
  );
  const blocked = state.blocked.includes(`${role}:${contact}`);
  return (
    <>
      <Heading
        title="Messages"
        description="A local demo inbox. Messages are not sent to external people or institutions."
      />
      <div className="card">
        <Field
          label="Conversation"
          options={contacts}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <div className="actions">
          <Button
            disabled={contact === "support"}
            onClick={() =>
              update(
                (s) => {
                  const key = `${role}:${contact}`;
                  s.blocked = blocked
                    ? s.blocked.filter((x) => x !== key)
                    : [...s.blocked, key];
                },
                blocked ? "Contact unblocked" : "Contact blocked",
                role,
              )
            }
          >
            {blocked ? "Unblock" : "Block contact"}
          </Button>
          <Button onClick={() => setReport(true)}>Report conversation</Button>
        </div>
        <div className="conversation" aria-live="polite">
          {messages.length ? (
            messages.map((m) => (
              <div
                key={m.id}
                className={`bubble ${m.from === role ? "mine" : ""}`}
              >
                <strong>{m.from === role ? "You" : m.from}</strong>
                <p>{m.text}</p>
                <small>{new Date(m.at).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <Empty
              title="Start a conversation"
              text="Ask about verification or a demo application. Investor messaging is limited to support."
            />
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = new FormData(e.target).get("message").trim();
            if (!text || blocked) return;
            if (state.blocked.includes(`${contact}:${role}`)) {
              notify(
                "This contact is not accepting messages from this demo account.",
              );
              return;
            }
            update(
              (s) => {
                s.messages.push({
                  id: uid(),
                  from: role,
                  to: contact,
                  text,
                  at: stamp(),
                });
                if (contact === "support")
                  s.messages.push({
                    id: uid(),
                    from: "support",
                    to: role,
                    text: "Automated demo acknowledgement: your support request has been recorded locally. No live support agent is connected.",
                    at: stamp(),
                  });
                else
                  s.notifications.unshift({
                    id: uid(),
                    role: contact,
                    text: "A new demo message is waiting.",
                    page: "messages",
                    read: false,
                  });
              },
              "Demo message added",
              role,
            );
            e.target.reset();
          }}
        >
          <Field
            label="Message"
            name="message"
            textarea
            required
            maxLength="2000"
            disabled={blocked}
          />
          <Button primary disabled={blocked}>
            Send demo message
          </Button>
        </form>
      </div>
      {report && (
        <Modal title="Report conversation" onClose={() => setReport(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const reason = new FormData(e.target).get("reason");
              update(
                (s) =>
                  s.reports.push({
                    id: uid(),
                    reason: `Conversation with ${contact}: ${reason}`,
                    reporter: role,
                    status: "Open",
                  }),
                "Conversation report submitted",
                role,
              );
              setReport(false);
              notify("Report added to the admin queue.");
            }}
          >
            <Field label="Reason" name="reason" textarea required />
            <Button primary>Report</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Notifications({ role, go }) {
  const { state, update } = useStore();
  const rows = state.notifications.filter((n) => n.role === role);
  return (
    <>
      <Heading
        title="Notifications"
        description="Updates from your demo activity."
      >
        <Button
          onClick={() =>
            update((s) =>
              s.notifications
                .filter((n) => n.role === role)
                .forEach((n) => {
                  n.read = true;
                }),
            )
          }
        >
          Mark all as read
        </Button>
      </Heading>
      <div className="card">
        {rows.length ? (
          rows.map((n) => (
            <div className="list-row" key={n.id}>
              <span>
                {!n.read && <span className="unread" />}
                {n.text}
              </span>
              <Button
                onClick={() => {
                  update((s) => {
                    s.notifications.find((x) => x.id === n.id).read = true;
                  });
                  go(n.page);
                }}
              >
                View
              </Button>
            </div>
          ))
        ) : (
          <Empty
            title="You’re all caught up"
            text="Verification and application updates will appear here."
          />
        )}
      </div>
    </>
  );
}
export function Profile({ role }) {
  const { state, update, notify } = useStore();
  return (
    <>
      <Heading
        title="Your profile"
        description="Use fictional contact information in this local demo."
      />
      <form
        className="card"
        onSubmit={(e) => {
          e.preventDefault();
          const d = Object.fromEntries(new FormData(e.target));
          update(
            (s) => {
              s.profiles[role] = { ...s.profiles[role], ...d };
            },
            "Demo profile updated",
            role,
          );
          notify("Profile saved.");
        }}
      >
        <Field
          name="name"
          label="Display name"
          defaultValue={state.profiles[role].name}
          required
        />
        <Field
          name="email"
          label="Demo contact email"
          defaultValue={state.profiles[role].email}
          type="email"
          required
        />
        <label className="check">
          <input
            type="checkbox"
            checked={!!state.profiles[role].marketing}
            onChange={(e) =>
              update((s) => {
                s.profiles[role].marketing = e.target.checked;
              })
            }
          />
          Marketing updates (demo preference)
        </label>
        <Button primary>Save profile</Button>
      </form>
    </>
  );
}
