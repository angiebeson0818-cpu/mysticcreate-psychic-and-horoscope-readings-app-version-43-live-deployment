import { useEffect, useRef } from "react";

/**
 * Brand cursor: a tiny shimmering gold star that follows the pointer,
 * leaving a trail of smaller twinkling stars behind it.
 * Only runs on devices with a mouse; touch screens keep their default.
 */

interface TrailStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  spin: number;
  angle: number;
}

const MAX_TRAIL = 60;

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  angle: number,
  alpha: number,
) {
  const inner = radius * 0.42;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? radius : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  grad.addColorStop(0, `rgba(255, 250, 230, ${alpha})`);
  grad.addColorStop(0.45, `rgba(245, 215, 122, ${alpha})`);
  grad.addColorStop(1, `rgba(184, 134, 11, ${alpha})`);
  ctx.fillStyle = grad;
  ctx.shadowColor = `rgba(255, 215, 0, ${alpha * 0.9})`;
  ctx.shadowBlur = radius * 1.6;
  ctx.fill();
  ctx.restore();
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const canvas = canvasRef.current;
    if (!finePointer || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pointer = { x: -100, y: -100, visible: false };
    const star = { x: -100, y: -100, angle: 0 };
    const trail: TrailStar[] = [];
    let lastX = 0;
    let lastY = 0;
    let frame = 0;

    document.body.classList.add("star-cursor-active");

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!pointer.visible) {
        pointer.visible = true;
        star.x = e.clientX;
        star.y = e.clientY;
        lastX = e.clientX;
        lastY = e.clientY;
      }
      if (reduceMotion) return;
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      const count = Math.min(3, Math.floor(dist / 10));
      for (let i = 0; i < count; i++) {
        if (trail.length >= MAX_TRAIL) trail.shift();
        trail.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: Math.random() * 0.5 + 0.2,
          size: Math.random() * 3 + 2,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          spin: (Math.random() - 0.5) * 0.1,
          angle: Math.random() * Math.PI,
        });
      }
      if (count > 0) {
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onLeave = () => {
      pointer.visible = false;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.life += 1;
        if (t.life >= t.maxLife) {
          trail.splice(i, 1);
          continue;
        }
        t.x += t.vx;
        t.y += t.vy;
        t.angle += t.spin;
        const progress = t.life / t.maxLife;
        const twinkle = 0.65 + 0.35 * Math.sin(t.life * 0.5);
        drawStar(
          ctx,
          t.x,
          t.y,
          t.size * (1 - progress * 0.6),
          t.angle,
          (1 - progress) * twinkle,
        );
      }

      if (pointer.visible) {
        star.x += (pointer.x - star.x) * 0.35;
        star.y += (pointer.y - star.y) * 0.35;
        star.angle += reduceMotion ? 0 : 0.02;
        frame += 1;
        const shimmer = 0.85 + 0.15 * Math.sin(frame * 0.12);
        drawStar(ctx, star.x, star.y, 9 * shimmer, star.angle, 1);
      }

      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("star-cursor-active");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
