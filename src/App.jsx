import { useState, useEffect, useRef } from "react";
import {
  Search,
  Lightbulb,
  Code2,
  Megaphone,
  BarChart3,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Rocket,
  Circle,
} from "lucide-react";

const STAGE_MS = 1500;

const EXAMPLES = [
  "Affordable laundry pickup for college hostels",
  "Turn my local kirana store into an online shop",
  "AI tool that drafts college assignments' outlines",
];

function buildStages(ideaRaw) {
  const idea = ideaRaw.trim() || "an unnamed idea";
  return [
    {
      key: "research",
      label: "Research",
      verb: "Scanning the market",
      icon: Search,
      fields: [
        { label: "Target customer", value: `People who feel the pain behind “${idea}” at least weekly` },
        { label: "Top competitors", value: "1 direct app, 1 legacy offline player, 1 DIY workaround" },
        { label: "Market gap", value: "Nobody is fast, affordable, and trustworthy at the same time" },
        { label: "Price signal", value: "₹199–₹499/mo tolerated if trust is established early" },
      ],
    },
    {
      key: "product",
      label: "Product",
      verb: "Sketching the MVP",
      icon: Lightbulb,
      fields: [
        { label: "Primary persona", value: "First-time user, mobile-only, low patience for setup" },
        { label: "Core MVP features", value: "Request flow · status tracking · one payment method" },
        { label: "User journey", value: "Open app → describe need → confirm → get notified" },
        { label: "Roadmap phase 1", value: "Ship the single happy path before anything else" },
      ],
    },
    {
      key: "development",
      label: "Development",
      verb: "Drafting the architecture",
      icon: Code2,
      fields: [
        { label: "Suggested stack", value: "React front end · Node/Express API · PostgreSQL" },
        { label: "Core screens", value: "Onboarding · Request · Status · Profile" },
        { label: "Key endpoints", value: "POST /requests · GET /requests/:id · POST /payments" },
        { label: "Data model", value: "User → Request → Status(enum) → Payment" },
      ],
    },
    {
      key: "marketing",
      label: "Marketing",
      verb: "Positioning the launch",
      icon: Megaphone,
      fields: [
        { label: "Landing headline", value: `“${idea.charAt(0).toUpperCase() + idea.slice(1)} — sorted before you notice it.”` },
        { label: "Positioning", value: "The fast, no-nonsense alternative to doing it yourself" },
        { label: "Launch channels", value: "Campus groups · WhatsApp communities · 1 founder-led post" },
        { label: "First campaign", value: "Free first use for the first 50 sign-ups" },
      ],
    },
    {
      key: "analytics",
      label: "Analytics",
      verb: "Reading early signal",
      icon: BarChart3,
      fields: [
        { label: "Sign-ups (wk 1)", value: "47 — mostly from campus groups" },
        { label: "Conversion", value: "18% request → completed" },
        { label: "Retention (wk 2)", value: "31% returned for a second request" },
        { label: "Next test", value: "Cut onboarding from 4 steps to 2" },
      ],
    },
  ];
}

const STAGE_ICONS = { research: Search, product: Lightbulb, development: Code2, marketing: Megaphone, analytics: BarChart3 };

export default function StartupAutopilot() {
  const [view, setView] = useState("input"); // 'input' | 'pipeline'
  const [idea, setIdea] = useState("");
  const [stages, setStages] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [doneSet, setDoneSet] = useState(new Set());
  const [viewIdx, setViewIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (view !== "pipeline") return;
    if (activeIdx >= stages.length) return;
    timerRef.current = setTimeout(() => {
      setDoneSet((prev) => new Set(prev).add(activeIdx));
      setActiveIdx((i) => i + 1);
    }, STAGE_MS);
    return () => clearTimeout(timerRef.current);
  }, [view, activeIdx, stages.length]);

  useEffect(() => {
    // keep the viewer following the active stage as it completes
    setViewIdx((v) => (activeIdx > v ? Math.min(activeIdx, stages.length - 1) : v));
  }, [activeIdx, stages.length]);

  function begin(text) {
    const useIdea = (text ?? idea).trim();
    if (!useIdea) return;
    setIdea(useIdea);
    setStages(buildStages(useIdea));
    setDoneSet(new Set());
    setActiveIdx(0);
    setViewIdx(0);
    setView("pipeline");
  }

  function reset() {
    clearTimeout(timerRef.current);
    setView("input");
    setIdea("");
    setStages([]);
    setDoneSet(new Set());
    setActiveIdx(0);
    setViewIdx(0);
  }

  const allDone = stages.length > 0 && doneSet.size === stages.length;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8"
      style={{
        "--paper": "#0c1a29",
        "--grid": "#173350",
        "--grid-strong": "#204268",
        "--ink": "#eaf3fb",
        "--ink-dim": "#7fa0bd",
        "--ink-faint": "#4d6c88",
        "--amber": "#ff9a4d",
        "--amber-dim": "#c97a3f",
        "--teal": "#5eead4",
        background: "var(--paper)",
        backgroundImage:
          "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        color: "var(--ink)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .sa-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
        .sa-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .sa-card {
          position: relative;
          background: linear-gradient(180deg, rgba(20,40,62,0.55), rgba(12,26,41,0.75));
          border: 1px solid var(--grid-strong);
        }
        .sa-reg {
          position: absolute;
          width: 18px; height: 18px;
          pointer-events: none;
        }
        .sa-reg::before, .sa-reg::after {
          content: ''; position: absolute; background: var(--ink-faint);
        }
        .sa-reg::before { width: 100%; height: 1px; top: 50%; left: 0; }
        .sa-reg::after { height: 100%; width: 1px; left: 50%; top: 0; }
        .sa-reg-circle { position:absolute; width:6px; height:6px; border-radius:50%; border:1px solid var(--ink-faint); top:50%; left:50%; transform: translate(-50%,-50%); }
        @keyframes sa-draw { from { stroke-dashoffset: 340; } to { stroke-dashoffset: 0; } }
        .sa-plot rect { stroke-dasharray: 340; animation: sa-draw 900ms ease-out forwards; }
        @keyframes sa-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        .sa-blink { animation: sa-blink 1.4s ease-in-out infinite; }
        @keyframes sa-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .sa-rise { animation: sa-rise 420ms ease-out both; }
        .sa-scroll::-webkit-scrollbar { height: 6px; }
        .sa-scroll::-webkit-scrollbar-thumb { background: var(--grid-strong); }
      `}</style>

      {view === "input" && (
        <div className="w-full max-w-xl sa-rise">
          <div className="sa-card p-8 sm:p-10" style={{ borderRadius: 2 }}>
            <span className="sa-reg" style={{ top: -1, left: -1 }}><span className="sa-reg-circle" /></span>
            <span className="sa-reg" style={{ top: -1, right: -1 }}><span className="sa-reg-circle" /></span>
            <span className="sa-reg" style={{ bottom: -1, left: -1 }}><span className="sa-reg-circle" /></span>
            <span className="sa-reg" style={{ bottom: -1, right: -1 }}><span className="sa-reg-circle" /></span>

            <div className="flex items-center gap-2 sa-mono text-xs tracking-widest uppercase" style={{ color: "var(--amber)" }}>
              <Rocket size={14} />
              Startup Autopilot
            </div>
            <h1 className="sa-display text-3xl sm:text-4xl font-semibold mt-3 leading-tight">
              Hand over one idea.
              <br />
              Get a drafted startup.
            </h1>
            <p className="mt-3 text-sm" style={{ color: "var(--ink-dim)" }}>
              Type what you're thinking. Five agents will draft the research, product, build, launch and read on it — one panel at a time.
            </p>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. an affordable laundry service for college students"
              rows={3}
              className="w-full mt-6 px-4 py-3 outline-none resize-none text-[15px]"
              style={{
                background: "rgba(8,17,27,0.7)",
                border: "1px solid var(--grid-strong)",
                borderRadius: 2,
                color: "var(--ink)",
              }}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setIdea(ex)}
                  className="sa-mono text-xs px-3 py-1.5 transition-colors"
                  style={{ border: "1px solid var(--grid-strong)", borderRadius: 2, color: "var(--ink-dim)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
                >
                  {ex}
                </button>
              ))}
            </div>

            <button
              onClick={() => begin()}
              disabled={!idea.trim()}
              className="sa-display mt-7 w-full py-3 flex items-center justify-center gap-2 font-semibold text-[15px] transition-opacity disabled:opacity-40"
              style={{ background: "var(--amber)", color: "#1a0e05", borderRadius: 2 }}
            >
              Begin draft
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {view === "pipeline" && stages.length > 0 && (
        <div className="w-full max-w-3xl sa-rise">
          {/* idea strip */}
          <div className="flex items-start justify-between gap-4 mb-4 px-1">
            <div>
              <div className="sa-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--ink-faint)" }}>
                Drafting for
              </div>
              <div className="sa-display text-lg font-medium mt-0.5">{idea}</div>
            </div>
            <button
              onClick={reset}
              className="sa-mono text-xs px-3 py-2 flex items-center gap-1.5 shrink-0"
              style={{ border: "1px solid var(--grid-strong)", borderRadius: 2, color: "var(--ink-dim)" }}
            >
              <RotateCcw size={13} />
              New idea
            </button>
          </div>

          {/* ruler / progress */}
          <div className="relative h-8 mb-1 px-1">
            <div className="absolute left-1 right-1 top-1/2 h-px" style={{ background: "var(--grid-strong)" }} />
            <div
              className="absolute top-1/2 h-px transition-all duration-700 ease-out"
              style={{ left: 4, background: "var(--amber)", width: `${(doneSet.size / stages.length) * 96}%` }}
            />
          </div>

          {/* stage chips */}
          <div className="flex gap-2 overflow-x-auto sa-scroll pb-1 px-1">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const isDone = doneSet.has(i);
              const isActive = i === activeIdx && !isDone;
              const reached = isDone || i === activeIdx;
              return (
                <button
                  key={s.key}
                  disabled={!reached}
                  onClick={() => reached && setViewIdx(i)}
                  className="flex items-center gap-2 px-3 py-2 shrink-0 transition-colors"
                  style={{
                    border: `1px solid ${viewIdx === i ? "var(--amber)" : "var(--grid-strong)"}`,
                    borderRadius: 2,
                    background: viewIdx === i ? "rgba(255,154,77,0.08)" : "transparent",
                    opacity: reached ? 1 : 0.4,
                    cursor: reached ? "pointer" : "default",
                  }}
                >
                  <span className="sa-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>
                    0{i + 1}
                  </span>
                  {isDone ? (
                    <CheckCircle2 size={14} style={{ color: "var(--teal)" }} />
                  ) : isActive ? (
                    <Loader2 size={14} className="animate-spin" style={{ color: "var(--amber)" }} />
                  ) : (
                    <Circle size={10} style={{ color: "var(--ink-faint)" }} />
                  )}
                  <Icon size={14} style={{ color: "var(--ink-dim)" }} />
                  <span className="text-xs sa-display font-medium">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* active panel */}
          <div className="mt-4 sa-card p-6 sm:p-8" style={{ borderRadius: 2, minHeight: 260 }}>
            <span className="sa-reg" style={{ top: -1, left: -1 }}><span className="sa-reg-circle" /></span>
            <span className="sa-reg" style={{ top: -1, right: -1 }}><span className="sa-reg-circle" /></span>
            <span className="sa-reg" style={{ bottom: -1, left: -1 }}><span className="sa-reg-circle" /></span>
            <span className="sa-reg" style={{ bottom: -1, right: -1 }}><span className="sa-reg-circle" /></span>

            {(() => {
              const s = stages[viewIdx];
              const Icon = s.icon;
              const isDoneView = doneSet.has(viewIdx);
              const isActiveView = viewIdx === activeIdx && !isDoneView;

              return (
                <div key={s.key} className="sa-rise">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 flex items-center justify-center shrink-0"
                      style={{ border: "1px solid var(--grid-strong)", borderRadius: 2 }}
                    >
                      <Icon size={16} style={{ color: "var(--amber)" }} />
                    </div>
                    <div>
                      <div className="sa-display font-semibold text-base">{s.label} Agent</div>
                      <div className="sa-mono text-xs flex items-center gap-1.5" style={{ color: "var(--ink-dim)" }}>
                        {isActiveView ? (
                          <>
                            <span className="sa-blink">●</span> {s.verb}…
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={11} style={{ color: "var(--teal)" }} /> Draft complete
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {isActiveView ? (
                    <div className="mt-8 flex flex-col items-center justify-center py-10 gap-3">
                      <Loader2 size={20} className="animate-spin" style={{ color: "var(--ink-faint)" }} />
                      <div className="sa-mono text-xs" style={{ color: "var(--ink-faint)" }}>
                        drafting spec sheet…
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      {s.fields.map((f) => (
                        <div key={f.label} className="pb-3" style={{ borderBottom: "1px solid var(--grid)" }}>
                          <div className="sa-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--ink-faint)" }}>
                            {f.label}
                          </div>
                          <div className="text-sm mt-1.5 leading-snug">{f.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {allDone && (
            <div
              className="mt-4 p-5 flex items-center justify-between gap-4 sa-rise"
              style={{ border: "1px solid var(--teal)", borderRadius: 2, background: "rgba(94,234,212,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} style={{ color: "var(--teal)" }} />
                <div>
                  <div className="sa-display font-semibold text-sm">Autopilot draft complete</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--ink-dim)" }}>
                    Research through analytics, drafted end to end. You're still the CEO — review before you ship.
                  </div>
                </div>
              </div>
              <button
                onClick={reset}
                className="sa-mono text-xs px-3 py-2 shrink-0"
                style={{ border: "1px solid var(--grid-strong)", borderRadius: 2 }}
              >
                Draft another
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
