---
name: video-shotcraft
description: Create cinematic product videos from shot recipe cards, a validated template, and code/audio assets (Remotion + real page screenshots + 2.5D camera moves + beat-synced cuts + sound design). Use when the user asks to turn a frontend project or webpage into a product video, says "use video-shotcraft to make a video/promo", names the Ink Press template or asks to reproduce its effect, or wants a single shot card's motion.
---

# video-shotcraft: Cinematic Motion & Video Craft

## Core Recipes & Web Motion Directives

1. **Spotlight Hero Card / Cursor Spotlight:**
   - Radial gradient highlight following pointer (`radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(..., 0.15), transparent 40%)`).
   - Dynamic edge border glow reacting to proximity.

2. **Deck-Deal Fly-in / Stagger Animation:**
   - Cards deal out or cascade into screen with physical deceleration (`cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.2, 0.8, 0.2, 1)`).
   - Stagger timing: each item delay = `index * 60ms - 80ms`.
   - Never pop or teleport elements; smooth slide-up + scale from `0.96` to `1.0`.

3. **Kinetic Sheen Sweep & Metallic Edge:**
   - Single high-precision light sweep across premium cards, badges, and CTAs.
   - Restrained frequency: trigger on hover or loop smoothly with pause/breathing interval.

4. **Digit Roll Counters / Mechanical Rolling Numbers:**
   - Smooth count-up or tabular numbers (`font-variant-numeric: tabular-nums`) with mechanical ease.

5. **2.5D Perspective Tilt (Physics-Driven):**
   - Subtle 3D card tilt based on pointer coordinates (`perspective(1000px) rotateX(...) rotateY(...) scale3d(1.02, 1.02, 1)`).
   - Smooth decay back to zero rotation on `pointerleave`.

6. **Breathing Room & Motion Discipline:**
   - Every heroic action settles into a hold state (`hold >= 0.5s - 1s`).
   - No chaotic competing animations: one primary focal point at a time.
   - Clean performance: hardware-accelerated `transform` & `opacity` only.
