import { useEffect, useRef } from 'react';
import { createChart, ColorType, LineStyle } from 'lightweight-charts';
import type { PricePoint } from '../types';

interface PriceChartProps {
  data: PricePoint[];
  height?: number;
}

export default function PriceChart({ data, height = 400 }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8B949E',
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
      },
      width: chartContainerRef.current.clientWidth,
      height,
      grid: {
        vertLines: { color: 'rgba(59, 74, 68, 0.1)', style: LineStyle.Dotted },
        horzLines: { color: 'rgba(59, 74, 68, 0.1)', style: LineStyle.Dotted },
      },
      crosshair: {
        vertLine: {
          color: 'rgba(70, 241, 197, 0.3)',
          labelBackgroundColor: '#262a31',
        },
        horzLine: {
          color: 'rgba(70, 241, 197, 0.3)',
          labelBackgroundColor: '#262a31',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(59, 74, 68, 0.15)',
        textColor: '#8B949E',
      },
      timeScale: {
        borderColor: 'rgba(59, 74, 68, 0.15)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: { vertTouchDrag: false },
    });

    // Yes Line (Primary/Teal)
    const yesSeries = chart.addAreaSeries({
      topColor: 'rgba(70, 241, 197, 0.3)',
      bottomColor: 'rgba(70, 241, 197, 0)',
      lineColor: '#46f1c5',
      lineWidth: 2,
      title: 'Yes',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => `$${price.toFixed(2)}`,
      },
    });

    yesSeries.setData(
      data.map((d) => ({
        time: d.time as any,
        value: d.yesPrice,
      }))
    );

    // No Line (Secondary/Coral)
    const noSeries = chart.addAreaSeries({
      topColor: 'rgba(255, 179, 176, 0.15)',
      bottomColor: 'rgba(255, 179, 176, 0)',
      lineColor: '#ffb3b0',
      lineWidth: 2,
      title: 'No',
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => `$${price.toFixed(2)}`,
      },
    });

    noSeries.setData(
      data.map((d) => ({
        time: d.time as any,
        value: d.noPrice,
      }))
    );

    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full rounded-xl overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    />
  );
}
