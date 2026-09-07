"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
};

const GLOW_RADIUS = 150;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildField(width: number, height: number) {
  const rng = mulberry32(Math.round(width * 13 + height * 7));
  const cell = Math.max(58, Math.min(86, width / 17));
  const cols = Math.ceil(width / cell) + 2;
  const rows = Math.ceil(height / cell) + 2;
  const nodes: Node[] = [];
  const slot = new Int16Array(cols * rows).fill(-1);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rng() < 0.1) continue;
      const x = (c - 0.5) * cell + (rng() - 0.5) * cell * 0.46;
      const y = (r - 0.5) * cell + (rng() - 0.5) * cell * 0.46;
      slot[r * cols + c] = nodes.length;
      nodes.push({ x, y });
    }
  }

  const edges: [number, number][] = [];
  const add = (a: number, b: number, skip = 0.1) => {
    if (a < 0 || b < 0 || rng() < skip) return;
    edges.push([a, b]);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = slot[r * cols + c];
      if (i < 0) continue;
      if (c + 1 < cols) add(i, slot[r * cols + c + 1]);
      if (r + 1 < rows) add(i, slot[(r + 1) * cols + c]);
      if (c + 1 < cols && r + 1 < rows) add(i, slot[(r + 1) * cols + c + 1], 0.22);
      if (c > 0 && r + 1 < rows) add(i, slot[(r + 1) * cols + c - 1], 0.55);
    }
  }

  return { nodes, edges };
}

function distToSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function falloff(distance: number, radius: number) {
  if (distance >= radius) return 0;
  const t = 1 - distance / radius;
  return t * t * (3 - 2 * t);
}

export function ImpactField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let field = buildField(1, 1);
    let raf = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let glowX = 0;
    let glowY = 0;
    let energy = 0;
    let hovering = false;

    const resize = () => {
      const nextW = parent.clientWidth;
      const nextH = parent.clientHeight;
      if (nextW === 0 || nextH === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = nextW;
      height = nextH;
      canvas.width = Math.round(nextW * dpr);
      canvas.height = Math.round(nextH * dpr);
      canvas.style.width = `${nextW}px`;
      canvas.style.height = `${nextH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      field = buildField(nextW, nextH);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const { nodes, edges } = field;

      ctx.lineWidth = 0.9;
      ctx.strokeStyle = "rgba(18, 16, 14, 0.12)";
      ctx.beginPath();
      for (const [a, b] of edges) {
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx.stroke();

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.15, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(18, 16, 14, 0.28)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (energy < 0.01) return;

      const gx = glowX;
      const gy = glowY;
      const aura = ctx.createRadialGradient(gx, gy, 0, gx, gy, GLOW_RADIUS);
      aura.addColorStop(0, `rgba(255, 77, 28, ${0.06 * energy})`);
      aura.addColorStop(0.45, `rgba(255, 77, 28, ${0.02 * energy})`);
      aura.addColorStop(1, "rgba(255, 77, 28, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(gx - GLOW_RADIUS, gy - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2);

      for (const [a, b] of edges) {
        const na = nodes[a];
        const nb = nodes[b];
        const strength = falloff(distToSegment(gx, gy, na.x, na.y, nb.x, nb.y), GLOW_RADIUS) * energy;
        if (strength < 0.04) continue;

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(255, 77, 28, ${0.1 * strength})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.strokeStyle = `rgba(255, 77, 28, ${0.75 * strength})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      for (const n of nodes) {
        const strength = falloff(Math.hypot(n.x - gx, n.y - gy), GLOW_RADIUS) * energy;
        if (strength < 0.18) continue;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.15, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = `rgba(255, 77, 28, ${0.7 * strength})`;
        ctx.stroke();
      }
    };

    const tick = () => {
      if (!visible) {
        raf = 0;
        return;
      }

      glowX += (pointerX - glowX) * 0.22;
      glowY += (pointerY - glowY) * 0.22;
      energy += ((hovering ? 1 : 0) - energy) * (hovering ? 0.22 : 0.12);
      draw();

      if (hovering || energy > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        energy = 0;
        raf = 0;
        draw();
      }
    };

    const startTick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      hovering = true;
      startTick();
    };

    const onPointerLeave = () => {
      hovering = false;
      startTick();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else if (hovering) {
          startTick();
        }
      },
      { rootMargin: "80px" },
    );
    io.observe(parent);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    parent.addEventListener("pointermove", onPointerMove, { passive: true });
    parent.addEventListener("pointerleave", onPointerLeave);
    resize();

    return () => {
      io.disconnect();
      ro.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
    />
  );
}
