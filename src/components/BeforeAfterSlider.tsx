/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt = 'Before After Compare'
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 to 100)
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (e.buttons === 1 || isSliding) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;

    const onPointerMove = (e: PointerEvent) => {
      if (isSliding) {
        handleMove(e.clientX);
      }
    };

    const onPointerUp = () => {
      setIsSliding(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isSliding]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 select-none cursor-ew-resize max-h-[450px]"
      onPointerDown={(e) => {
        setIsSliding(true);
        handleMove(e.clientX);
      }}
    >
      {/* After Image (underneath) */}
      <img
        src={afterSrc}
        alt={`${alt} Sesudah`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute left-4 top-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.15em] text-orange-500 border border-orange-500/20 z-10 shadow-lg">
        SEBELUM
      </div>

      {/* Before Image (on top clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} Sebelum`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className="absolute right-4 top-4 bg-zinc-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.15em] text-white border border-white/20 z-10 shadow-lg pointer-events-none">
        SESUDAH
      </div>

      {/* Separator Slider Bar */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.8)] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orange-600 border-2 border-white text-white flex items-center justify-center text-sm font-black shadow-2xl">
          <svg
            className="w-5 h-5 text-white active:scale-95 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M8 9l-4 4 4 4m8-8l4 4-4 4"
            />
          </svg>
        </div>
      </div>

      {/* Interactive prompt overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full text-zinc-300 pointer-events-none font-bold">
        GESER ATURAN PERBANDINGAN
      </div>
    </div>
  );
}
