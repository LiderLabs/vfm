// src/components/InteractiveVfmWall.jsx
// Value for Money word wall: flat charcoal letters on a plain white wall, like the real one.
// No dependencies except React (framer-motion is no longer needed).
//
//  - Letters assemble on scroll. One switch controls every letter, so a word can never be
//    left with a missing letter or a gap, whichever way you scroll. It only resets once the
//    wall is completely out of view.
//  - Autoplay loops forever. Click a word and the loop pauses for 5s, then carries on.
//  - 8 different break animations, one per batch of 5 words, none repeated within a cycle.
//  - Pass fullscreen to fill a TV or kiosk screen:  <InteractiveVfmWall fullscreen />

import { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, memo } from "react";

// ---------- SETTINGS ----------
const SW = 1280; // stage size (everything is laid out on this and scaled to fit)
const SH = 720;
const FLOOR_Y = 680; // bottom limit for the words on the wall
const WORD_MS = 8000; // time each word and its meaning stay on screen
const PAUSE_MS = 5000; // pause after a click, then the loop carries on
const BATCH = 5;
const ASSEMBLE_MS = 3600;
const SEQUENCE = ["vortex", "hop", "ripple", "sway", "spotlight", "swing", "storm", "dolly"];
const FX_MS = { vortex: 4800, hop: 4400, ripple: 4800, sway: 4700, spotlight: 5400, swing: 5300, storm: 4800, dolly: 5300 };
const FACE = "#4a4e54"; // letter colour from the photo of the real wall

// ---------- WORDS AND MEANINGS ----------
const RAW = [
  { t: "ACCOUNTABILITY", top: 25.5, left: 41.5, s: 26, w: 900, d: 25, c: "#2563EB", m: "The legal and operational obligation of public entities, Principal Spending Officers, and public officers to answer fully for the stewardship, allocation, management, and outcomes of public funds." },
  { t: "LIFECYCLE COST", top: 30.2, left: 41.5, s: 20, w: 600, d: 15, c: "#059669", m: "The total comprehensive cost of acquiring, operating, maintaining, and eventually disposing of a public sector project, infrastructure, or asset over its entire operational lifespan." },
  { t: "COST CONTROL", top: 34.5, left: 44.5, s: 22, w: 800, d: 20, c: "#D97706", m: "The rigorous mechanisms, procedures, and expenditure controls employed by covered entities to manage, monitor, and restrict public spending strictly within approved budgets." },
  { t: "COST EFFICIENCY", top: 39.5, left: 43, s: 34, w: 900, d: 35, c: "#7C3AED", m: "The disciplined practice of achieving maximum output, public services, or project results with the minimum possible expenditure of public resources and financial inputs." },
  { t: "RESOURCE USE", top: 30.8, left: 21, s: 16, w: 600, d: 16, c: "#0284C7", m: "The strategic deployment and utilization of public funds, materials, and infrastructure to support government programs and development goals without waste or inefficiency." },
  { t: "BEST VALUE", top: 34.5, left: 21, s: 18, w: 800, d: 20, c: "#EA580C", m: "The optimal combination of cost, technical quality, and sustainability in public procurement to achieve the intended social and economic outcomes for the State." },
  { t: "TRUST", top: 39, left: 22.5, s: 28, w: 900, d: 30, c: "#E11D48", m: "Public confidence cultivated through institutional transparency, integrity, robust oversight, and responsible financial management by public bodies." },
  { t: "BUDGET", top: 32, left: 29.5, s: 22, w: 900, rot: 1, d: 28, c: "#0D9488", m: "The approved financial plan and allocation of public funds required as a mandatory prerequisite before any major public sector project or contract can receive a Certificate of Clearance." },
  { t: "GOOD RETURNS", top: 15.5, left: 58, s: 15, w: 800, rot: 1, d: 22, c: "#16A34A", m: "The measurable, positive social and economic benefits and public value generated for the citizens of Ghana relative to the scale of public expenditure invested." },
  { t: "BENEFIT", top: 32.5, left: 58, s: 19, w: 900, rot: 1, d: 28, c: "#C026D3", m: "The tangible positive impact, utility, or advantage delivered to citizens, vulnerable communities, and the State through public sector projects and procurements." },
  { t: "SMART SPENDING", top: 26.5, left: 61.5, s: 17, w: 800, rot: 1, d: 25, c: "#4F46E5", m: "The deliberate, strategic allocation of public funds focused on high priority infrastructure and services, backed by rigorous pre award cost justifications." },
  { t: "ECONOMY", top: 32.6, left: 68.5, s: 20, w: 800, d: 22, c: "#CA8A04", m: "The core principle of acquiring public goods, works, and services at the lowest appropriate cost while strictly maintaining required technical standards and specifications." },
  { t: "PERFORMANCE", top: 38.2, left: 69, s: 19, w: 800, d: 24, c: "#DC2626", m: "The measurable execution, delivery, and operational progress of public contracts and programs evaluated against planned timelines, budgets, and outputs." },
  { t: "INVESTMENT", top: 26, left: 78, s: 22, w: 900, rot: 1, d: 32, c: "#0284C7", m: "The commitment of public funds, whether from statutory funds, loans, or grants, into capital projects and infrastructure intended to yield long term societal value." },
  { t: "SAVINGS", top: 47, left: 82.5, s: 18, w: 900, rot: 1, d: 28, c: "#059669", m: "Public financial efficiencies and direct cost reductions realized through rigorous value for money assessments, market benchmarking, and the elimination of contract price inflation." },
  { t: "NO WASTE", top: 47, left: 85.5, s: 18, w: 800, rot: 1, d: 28, c: "#059669", m: "The systematic elimination of inefficiency, unnecessary expenditures, financial irregularities, and resource abuse in the management of public funds." },
  { t: "VALUE FOR MONEY", top: 47.5, left: 48, s: 72, w: 900, d: 40, c: "#1D4ED8", m: "The optimal use of public resources to achieve intended outcomes, thoroughly evaluating economy, efficiency, effectiveness, equity, and sustainability." },
  { t: "MAXIMUM OUTPUT", top: 57, left: 47, s: 40, w: 900, d: 34, c: "#7C3AED", m: "Achieving the highest possible project deliverables, structural quality, and public benefit from a given financial commitment and procurement plan." },
  { t: "COST BENEFIT", top: 57, left: 73.5, s: 26, w: 800, d: 26, c: "#DC2626", m: "An analytical comparison evaluating whether the projected financial and social costs of a public project are fully justified by its expected long term returns." },
  { t: "UTILITY", top: 43.5, left: 13, s: 18, w: 600, d: 15, c: "#0891B2", m: "The practical usefulness, functionality, and suitability of public goods, services, or infrastructure in fulfilling their intended purpose for citizens." },
  { t: "OUTCOME", top: 48.5, left: 13, s: 18, w: 600, d: 18, c: "#9333EA", m: "The ultimate impact, result, or long term structural change achieved by a public sector project funded wholly or partly from public funds." },
  { t: "DURABILITY", top: 65, left: 9.5, s: 22, w: 800, rot: 1, d: 26, c: "#B45309", m: "The structural and functional endurance of public infrastructure and assets over time, minimizing premature failures and costly repairs." },
  { t: "QUALITY ASSET", top: 55, left: 20, s: 16, w: 700, d: 18, c: "#059669", m: "A public asset or infrastructure project that fully complies with approved technical specifications, safety standards, and engineering benchmarks." },
  { t: "STRATEGY", top: 58.5, left: 18.5, s: 20, w: 800, d: 24, c: "#E11D48", m: "The overarching plan, policy direction, and governance framework set by the Board to ensure long term efficiency and oversight in public expenditure." },
  { t: "PLANNING", top: 62.5, left: 18.5, s: 20, w: 800, d: 24, c: "#2563EB", m: "The structured preparation of procurement plans, cost estimations, and budgeting that aligns closely with established national cost benchmarks." },
  { t: "LONGEVITY", top: 66.5, left: 19, s: 24, w: 900, d: 28, c: "#D97706", m: "The extended functional life and sustained utility of public investments achieved through proper ongoing maintenance and rigorous pre award evaluations." },
  { t: "OPTIMIZATION", top: 62.5, left: 25.8, s: 14, w: 700, rot: 1, d: 22, c: "#0284C7", m: "Refining operational processes, technical specifications, and resource allocations to extract the highest possible value from every cedi of public expenditure." },
  { t: "WISE CHOICE", top: 62.5, left: 27.8, s: 14, w: 700, rot: 1, d: 22, c: "#7C3AED", m: "Selecting procurement options, contractors, and project designs that offer the soundest long term financial, technical, and social returns for the State." },
  { t: "RELIABILITY", top: 62.5, left: 29.8, s: 14, w: 700, rot: 1, d: 22, c: "#16A34A", m: "The consistency, dependability, and trustworthiness of public delivery systems, contractors, and evaluative frameworks under the law." },
  { t: "SMART CHOICE", top: 69.5, left: 33.8, s: 16, w: 700, rot: 1, d: 20, c: "#EA580C", m: "Making informed, data driven procurement and expenditure decisions based on verified market cost benchmarks and risk based assessments." },
  { t: "SUSTAINABILITY", top: 62.5, left: 44, s: 22, w: 800, d: 25, c: "#059669", m: "Ensuring that public sector projects meet current national needs without compromising environmental, social, or fiscal stability for future generations." },
  { t: "MONITORING", top: 62.5, left: 59, s: 19, w: 700, d: 18, c: "#0284C7", m: "The ongoing tracking and oversight of public projects, contracts, and expenditures by the Office to ensure full compliance with laws and budgets." },
  { t: "STANDARD", top: 71, left: 67, s: 18, w: 800, rot: 1, d: 24, c: "#4F46E5", m: "The mandatory technical specifications, cost benchmarks, and evaluation rules established by the Office to govern public procurement and expenditure." },
  { t: "PRODUCTIVITY", top: 62.5, left: 75.5, s: 20, w: 800, d: 24, c: "#D97706", m: "The effective conversion of public funds, labor, and resources into high quality public infrastructure, services, and governance results." },
  { t: "RETURN ON INVESTMENT", top: 66.5, left: 49.5, s: 22, w: 800, d: 28, c: "#E11D48", m: "The quantifiable economic, financial, and social value generated for the State in exchange for capital expenditure on public projects." },
  { t: "KNOWLEDGE", top: 71, left: 49.5, s: 26, w: 900, d: 32, c: "#7C3AED", m: "The technical expertise, capacity building, and data intelligence systematically shared across covered entities to improve financial management and project appraisal." },
];

// Stable pseudo random numbers (same on every render and every machine)
const rnd = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const WORDS = RAW.map((w, i) => ({
  ...w,
  i,
  letters: Array.from(w.t).map((ch, k) => {
    const s = i * 97 + k * 13;
    return {
      ch,
      dx: Math.round((rnd(s) - 0.5) * 900),
      dy: Math.round((rnd(s + 1) - 0.5) * 700),
      rz: Math.round((rnd(s + 4) - 0.5) * 180),
      j: rnd(s + 5),
    };
  }),
}));

const BATCHES = [];
for (let i = 0; i < WORDS.length; i += BATCH) BATCHES.push(WORDS.slice(i, i + BATCH).map((w) => w.i));
const VFM = WORDS.findIndex((w) => w.t === "VALUE FOR MONEY");

// ---------- LAYOUT: tight, never overlapping ----------
// Takes the real measured width of every word, fills the wall as tightly as it can and
// pushes words apart until none touch (like the real wall: compact but clear).
function computeLayout(base) {
  const CAP = 0.8, GAP = 8, X0 = 40, X1 = SW - 40, Y0 = 16, Y1 = FLOOR_Y - 24;
  const rx = WORDS.map((w) => w.left * 12);
  const ry = WORDS.map((w) => w.top * 7.2);
  const ext = (i, F) => {
    const w = base[i] * F, h = WORDS[i].s * CAP * F;
    return WORDS[i].rot ? { hw: h / 2, hh: w / 2 } : { hw: w / 2, hh: h / 2 };
  };
  const e1 = WORDS.map((_, i) => ext(i, 1));
  const minX = Math.min(...rx.map((x, i) => x - e1[i].hw)), maxX = Math.max(...rx.map((x, i) => x + e1[i].hw));
  const minY = Math.min(...ry.map((y, i) => y - e1[i].hh)), maxY = Math.max(...ry.map((y, i) => y + e1[i].hh));
  const sx = (X1 - X0) / (maxX - minX), sy = (Y1 - Y0) / (maxY - minY), F0 = Math.min(sx, sy);

  let last = null;
  for (let F = F0 * 1.5; F >= F0 * 0.5; F *= 0.97) {
    const E = WORDS.map((_, i) => ext(i, F));
    const P = WORDS.map((_, i) => ({ x: X0 + (rx[i] - minX) * sx, y: Y0 + (ry[i] - minY) * sy }));
    for (let it = 0; it < 400; it++) {
      let moved = false;
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[j].x - P[i].x, dy = P[j].y - P[i].y;
          const ox = E[i].hw + E[j].hw + GAP - Math.abs(dx), oy = E[i].hh + E[j].hh + GAP - Math.abs(dy);
          if (ox > 0 && oy > 0) {
            moved = true;
            const wa = 1 / Math.max(12, WORDS[i].s), wb = 1 / Math.max(12, WORDS[j].s), ws = wa + wb;
            if (ox < oy) {
              const s = dx >= 0 ? 1 : -1, p = ox + 0.5;
              P[i].x -= s * p * (wa / ws); P[j].x += s * p * (wb / ws);
            } else {
              const s = dy >= 0 ? 1 : -1, p = oy + 0.5;
              P[i].y -= s * p * (wa / ws); P[j].y += s * p * (wb / ws);
            }
          }
        }
      }
      P.forEach((p, i) => {
        p.x = Math.min(X1 - E[i].hw, Math.max(X0 + E[i].hw, p.x));
        p.y = Math.min(Y1 - E[i].hh, Math.max(Y0 + E[i].hh, p.y));
      });
      if (!moved) break;
    }
    let ok = true;
    for (let i = 0; i < P.length && ok; i++) {
      for (let j = i + 1; j < P.length; j++) {
        if (E[i].hw + E[j].hw + GAP - 3 - Math.abs(P[j].x - P[i].x) > 0 && E[i].hh + E[j].hh + GAP - 3 - Math.abs(P[j].y - P[i].y) > 0) { ok = false; break; }
      }
    }
    last = { F, P, E };
    if (ok) break;
  }
  const { F, P, E } = last;
  return {
    F,
    items: P.map((p, i) => ({ cx: p.x, cy: p.y, fw: base[i] * F, fh: WORDS[i].s * CAP * F, hw: E[i].hw, hh: E[i].hh })),
    top: Math.min(...P.map((p, i) => p.y - E[i].hh)),
    bottom: Math.max(...P.map((p, i) => p.y + E[i].hh)),
  };
}

// ---------- BREAK ANIMATIONS ----------
// Each takes the stage elements and returns a function that stops it and puts everything back.
function getCtx(stage, layout) {
  const q = (s) => Array.from(stage.querySelectorAll(s));
  const w3 = q(".vfm-w3");
  return {
    items: layout.items,
    w2: q(".vfm-w2"),
    w3,
    letters: w3.map((e) => Array.from(e.querySelectorAll(".vfm-l"))),
    orbit: stage.querySelector(".vfm-orbit"),
    dark: stage.querySelector(".vfm-dark"),
  };
}
const stopAnims = (list) => () => list.forEach((a) => a.cancel());
const ID = "translate(0px,0px) rotate(0deg) scale(1)";

// 1. VORTEX: the whole wall is pulled into a spinning whirlpool at the centre, then bursts back out into place
function fxVortex(c) {
  const list = [], N = 16, CX = SW / 2, CY = SH / 2;
  c.w2.forEach((e, i) => {
    const it = c.items[i], dx = it.cx - CX, dy = it.cy - CY;
    const kf = [];
    for (let n = 0; n <= N; n++) {
      const u = n / N, th = 4 * Math.PI * u;
      let rho;
      if (u < 0.5) { const v = u / 0.5; rho = 1 - 0.92 * (v * v * (3 - 2 * v)); }
      else { const v = (u - 0.5) / 0.5; rho = 0.08 + 0.92 * v + 0.22 * Math.sin(Math.PI * v); }
      const x = rho * (dx * Math.cos(th) - dy * Math.sin(th)) - dx;
      const y = rho * (dx * Math.sin(th) + dy * Math.cos(th)) - dy;
      kf.push({ transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${(th * 180 / Math.PI).toFixed(1)}deg) scale(${(0.35 + 0.65 * rho).toFixed(3)})`, offset: u });
    }
    list.push(e.animate(kf, { duration: 4200, delay: (i % 6) * 40, easing: "ease-in-out" }));
  });
  return stopAnims(list);
}

// 2. HOP: every letter jumps in turn, a wave of hopping letters sweeping across the wall
function fxHop(c) {
  const list = [];
  c.letters.forEach((ls, i) => {
    const base = (c.items[i].cx / SW) * 1500 + (c.items[i].cy / SH) * 700;
    ls.forEach((l, k) => {
      const tilt = (k % 2 ? 1 : -1) * 10;
      list.push(l.animate([
        { transform: "translateY(0px) rotate(0deg) scale(1)", offset: 0 },
        { transform: `translateY(-34px) rotate(${tilt}deg) scale(1.18)`, offset: 0.4 },
        { transform: "translateY(3px) rotate(0deg) scale(.96)", offset: 0.75 },
        { transform: "translateY(0px) rotate(0deg) scale(1)", offset: 1 },
      ], { duration: 900, delay: base + k * 45, easing: "ease-in-out" }));
    });
  });
  return stopAnims(list);
}

// 3. RIPPLE: a shockwave leaves VALUE FOR MONEY and swells each word as it passes
function fxRipple(c) {
  const list = [], o = c.items[VFM];
  c.w2.forEach((e, i) => {
    const dx = c.items[i].cx - o.cx, dy = c.items[i].cy - o.cy, d = Math.hypot(dx, dy) || 1;
    const ox = (dx / d) * 18, oy = (dy / d) * 18;
    list.push(e.animate([
      { transform: "translate(0px,0px) scale(1)", offset: 0 },
      { transform: `translate(${ox}px,${oy}px) scale(1.22)`, offset: 0.28 },
      { transform: `translate(${-ox * 0.3}px,${-oy * 0.3}px) scale(.97)`, offset: 0.55 },
      { transform: "translate(0px,0px) scale(1)", offset: 1 },
    ], { duration: 1500, delay: d * 1.5, iterations: 2, easing: "ease-in-out" }));
  });
  return stopAnims(list);
}

// 4. SWAY: every word hangs from a rod above it and swings in the wind, settling slowly
function fxSway(c) {
  const list = [];
  c.w2.forEach((e, i) => {
    const it = c.items[i];
    e.style.transformOrigin = `${it.fw / 2}px ${it.fh / 1.6 - (it.hh + 34)}px`; // box height is fh / 0.8, so its middle is fh / 1.6
    const A = [0, 15, -11, 7.5, -4.5, 2, 0].map((a) => (i % 2 ? -a : a));
    list.push(e.animate(A.map((a, k) => ({ transform: `rotate(${a}deg)`, offset: k / 6 })), { duration: 3800, delay: (it.cx / SW) * 600, easing: "ease-in-out" }));
  });
  const stop = stopAnims(list);
  return () => { stop(); c.w2.forEach((e) => (e.style.transformOrigin = "")); };
}

// 5. SPOTLIGHT: the lights drop and a moving beam picks words out in their own colours
function fxSpotlight(c) {
  const d = c.dark, t0 = performance.now();
  let raf, dead = false;
  d.style.opacity = "1";
  const tick = (now) => {
    if (dead) return;
    const t = now - t0;
    d.style.setProperty("--sx", SW * (0.5 + 0.4 * Math.sin(t / 1000)) + "px");
    d.style.setProperty("--sy", SH * (0.45 + 0.3 * Math.sin(t / 1400 + 1)) + "px");
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { dead = true; cancelAnimationFrame(raf); d.style.opacity = "0"; };
}

// 6. SWING: the whole wall swings like a hanging frame, then settles
function fxSwing(c) {
  const list = [];
  c.orbit.style.transformOrigin = "50% 0px";
  list.push(c.orbit.animate([
    { transform: "rotate(0deg)" },
    { transform: "rotate(-8deg)", offset: 0.2 },
    { transform: "rotate(7deg)", offset: 0.42 },
    { transform: "rotate(-4.5deg)", offset: 0.62 },
    { transform: "rotate(2.5deg)", offset: 0.8 },
    { transform: "rotate(0deg)" },
  ], { duration: 5200, easing: "ease-in-out" }));
  const stop = stopAnims(list);
  return () => { stop(); c.orbit.style.transformOrigin = ""; };
}

// 7. STORM: every single letter is thrown across the wall, hangs there, then snaps back
function fxStorm(c) {
  const list = [];
  c.letters.forEach((ls, i) => ls.forEach((l, k) => {
    const s = i * 131 + k * 17 + 500;
    const far = `translate(${Math.round((rnd(s) - 0.5) * 900)}px,${Math.round((rnd(s + 1) - 0.5) * 520)}px) rotate(${Math.round((rnd(s + 5) - 0.5) * 540)}deg) scale(${(0.6 + rnd(s + 6) * 0.9).toFixed(2)})`;
    list.push(l.animate([
      { transform: ID, offset: 0 }, { transform: far, offset: 0.42 }, { transform: far, offset: 0.55 }, { transform: ID, offset: 1 },
    ], { duration: 3600, delay: (i % 9) * 60 + k * 18, easing: "cubic-bezier(.3,.1,.2,1)" }));
  }));
  return stopAnims(list);
}

// 8. DOLLY: a cinematic push in on VALUE FOR MONEY with the rest of the wall going soft, then pull back
function fxDolly(c) {
  const list = [], D = 5200, v = c.items[VFM], sc = Math.min(2.6, (SW * 0.86) / v.fw);
  c.orbit.style.transformOrigin = `${v.cx}px ${v.cy}px`;
  const ease = "cubic-bezier(.65,0,.35,1)";
  list.push(c.orbit.animate([
    { transform: "scale(1)" }, { transform: `scale(${sc})`, offset: 0.38 }, { transform: `scale(${sc})`, offset: 0.66 }, { transform: "scale(1)" },
  ], { duration: D, easing: ease }));
  c.w2.forEach((e, i) => {
    if (i !== VFM) list.push(e.animate([
      { filter: "blur(0px)" }, { filter: "blur(5px)", offset: 0.38 }, { filter: "blur(5px)", offset: 0.66 }, { filter: "blur(0px)" },
    ], { duration: D, easing: ease }));
  });
  c.letters[VFM].forEach((l, k) => list.push(l.animate([
    { transform: "translateY(0px) scale(1)" }, { transform: "translateY(-16px) scale(1.08)", offset: 0.5 }, { transform: "translateY(0px) scale(1)" },
  ], { duration: 700, delay: 2000 + k * 70, easing: "ease-in-out" })));
  const stop = stopAnims(list);
  return () => { stop(); c.orbit.style.transformOrigin = ""; };
}

const FX = { vortex: fxVortex, hop: fxHop, ripple: fxRipple, sway: fxSway, spotlight: fxSpotlight, swing: fxSwing, storm: fxStorm, dolly: fxDolly };

// ---------- STYLES ----------
const CSS = `
.vfm-stage{position:absolute;overflow:hidden;touch-action:manipulation;transform-origin:0 0;--face:${FACE};
 font-family:"Poppins","Montserrat","Segoe UI",Helvetica,Arial,sans-serif;user-select:none;-webkit-user-select:none}
.vfm-tilt,.vfm-fit,.vfm-orbit{position:absolute;inset:0}
.vfm-wallbg{position:absolute;inset:0;background:#f3f3f2}
.vfm-fit{transition:transform .5s cubic-bezier(.65,0,.35,1)}
.vfm-w{position:absolute;transform:translate(-50%,-50%);cursor:pointer;outline:none}
.vfm-fs .vfm-w{cursor:none}
.vfm-w2{display:block}
.vfm-w3{--s:1;--rot:0deg;position:relative;display:inline-flex;white-space:nowrap;line-height:1;
 transform:rotate(var(--rot)) scale(var(--s));transition:transform .45s cubic-bezier(.3,1.4,.5,1),opacity .4s ease,filter .4s ease}
.vfm-w3::before{content:"";position:absolute;inset:-12px}
.vfm-w3.act{--s:1.18}
.vfm-w3.dim{opacity:.22;filter:blur(1.2px)}
.vfm-sp{display:inline-block;width:.28em}
.vfm-l{display:inline-block;color:var(--face);opacity:0;
 transform:translate(var(--dx),var(--dy)) rotate(var(--rz)) scale(.25);
 transition:transform 1.5s cubic-bezier(.16,1.22,.3,1) var(--dl),opacity .45s ease var(--dl),color .3s ease calc(var(--i) * 22ms)}
.vfm-w3.act .vfm-l,.vfm-w3.lit .vfm-l{color:var(--c)}
.vfm-stage[data-phase="assembling"] .vfm-l,.vfm-stage[data-phase="ready"] .vfm-l{opacity:1;transform:translate(0px,0px) rotate(0deg) scale(1)}
.vfm-stage[data-phase="ready"] .vfm-l{transform:none;transition:color .3s ease calc(var(--i) * 22ms)}
.vfm-dark{position:absolute;inset:0;z-index:150;pointer-events:none;opacity:0;transition:opacity .7s ease;
 background:radial-gradient(circle 260px at var(--sx,50%) var(--sy,50%),rgba(8,14,30,0) 0%,rgba(8,14,30,.1) 45%,rgba(8,14,30,.88) 100%)}
.vfm-card{position:absolute;left:90px;right:90px;bottom:22px;text-align:center;z-index:200;opacity:0;transform:translateY(16px);
 transition:opacity .45s ease,transform .45s ease;pointer-events:none}
.vfm-card.show{opacity:1;transform:none;transition-delay:.2s}
.vfm-ct{font-size:28px;font-weight:900;letter-spacing:.04em;margin-bottom:6px}
.vfm-cd{margin:0;font-size:26px;line-height:1.4;font-weight:500;color:#1e293b}
`;

// ---------- ONE WORD ----------
const Word = memo(function Word({ w, it, F, active, dim, lit, onPick }) {
  const delays = useMemo(() => {
    const d = it ? Math.hypot(it.cx - SW / 2, it.cy - SH / 2) * 1.1 : 0;
    return w.letters.map((l, k) => Math.round(d + k * 28 + l.j * 120) + "ms");
  }, [it, w]);

  return (
    <div
      className="vfm-w"
      style={{ left: it ? it.cx : SW / 2, top: it ? it.cy : SH / 2, zIndex: active ? 50 : Math.floor(w.d) }}
      role="button"
      tabIndex={0}
      aria-label={w.t}
      data-i={w.i}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick(w.i)}
    >
      <div className="vfm-w2">
        <div
          className={"vfm-w3" + (active ? " act" : "") + (dim ? " dim" : "") + (lit ? " lit" : "")}
          style={{ fontSize: w.s * F, fontWeight: w.w, letterSpacing: w.w >= 800 ? "-0.02em" : "0.02em", "--c": w.c, "--rot": w.rot ? "90deg" : "0deg" }}
        >
          {w.letters.map((l, k) =>
            l.ch === " " ? (
              <span key={k} className="vfm-sp" />
            ) : (
              <span key={k} className="vfm-l" style={{ "--dx": l.dx + "px", "--dy": l.dy + "px", "--rz": l.rz + "deg", "--i": k, "--dl": delays[k] }}>
                {l.ch}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
});

// ---------- MAIN COMPONENT ----------
export default function InteractiveVfmWall({ fullscreen = false }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const fitRef = useRef(null);
  const cardRef = useRef(null);
  const tokenRef = useRef(0);
  const posRef = useRef({ b: 0, w: 0 });
  const cleanRef = useRef([]);
  const resumeRef = useRef(null);
  const lastRef = useRef(0);
  const fitK = useRef(1);

  const [box, setBox] = useState({ w: SW, h: SH });
  const [layout, setLayout] = useState(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState("hidden"); // hidden, assembling, ready
  const [active, setActive] = useState(null);
  const [fxOn, setFxOn] = useState(false);

  const layoutRef = useRef(null);
  const phaseRef = useRef(phase);
  layoutRef.current = layout;
  phaseRef.current = phase;

  // Fit the 1280 x 720 stage to its container
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const k = fullscreen ? Math.min(box.w / SW, box.h / SH) : box.w / SW;
  const offX = fullscreen ? (box.w - SW * k) / 2 : 0;
  const offY = fullscreen ? (box.h - SH * k) / 2 : 0;

  // Measure the real words once the font is ready, then lay out the wall
  useEffect(() => {
    let dead = false;
    const run = () => {
      if (dead || !stageRef.current) return;
      const base = Array.from(stageRef.current.querySelectorAll(".vfm-w3"), (e) => e.offsetWidth);
      setLayout(computeLayout(base));
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    else run();
    return () => { dead = true; };
  }, []);

  // Is the wall on screen? Reveal at 15% visible, reset only when fully out of view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.15) setVisible(true);
        else if (!e.isIntersecting || e.intersectionRatio === 0) setVisible(false);
      },
      { threshold: [0, 0.15] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stopAll = useCallback(() => {
    tokenRef.current++;
    clearTimeout(resumeRef.current);
    cleanRef.current.forEach((f) => f());
    cleanRef.current = [];
  }, []);

  // Scroll assembly: one switch for the whole wall
  useEffect(() => {
    if (!layout) return;
    if (!visible) {
      stopAll();
      setPhase("hidden");
      setActive(null);
      setFxOn(false);
      return;
    }
    setPhase("assembling");
    const t = setTimeout(() => setPhase("ready"), ASSEMBLE_MS);
    return () => clearTimeout(t);
  }, [visible, layout, stopAll]);

  // The forever loop: words in batches of 5, then a break animation
  const start = useCallback((b0, w0) => {
    const token = ++tokenRef.current;
    const alive = () => tokenRef.current === token;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      let b = b0, w = w0;
      while (alive()) {
        for (; b < BATCHES.length; b++) {
          for (; w < BATCHES[b].length; w++) {
            posRef.current = { b, w };
            setActive(BATCHES[b][w]);
            await wait(WORD_MS);
            if (!alive()) return;
          }
          posRef.current = { b, w: BATCHES[b].length };
          setActive(null);
          await wait(900);
          if (!alive()) return;
          const type = SEQUENCE[b % SEQUENCE.length];
          setFxOn(true);
          const stop = FX[type](getCtx(stageRef.current, layoutRef.current));
          cleanRef.current.push(stop);
          await wait(FX_MS[type]);
          if (!alive()) return;
          stop();
          cleanRef.current = cleanRef.current.filter((f) => f !== stop);
          setFxOn(false);
          await wait(700);
          if (!alive()) return;
          w = 0;
        }
        b = 0;
      }
    })();
  }, []);

  useEffect(() => {
    if (phase !== "ready") return;
    start(posRef.current.b, posRef.current.w);
    return () => stopAll();
  }, [phase, start, stopAll]);

  // Click a word: pause on it for 5s, then the loop carries on where it was
  const onPick = useCallback((i) => {
    if (phaseRef.current !== "ready") return;
    stopAll();
    setFxOn(false);
    setActive(i);
    resumeRef.current = setTimeout(() => start(posRef.current.b, posRef.current.w), PAUSE_MS);
  }, [start, stopAll]);

  // Clicks are caught once for the whole wall, so they still land when the pointer drifts or the
  // word is moving. A click on a word's letters is exact; a click close to a word still picks it.
  const onStageClick = useCallback((e) => {
    const L = layoutRef.current, st = stageRef.current;
    if (!L || !st) return;
    const el = e.target.closest && e.target.closest(".vfm-w");
    if (el) { onPick(Number(el.dataset.i)); return; }
    const r = st.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * SW, y = ((e.clientY - r.top) / r.height) * SH;
    const kk = fitK.current, px = SW / 2 + (x - SW / 2) / kk, py = L.top + (y - L.top) / kk;
    let best = -1, bd = Infinity;
    L.items.forEach((it, i) => {
      if (Math.abs(px - it.cx) > it.hw + 14 || Math.abs(py - it.cy) > it.hh + 14) return;
      const d = Math.hypot((px - it.cx) / it.hw, (py - it.cy) / it.hh);
      if (d < bd) { bd = d; best = i; }
    });
    if (best >= 0) onPick(best);
  }, [onPick]);

  // Make room for the meaning text at the base: the words shrink up so it never touches one
  useLayoutEffect(() => {
    const fit = fitRef.current, card = cardRef.current;
    if (!fit || !card || !layout) return;
    if (active === null) { fitK.current = 1; fit.style.transform = ""; return; }
    const cardTop = SH - 22 - card.offsetHeight;
    const kk = Math.max(0.5, Math.min(1, (cardTop - 30 - layout.top) / (layout.bottom - layout.top)));
    fitK.current = kk;
    fit.style.transformOrigin = `50% ${layout.top}px`;
    fit.style.transform = kk < 1 ? `scale(${kk})` : "";
  }, [active, layout]);

  if (active !== null) lastRef.current = active;
  const cw = WORDS[lastRef.current];

  const wall = (
    <div ref={rootRef} className={fullscreen ? "vfm-fs" : ""}
      style={{ position: "relative", overflow: "hidden", background: "#f3f3f2", width: fullscreen ? "100vw" : "100%", height: fullscreen ? "100vh" : SH * k, borderRadius: fullscreen ? 0 : 20 }}>
      <style>{CSS}</style>
      <div ref={stageRef} className="vfm-stage" data-phase={phase} onClick={onStageClick}
        style={{ width: SW, height: SH, left: offX, top: offY, transform: `scale(${k})` }}>
        <div className="vfm-tilt">
          <div className="vfm-wallbg" />
          <div className="vfm-fit" ref={fitRef}>
            <div className="vfm-orbit">
              {WORDS.map((w) => (
                <Word key={w.i} w={w} it={layout ? layout.items[w.i] : null} F={layout ? layout.F : 1}
                  active={active === w.i} dim={active !== null && active !== w.i} lit={fxOn} onPick={onPick} />
              ))}
            </div>
          </div>
        </div>
        <div className="vfm-dark" />
        <div ref={cardRef} className={"vfm-card" + (active !== null ? " show" : "")}>
          <div className="vfm-ct" style={{ color: cw.c }}>{cw.t}</div>
          <p className="vfm-cd">{cw.m}</p>
        </div>
      </div>
    </div>
  );

  if (fullscreen) return wall;
  return (
    <section style={{ background: "#f3f4f6", padding: "48px 24px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: SW }}>{wall}</div>
    </section>
  );
}