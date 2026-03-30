import { useEffect, useRef } from 'react';
import type { PricePoint } from '../types';

interface MiniChartProps {
  data: PricePoint[];
  height?: number;
}

export default function MiniChart({ data, height = 64 }: MiniChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Draw line
    const prices = data.map((d) => d.yesPrice);
    const min = Math.min(...prices) - 0.05;
    const max = Math.max(...prices) + 0.05;
    const range = max - min || 1;

    ctx.beginPath();
    ctx.strokeStyle = '#46f1c5';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';

    prices.forEach((price, i) => {
      const x = (i / (prices.length - 1)) * w;
      const y = h - ((price - min) / range) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Gradient fill underneath
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(70, 241, 197, 0.15)');
    gradient.addColorStop(1, 'rgba(70, 241, 197, 0)');

    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [data, height]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: `${height}px` }}
    />
  );
}
