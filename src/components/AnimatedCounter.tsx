import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  durationMs?: number;
}

interface ParsedMetric {
  prefix: string;
  number: number;
  suffix: string;
  useCommas: boolean;
}

function parseMetricValue(raw: string): ParsedMetric | null {
  const match = raw.trim().match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  const numericStr = match[2];
  const parsed = Number.parseInt(numericStr.replace(/,/g, ''), 10);
  if (Number.isNaN(parsed)) return null;

  return {
    prefix: match[1] || '',
    number: parsed,
    suffix: match[3] || '',
    useCommas: numericStr.includes(','),
  };
}

export default function AnimatedCounter({ value, durationMs = 950 }: AnimatedCounterProps) {
  const parsed = parseMetricValue(value);
  const elRef = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState<string>(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setDisplayValue(value);
      return;
    }

    const node = elRef.current;
    if (!node) return;

    let rafId = 0;

    const runAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const startTime = performance.now();

      const step = (now: number) => {
        const t = Math.min((now - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const currentNum = Math.round(parsed.number * eased);
        const formatted = parsed.useCommas
          ? currentNum.toLocaleString('en-US')
          : String(currentNum);
        setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);

        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [value, durationMs]);

  return (
    <span ref={elRef} className="font-mono-tabular">
      {displayValue}
    </span>
  );
}
