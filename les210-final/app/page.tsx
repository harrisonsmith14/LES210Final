"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Progress,
  QuestionState,
  computeStats,
  getState,
  loadProgress,
  pickNext,
  recordAnswer,
  resetProgress,
  saveProgress,
  statsByTopic,
} from "@/lib/mastery";
import { Question, QUESTIONS, TOPICS } from "@/lib/questions";

type View = "dashboard" | "study" | "review";

export default function Home() {
  const [progress, setProgress] = useState<Progress>({});
  const [view, setView] = useState<View>("dashboard");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveProgress(progress);
  }, [progress, hydrated]);

  if (!hydrated) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="text-ink-700 font-serif italic">Loading…</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen z-10">
      <Header view={view} setView={setView} progress={progress} />
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Dashboard
              progress={progress}
              onStart={() => setView("study")}
              onReset={() => {
                resetProgress();
                setProgress({});
              }}
              onReview={() => setView("review")}
            />
          </motion.div>
        )}
        {view === "study" && (
          <motion.div
            key="study"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Study
              progress={progress}
              setProgress={setProgress}
              onExit={() => setView("dashboard")}
            />
          </motion.div>
        )}
        {view === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Review progress={progress} onExit={() => setView("dashboard")} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}

// ============================================================
// Header
// ============================================================
function Header({
  view,
  setView,
  progress,
}: {
  view: View;
  setView: (v: View) => void;
  progress: Progress;
}) {
  const stats = useMemo(() => computeStats(progress), [progress]);

  return (
    <header className="border-b border-ink-200/70 bg-paper/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setView("dashboard")}
          className="group flex items-center gap-3"
          aria-label="Home"
        >
          <Crest />
          <div className="text-left">
            <div className="font-display text-lg leading-none text-ink-950 tracking-tight">
              LES <span className="text-gold-500">210</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-700 mt-1">
              American Legal System
            </div>
          </div>
        </button>

        <div className="hidden sm:flex items-center gap-1 text-sm">
          <NavLink active={view === "dashboard"} onClick={() => setView("dashboard")}>
            Overview
          </NavLink>
          <NavLink active={view === "study"} onClick={() => setView("study")}>
            Study
          </NavLink>
          <NavLink active={view === "review"} onClick={() => setView("review")}>
            Review
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs">
          <div className="text-ink-700 tabular">
            <span className="font-semibold text-ink-950">{stats.mastered}</span>
            <span className="text-ink-500"> / {stats.total} mastered</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        active ? "text-ink-950" : "text-ink-700 hover:text-ink-950"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-3 right-3 h-px bg-gold-500"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </button>
  );
}

function Crest() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg
        viewBox="0 0 40 40"
        className="w-10 h-10 text-ink-900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        {/* Scales */}
        <path
          d="M 20 11 L 20 28"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M 13 15 L 27 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M 11 15 Q 13 21 15 15"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 25 15 Q 27 21 29 15"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="20" cy="11" r="1.2" fill="currentColor" />
        <circle cx="20" cy="28" r="1.2" fill="currentColor" />
      </svg>
    </div>
  );
}

// ============================================================
// Dashboard
// ============================================================
function Dashboard({
  progress,
  onStart,
  onReset,
  onReview,
}: {
  progress: Progress;
  onStart: () => void;
  onReset: () => void;
  onReview: () => void;
}) {
  const stats = useMemo(() => computeStats(progress), [progress]);
  const byTopic = useMemo(() => statsByTopic(progress), [progress]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold-500" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-ink-700">
            Final Exam · May 8 · 2:30pm
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl text-ink-950 tracking-tight leading-[0.95] mb-6 text-balance">
          Master the
          <br />
          <span className="italic font-medium">American</span>{" "}
          <span className="text-ink-700">Legal System.</span>
        </h1>

        <p className="font-serif text-lg sm:text-xl text-ink-700 max-w-2xl leading-relaxed mb-10 text-balance">
          Fifty application-style questions drawn directly from your study
          guide — federalism, contracts, torts, property, business law, and
          everything in between. Answer correctly twice in a row to master a
          question.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={onStart}>
            {stats.attempts > 0 ? "Continue Studying" : "Begin Studying"}
          </PrimaryButton>
          <SecondaryButton onClick={onReview}>
            Browse All Questions
          </SecondaryButton>
        </div>
      </section>

      {/* Mastery Overview */}
      <section className="mb-16">
        <SectionHeading
          eyebrow="Progress"
          title="Mastery Overview"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Mastered"
            value={stats.mastered}
            total={stats.total}
            color="emerald"
          />
          <StatCard
            label="Familiar"
            value={stats.familiar}
            total={stats.total}
            color="ink"
          />
          <StatCard
            label="Learning"
            value={stats.learning}
            total={stats.total}
            color="gold"
          />
          <StatCard
            label="Unseen"
            value={stats.unseen}
            total={stats.total}
            color="muted"
          />
        </div>

        {/* Master bar */}
        <MasteryBar stats={stats} />

        {stats.attempts > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink-700">
            <div>
              <span className="text-ink-500">Questions attempted: </span>
              <span className="tabular font-medium text-ink-950">
                {stats.attempts}
              </span>
            </div>
            <div>
              <span className="text-ink-500">Accuracy: </span>
              <span className="tabular font-medium text-ink-950">
                {(stats.accuracy * 100).toFixed(0)}%
              </span>
            </div>
            <div>
              <span className="text-ink-500">Mastery score: </span>
              <span className="tabular font-medium text-ink-950">
                {(stats.score * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Topics */}
      <section>
        <SectionHeading eyebrow="By Topic" title="Where to focus next" />
        <div className="grid sm:grid-cols-2 gap-3">
          {TOPICS.map((topic) => {
            const t = byTopic[topic];
            if (!t) return null;
            return <TopicRow key={topic} topic={topic} t={t} />;
          })}
        </div>

        {stats.attempts > 0 && (
          <div className="mt-12 pt-8 border-t border-ink-200/70">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-ink-500 hover:text-ink-700 underline underline-offset-4"
              >
                Reset all progress
              </button>
            ) : (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-ink-700">Reset everything?</span>
                <button
                  onClick={() => {
                    onReset();
                    setShowResetConfirm(false);
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
                >
                  Yes, reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1 border border-ink-300 text-ink-700 rounded text-xs font-medium hover:bg-ink-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <div className="text-[10px] uppercase tracking-[0.25em] text-ink-500 mb-2">
        {eyebrow}
      </div>
      <h2 className="font-display text-2xl sm:text-3xl text-ink-950 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function StatCard({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: "emerald" | "ink" | "gold" | "muted";
}) {
  const colors = {
    emerald: "from-emerald-50 to-emerald-100/30 border-emerald-200/50 text-emerald-900",
    ink: "from-ink-50 to-ink-100/30 border-ink-200 text-ink-900",
    gold: "from-amber-50 to-amber-100/30 border-amber-200/50 text-amber-900",
    muted: "from-ink-50 to-paper border-ink-200/50 text-ink-700",
  };
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 ${colors[color]}`}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] opacity-70 mb-2">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-4xl tabular font-semibold leading-none">
          {value}
        </span>
        <span className="text-sm opacity-50 tabular">/ {total}</span>
      </div>
    </div>
  );
}

function MasteryBar({
  stats,
}: {
  stats: ReturnType<typeof computeStats>;
}) {
  const total = stats.total;
  const seg = (n: number) => `${(n / total) * 100}%`;
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-xs text-ink-700">
        <span className="font-medium">Overall mastery</span>
        <span className="tabular">{(stats.score * 100).toFixed(0)}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-ink-100 overflow-hidden flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: seg(stats.mastered) }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-emerald-500/90"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: seg(stats.familiar) }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-ink-500"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: seg(stats.learning) }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gold-400"
        />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-ink-700">
        <LegendDot color="bg-emerald-500/90" label="Mastered" />
        <LegendDot color="bg-ink-500" label="Familiar" />
        <LegendDot color="bg-gold-400" label="Learning" />
        <LegendDot color="bg-ink-100" label="Unseen" outline />
      </div>
    </div>
  );
}

function LegendDot({
  color,
  label,
  outline,
}: {
  color: string;
  label: string;
  outline?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-2 h-2 rounded-full ${color} ${
          outline ? "border border-ink-300" : ""
        }`}
      />
      <span>{label}</span>
    </div>
  );
}

function TopicRow({
  topic,
  t,
}: {
  topic: string;
  t: { total: number; mastered: number; familiar: number; learning: number; unseen: number };
}) {
  const pct = t.total > 0 ? t.mastered / t.total : 0;
  return (
    <div className="group relative bg-white border border-ink-200/70 rounded-lg p-4 hover:border-ink-300 transition-colors shadow-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-base font-semibold text-ink-950">
          {topic}
        </h3>
        <span className="tabular text-xs text-ink-500">
          {t.mastered}/{t.total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden flex">
        <div
          className="bg-emerald-500/90"
          style={{ width: `${(t.mastered / t.total) * 100}%` }}
        />
        <div
          className="bg-ink-500"
          style={{ width: `${(t.familiar / t.total) * 100}%` }}
        />
        <div
          className="bg-gold-400"
          style={{ width: `${(t.learning / t.total) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================
// Study session
// ============================================================
function Study({
  progress,
  setProgress,
  onExit,
}: {
  progress: Progress;
  setProgress: (p: Progress) => void;
  onExit: () => void;
}) {
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    answered: 0,
    correct: 0,
  });
  const [shake, setShake] = useState(false);

  // Pick first question on mount
  useEffect(() => {
    if (!current) {
      const q = pickNext(progress);
      setCurrent(q);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!current) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-ink-700">No questions available.</div>
      </div>
    );
  }

  const stats = computeStats(progress);
  const state = getState(progress, current.id);

  const handleAnswer = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    const correct = idx === current.answer;
    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
    setRevealed(true);
    setSessionStats((s) => ({
      answered: s.answered + 1,
      correct: s.correct + (correct ? 1 : 0),
    }));
    const next = recordAnswer(progress, current.id, correct);
    setProgress(next);
  };

  const handleNext = () => {
    const next = pickNext(progress, current.id);
    setCurrent(next);
    setSelected(null);
    setRevealed(false);
  };

  const isCorrect = selected === current.answer;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 sm:py-12">
      {/* Progress strip */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 text-xs">
          <button
            onClick={onExit}
            className="text-ink-500 hover:text-ink-950 transition-colors flex items-center gap-1"
          >
            <span>←</span>
            <span>Back to overview</span>
          </button>
          <div className="text-ink-700 tabular">
            <span className="text-ink-500">Session: </span>
            <span className="font-medium text-ink-950">
              {sessionStats.correct}/{sessionStats.answered}
            </span>
          </div>
        </div>
        <div className="h-1 rounded-full bg-ink-100 overflow-hidden flex">
          <motion.div
            animate={{ width: `${(stats.mastered / stats.total) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-emerald-500/90"
          />
          <motion.div
            animate={{ width: `${(stats.familiar / stats.total) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-ink-500"
          />
          <motion.div
            animate={{ width: `${(stats.learning / stats.total) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gold-400"
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.article
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`bg-white rounded-2xl border border-ink-200/70 shadow-card-lg overflow-hidden ${
            shake ? "animate-shake" : ""
          }`}
        >
          <div className="px-6 sm:px-10 pt-8 pb-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold-500 font-medium">
                {current.topic}
              </div>
              <div className="h-px flex-1 bg-ink-200/70" />
              <MasteryBadge level={state.level} />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-ink-950 leading-snug text-balance">
              {current.prompt}
            </h2>
          </div>

          <div className="px-6 sm:px-10 py-6 space-y-2.5">
            {current.choices.map((choice, idx) => (
              <ChoiceButton
                key={idx}
                idx={idx}
                choice={choice}
                selected={selected}
                revealed={revealed}
                isCorrect={idx === current.answer}
                onClick={() => handleAnswer(idx)}
              />
            ))}
          </div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div
                  className={`mx-6 sm:mx-10 my-2 p-5 rounded-lg border-l-4 ${
                    isCorrect
                      ? "bg-emerald-50/50 border-emerald-500"
                      : "bg-ink-50/70 border-gold-500"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isCorrect ? "text-emerald-700" : "text-gold-500"
                      }`}
                    >
                      {isCorrect ? "Correct" : "Not quite"}
                    </span>
                    {!isCorrect && (
                      <span className="text-xs text-ink-700">
                        — the answer is{" "}
                        <span className="font-semibold text-ink-950">
                          {String.fromCharCode(65 + current.answer)}
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-[15px] leading-relaxed text-ink-800">
                    {current.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-6 sm:px-10 py-5 border-t border-ink-100 flex items-center justify-between bg-paper/50">
            <div className="text-xs text-ink-500">
              {revealed ? (
                state.streak >= 2 ? (
                  <span className="text-emerald-700 font-medium">
                    ✓ Mastered
                  </span>
                ) : state.streak === 1 ? (
                  <span className="text-ink-700 font-medium">
                    One more correct to master
                  </span>
                ) : (
                  <span>Get this right twice in a row to master it</span>
                )
              ) : (
                <span>Choose an answer</span>
              )}
            </div>
            {revealed && (
              <PrimaryButton onClick={handleNext}>
                Next question →
              </PrimaryButton>
            )}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function ChoiceButton({
  idx,
  choice,
  selected,
  revealed,
  isCorrect,
  onClick,
}: {
  idx: number;
  choice: string;
  selected: number | null;
  revealed: boolean;
  isCorrect: boolean;
  onClick: () => void;
}) {
  const letter = String.fromCharCode(65 + idx);
  const wasSelected = selected === idx;

  let stateClasses =
    "border-ink-200 bg-white hover:border-ink-400 hover:bg-ink-50/40";
  if (revealed) {
    if (isCorrect) {
      stateClasses =
        "border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500/30";
    } else if (wasSelected) {
      stateClasses = "border-red-300 bg-red-50/40";
    } else {
      stateClasses = "border-ink-200 bg-white opacity-60";
    }
  } else if (wasSelected) {
    stateClasses = "border-ink-700 bg-ink-50";
  }

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      className={`group w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-200 flex items-start gap-3 ${stateClasses} ${
        revealed ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-serif text-sm font-semibold transition-colors ${
          revealed && isCorrect
            ? "bg-emerald-500 text-white"
            : revealed && wasSelected && !isCorrect
            ? "bg-red-400 text-white"
            : wasSelected
            ? "bg-ink-900 text-white"
            : "bg-ink-100 text-ink-700 group-hover:bg-ink-200"
        }`}
      >
        {letter}
      </div>
      <span className="flex-1 text-[15px] leading-snug text-ink-900 pt-0.5">
        {choice}
      </span>
      {revealed && isCorrect && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex-shrink-0 text-emerald-600 mt-0.5"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10l3.5 3.5L15 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </button>
  );
}

function MasteryBadge({ level }: { level: QuestionState["level"] }) {
  const labels = {
    0: { label: "New", classes: "bg-ink-100 text-ink-700" },
    1: { label: "Learning", classes: "bg-amber-100 text-amber-800" },
    2: { label: "Familiar", classes: "bg-ink-700 text-white" },
    3: { label: "Mastered", classes: "bg-emerald-600 text-white" },
  } as const;
  const l = labels[level];
  return (
    <span
      className={`text-[10px] uppercase tracking-[0.15em] font-semibold px-2 py-0.5 rounded-full ${l.classes}`}
    >
      {l.label}
    </span>
  );
}

// ============================================================
// Review (browse all questions)
// ============================================================
function Review({
  progress,
  onExit,
}: {
  progress: Progress;
  onExit: () => void;
}) {
  const [filter, setFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return QUESTIONS;
    return QUESTIONS.filter((q) => q.topic === filter);
  }, [filter]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onExit}
          className="text-sm text-ink-500 hover:text-ink-950 transition-colors flex items-center gap-1"
        >
          <span>←</span>
          <span>Back to overview</span>
        </button>
      </div>

      <SectionHeading eyebrow="All Questions" title="Review the bank" />

      <div className="flex flex-wrap gap-2 mb-8">
        <FilterPill
          active={filter === "All"}
          onClick={() => setFilter("All")}
        >
          All
        </FilterPill>
        {TOPICS.map((t) => (
          <FilterPill
            key={t}
            active={filter === t}
            onClick={() => setFilter(t)}
          >
            {t}
          </FilterPill>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((q, i) => {
          const state = getState(progress, q.id);
          const isOpen = expanded === q.id;
          return (
            <article
              key={q.id}
              className="bg-white border border-ink-200/70 rounded-lg overflow-hidden shadow-card"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : q.id)}
                className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-ink-50/30 transition-colors"
              >
                <span className="font-serif text-xs text-ink-500 mt-1 tabular w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-medium">
                      {q.topic}
                    </span>
                    <MasteryBadge level={state.level} />
                  </div>
                  <p className="font-serif text-[15px] text-ink-900 leading-snug">
                    {q.prompt}
                  </p>
                </div>
                <span className="text-ink-400 flex-shrink-0 mt-1">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-ink-100">
                      <ol className="space-y-1.5 mb-4 mt-3">
                        {q.choices.map((choice, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-2 text-sm ${
                              idx === q.answer
                                ? "text-emerald-800 font-medium"
                                : "text-ink-700"
                            }`}
                          >
                            <span className="font-serif tabular flex-shrink-0">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            <span>{choice}</span>
                            {idx === q.answer && (
                              <span className="text-emerald-600 flex-shrink-0">
                                ✓
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                      <div className="bg-ink-50/60 border-l-4 border-gold-500 p-4 rounded-r-md">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-semibold mb-1">
                          Explanation
                        </div>
                        <p className="font-serif text-sm leading-relaxed text-ink-800">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-ink-900 text-white border-ink-900"
          : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
      }`}
    >
      {children}
    </button>
  );
}

// ============================================================
// Buttons & Footer
// ============================================================
function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-3 bg-ink-900 text-white rounded-lg font-medium text-sm tracking-wide hover:bg-ink-950 transition-all duration-200 shadow-card hover:shadow-card-lg active:scale-[0.98]"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
    </button>
  );
}

function SecondaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-white text-ink-900 rounded-lg font-medium text-sm tracking-wide border border-ink-200 hover:border-ink-400 hover:bg-ink-50/40 transition-all duration-200 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-12 mt-16 border-t border-ink-200/70">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
        <div className="font-serif italic">
          Built for the LES 210 final · May 8, 2026
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gold-500" />
          <span>Progress saved locally</span>
        </div>
      </div>
    </footer>
  );
}
