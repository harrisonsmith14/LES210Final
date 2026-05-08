"use client";

import { Question, QUESTIONS } from "./questions";

// Mastery levels per question:
// 0 = unseen
// 1 = learning (got wrong, or not yet correct twice)
// 2 = familiar (one correct in a row)
// 3 = mastered (two correct in a row)
//
// Wrong answer drops the question back to 1.

export type QuestionState = {
  level: 0 | 1 | 2 | 3;
  streak: number;        // current correct streak
  attempts: number;
  correct: number;
  lastSeen: number;      // timestamp
};

export type Progress = Record<string, QuestionState>;

const STORAGE_KEY = "les210-progress-v1";

export function loadProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function getState(progress: Progress, id: string): QuestionState {
  return (
    progress[id] || {
      level: 0,
      streak: 0,
      attempts: 0,
      correct: 0,
      lastSeen: 0,
    }
  );
}

export function recordAnswer(
  progress: Progress,
  id: string,
  correct: boolean
): Progress {
  const prev = getState(progress, id);
  const attempts = prev.attempts + 1;
  const correctCount = prev.correct + (correct ? 1 : 0);
  const streak = correct ? prev.streak + 1 : 0;

  let level: QuestionState["level"];
  if (!correct) {
    level = 1;
  } else if (streak >= 2) {
    level = 3;
  } else if (streak >= 1) {
    level = 2;
  } else {
    level = 1;
  }

  return {
    ...progress,
    [id]: {
      level,
      streak,
      attempts,
      correct: correctCount,
      lastSeen: Date.now(),
    },
  };
}

// Pick the next question — prioritizes unseen and lower-mastery questions.
// Adds slight randomization within tier so order isn't predictable.
export function pickNext(progress: Progress, lastId?: string): Question | null {
  if (QUESTIONS.length === 0) return null;

  const pool = QUESTIONS.filter((q) => q.id !== lastId);
  const candidates = pool.length > 0 ? pool : QUESTIONS;

  // Sort by: lowest level first, then oldest lastSeen, then random tiebreaker
  const scored = candidates.map((q) => {
    const s = getState(progress, q.id);
    return { q, s, rand: Math.random() };
  });

  scored.sort((a, b) => {
    if (a.s.level !== b.s.level) return a.s.level - b.s.level;
    if (a.s.lastSeen !== b.s.lastSeen) return a.s.lastSeen - b.s.lastSeen;
    return a.rand - b.rand;
  });

  // Take top tier and pick randomly within it (avoid identical re-picks if pool is bigger)
  const topLevel = scored[0].s.level;
  const tier = scored.filter((x) => x.s.level === topLevel);
  const pick = tier[Math.floor(Math.random() * Math.min(tier.length, 4))];
  return pick.q;
}

// Aggregates
export function computeStats(progress: Progress) {
  const total = QUESTIONS.length;
  let mastered = 0;
  let familiar = 0;
  let learning = 0;
  let unseen = 0;

  for (const q of QUESTIONS) {
    const s = getState(progress, q.id);
    if (s.level === 3) mastered++;
    else if (s.level === 2) familiar++;
    else if (s.level === 1) learning++;
    else unseen++;
  }

  const attempts = Object.values(progress).reduce((a, s) => a + s.attempts, 0);
  const correct = Object.values(progress).reduce((a, s) => a + s.correct, 0);
  const accuracy = attempts > 0 ? correct / attempts : 0;

  // Mastery score: weighted progress toward fully mastered
  // unseen=0, learning=0.33, familiar=0.66, mastered=1
  const score =
    (mastered * 1 + familiar * 0.66 + learning * 0.33) / total;

  return {
    total,
    mastered,
    familiar,
    learning,
    unseen,
    attempts,
    correct,
    accuracy,
    score, // 0..1
  };
}

export function statsByTopic(progress: Progress) {
  const map: Record<
    string,
    { total: number; mastered: number; familiar: number; learning: number; unseen: number }
  > = {};
  for (const q of QUESTIONS) {
    if (!map[q.topic]) {
      map[q.topic] = { total: 0, mastered: 0, familiar: 0, learning: 0, unseen: 0 };
    }
    map[q.topic].total++;
    const s = getState(progress, q.id);
    if (s.level === 3) map[q.topic].mastered++;
    else if (s.level === 2) map[q.topic].familiar++;
    else if (s.level === 1) map[q.topic].learning++;
    else map[q.topic].unseen++;
  }
  return map;
}
