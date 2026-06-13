/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface ProjectGalleryCarouselProps {
  images: string[];
  projectId: string;
}

export function ProjectGalleryCarousel({ images, projectId }: ProjectGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to clear and reset the auto-scroll timer to 0
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeIndex, images, projectId]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    resetTimer(); // Reset auto-slide timer immediately
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
    resetTimer(); // Reset auto-slide timer immediately
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
      <div className="text-[10px] tracking-widest text-zinc-400 font-extrabold uppercase mb-2 block">
        GALERI DETAIL KONSTRUKSI (AUTO-SLIDE)
      </div>

      {/* Slide frame */}
      <div className="relative overflow-hidden rounded-xl bg-zinc-950 aspect-[4/3] sm:aspect-video w-full">
        {/* Animated Slide container */}
        <div 
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((imgUrl, idx) => (
            <div key={`${projectId}-img-${idx}`} className="w-full h-full shrink-0">
              <img
                src={imgUrl}
                alt={`Detail Galeri ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Floating Indicator card */}
        <div className="absolute right-4 bottom-4 bg-zinc-950/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-zinc-800 text-[11px] font-mono font-bold text-white shadow-lg">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Permanently visible navigation control bar below the image */}
      <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-zinc-800/60">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 bg-zinc-800 hover:bg-orange-600 hover:text-white text-zinc-300 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md"
          title="Previous Image"
        >
          <ChevronLeft className="w-4 h-4" />
          Kiri
        </button>

        {/* Small Navigation Dot indicators */}
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => {
                setActiveIndex(idx);
                resetTimer();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-orange-500' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
              }`}
              title={`Go to image ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 bg-zinc-800 hover:bg-orange-600 hover:text-white text-zinc-300 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md"
          title="Next Image"
        >
          Kanan
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
