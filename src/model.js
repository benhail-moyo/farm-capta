import { farms, products, institutions, news } from "./data.js";
import { sampleGPS } from "./locations.js";
export const roles = ["farmer", "lender", "investor", "business", "admin"];
export const names = {
  farmer: "Tendai Moyo",
  lender: "Ruvimbo Ncube",
  investor: "Michael Dube",
  business: "Nyika Plains Farm",
  admin: "Chipo Soko",
};
export const stages = [
  "Submitted",
  "Screening",
  "Due Diligence",
  "Approved",
  "Declined",
  "Funded",
  "Monitoring",
  "Completed",
];
export const transitions = {
  Submitted: ["Screening", "Declined"],
  Screening: ["Due Diligence", "Declined"],
  "Due Diligence": ["Approved", "Declined"],
  Approved: ["Funded", "Declined"],
  Funded: ["Monitoring"],
  Monitoring: ["Completed"],
  Declined: [],
  Completed: [],
};
export const uid = () => crypto.randomUUID();
export const stamp = () => new Date().toISOString();
export const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);
export const date = (s) =>
  s
    ? new Date(s).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not yet reviewed";
export const investmentNotice =
  "Illustrative opportunities only. Not an offer, solicitation or investment recommendation. Investment products remain subject to applicable approvals and licensed partners.";
export function initialState() {
  return {
    version: 2,
    farms: farms.map((f) => ({
      ...f,
      date: f.status === "Verified" ? f.date : null,
      owner: f.id === 1 ? "farmer" : `sample-${f.id}`,
      purpose: "Seasonal inputs and production",
      gps: sampleGPS[f.id],
    })),
    institutions: institutions.map((x, i) => ({
      ...x,
      id: String(i + 1),
      description:
        "Supporting agricultural businesses with specialist services.",
      contact: "Contact through the Farm-Capta inbox.",
    })),
    products: products.map((p, i) => ({
      ...p,
      id: String(i + 1),
      institutionId: String(i + 1),
      min: [5000, 2000, 1000][i],
      max: [150000, 35000, 100000][i],
      active: institutions[i].verified,
      region: "National",
    })),
    applications: [
      {
        id: "APP-101",
        farmId: 1,
        productId: "1",
        institutionId: "1",
        amount: 85000,
        purpose: "Maize seed and fertiliser",
        status: "Screening",
        notes: [],
        updated: "2026-08-21T10:00:00Z",
        history: [
          { text: "Application submitted", at: "2026-08-20T10:00:00Z" },
        ],
      },
      {
        id: "APP-102",
        farmId: 2,
        productId: "1",
        institutionId: "1",
        amount: 140000,
        purpose: "Soybean production",
        status: "Monitoring",
        notes: [],
        updated: "2026-08-19T10:00:00Z",
        history: [
          {
            text: "Sample facility moved to monitoring",
            at: "2026-08-19T10:00:00Z",
          },
        ],
      },
    ],
    documents: [
      {
        id: "DOC-1",
        farmId: 1,
        name: "Sample A2 offer letter",
        type: "Land tenure",
        status: "Documents Reviewed",
        sample: true,
        shared: true,
      },
      {
        id: "DOC-2",
        farmId: 1,
        name: "Sample identity evidence",
        type: "Identity",
        status: "Documents Reviewed",
        sample: true,
        shared: false,
      },
      {
        id: "DOC-3",
        farmId: 2,
        name: "Sample production record",
        type: "Production",
        status: "Documents Reviewed",
        sample: true,
        shared: true,
      },
    ],
    cases: [
      {
        id: "CASE-1",
        farmId: 1,
        role: "farmer",
        kind: "Farm verification",
        name: "Nyika Plains Farm",
        status: "Under Review",
        notes: [],
      },
      {
        id: "CASE-2",
        farmId: 1,
        role: "farmer",
        kind: "Identity",
        name: "Tendai Moyo",
        status: "Action Required",
        notes: [
          {
            text: "Supply a current identity document for review.",
            at: "2026-08-20T10:00:00Z",
          },
        ],
      },
    ],
    profiles: Object.fromEntries(
      roles.map((r) => [r, { name: names[r], email: `${r}@farmcapta.local` }]),
    ),
    posts: [
      {
        id: "POST-1",
        author: "Mazowe Horticulture Estate",
        text: "Our sample winter greenhouse cycle is underway. Field teams are recording transplanting dates and water use.",
        likes: [],
        saved: [],
        comments: [],
        hidden: false,
      },
      {
        id: "POST-2",
        author: "AgriCredit Zimbabwe",
        text: "Briefing: prepare a crop budget, tenure evidence and buyer information before applying for seasonal finance.",
        likes: [],
        saved: [],
        comments: [],
        hidden: false,
      },
    ],
    articles: news.map((n, i) => ({
      ...n,
      id: String(i + 1),
      body: [
        "Verified supplier profiles help buyers understand production capacity. This sample briefing illustrates how Farm-Capta brings farm evidence and market context together. Record delivery history and keep buyer contacts up to date.",
        "A practical irrigation plan documents the water source, equipment condition, operating costs and crop requirements. This educational sample is not a live weather forecast. Confirm local conditions before planting.",
        "Production records, a clear seasonal budget and evidence of market access can support a lender assessment. Verification does not guarantee approval. This fictional briefing demonstrates agricultural intelligence.",
      ][i],
    })),
    saved: [],
    watchlist: [],
    waitlist: [],
    following: [],
    reports: [],
    messages: [],
    blocked: [],
    milestones: [
      {
        id: "M-1",
        farmId: 1,
        title: "Prepare the current season crop budget",
        due: "2026-10-15",
        done: false,
      },
      {
        id: "M-2",
        farmId: 1,
        title: "Schedule field verification",
        due: "2026-10-22",
        done: false,
      },
    ],
    notifications: [
      {
        id: "N-1",
        role: "farmer",
        text: "Identity review needs an updated document.",
        page: "documents",
        read: false,
      },
    ],
    audit: [
      {
        id: "A-1",
        text: "Workspace created",
        actor: "System",
        at: "2026-08-21T10:00:00Z",
      },
    ],
    settings: { compact: false },
    suspended: [],
  };
}
export function accessibleDocuments(state, role, farmId) {
  return state.documents.filter(
    (d) =>
      d.farmId === farmId &&
      (role === "admin" ||
        (["farmer", "business"].includes(role) && farmId === 1) ||
        (role === "lender" && d.shared && d.type !== "Identity")),
  );
}
export function validateFile(file) {
  if (!file) return "Choose a file.";
  if (
    !["application/pdf", "image/jpeg", "image/png"].includes(file.type) ||
    !/\.(pdf|jpe?g|png)$/i.test(file.name)
  )
    return "Choose a PDF, JPG or PNG file.";
  if (file.size > 10 * 1024 * 1024) return "Files must be 10 MB or smaller.";
  if (!file.size) return "This file is empty.";
  return "";
}
export function canMove(application, next, role) {
  return (
    role === "lender" &&
    application.institutionId === "1" &&
    (transitions[application.status] || []).includes(next)
  );
}
export function eligibility(farm, product) {
  return [
    { label: "Farm verification complete", ok: farm.status === "Verified" },
    {
      label: "Financing request within product range",
      ok: Number(farm.need) >= product.min && Number(farm.need) <= product.max,
    },
    {
      label: "Market evidence available",
      ok: !!farm.offtaker && farm.offtaker !== "Pending",
    },
  ];
}
export function safePersist(state) {
  const copy = structuredClone(state);
  copy.documents = copy.documents.filter((d) => d.sample);
  return copy;
}
