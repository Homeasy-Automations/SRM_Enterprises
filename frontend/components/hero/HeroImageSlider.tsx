"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface HeroSlide {
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero1.png",
    alt: "Complete industrial packaging materials: corrugated cartons, EPE foam sheets, bubble wrap rolls and stretch films",
    title: "Integrated Packaging Facility",
    category: "Full Catalog Supply",
  },
  {
    src: "/images/hero3.png",
    alt: "Heavy-duty corrugated boxes, corrugated sheets and palletized shipping containers",
    title: "Corrugated Manufacturing & Stacking",
    category: "3, 5 & 7-Ply Cartons",
  },
  {
    src: "/images/hero4.png",
    alt: "Custom fabricated EPE foam profiles, cushioning fitments and air bubble protective packaging rolls",
    title: "Cushioning & Protective Materials",
    category: "EPE Foam & Bubble Wrap",
  },
  {
    src: "/images/hero5.png",
    alt: "High-performance pallet stretch film rolls, industrial poly bags and packaging sealing tapes",
    title: "Films & Industrial Accessories",
    category: "Stretch Wrap & Tapes",
  },
  // {
  //   src: "/images/hero6.png",
  //   alt: "Custom packaging design, prototype cutting and tailored component protection workstation",
  //   title: "Custom Design & Prototyping",
  //   category: "Engineered to Spec",
  // },
  {
    src: "/images/hero2.png",
    alt: "Modern industrial packaging logistics warehouse staging with bulk pallet dispatches across India",
    title: "Warehouse Staging & Pan-India Dispatch",
    category: "Bulk Supply Logistics",
  },
];

interface HeroImageSliderProps {
  autoPlayInterval?: number;
}

export function HeroImageSlider({
  autoPlayInterval = 5500,
}: HeroImageSliderProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, autoPlayInterval, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const activeSlide: HeroSlide = HERO_SLIDES[currentIndex] ?? HERO_SLIDES[0]!;

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
      aria-label="Packaging Facility Highlights"
    >
      {/* Background Slides with seamless zero-flash cross-fade */}
      <div className="absolute inset-0 h-full w-full">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.src}
              aria-hidden={!isActive}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <div
                className={`h-full w-full transition-transform duration-[7500ms] ease-out will-change-transform ${isActive ? "scale-[1.05]" : "scale-[1.0]"
                  }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index < 2}
                  sizes="100vw"
                  quality={82}
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ambient Gradient Overlays - drastically reduced for vivid clarity while keeping high text readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-white/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/25 via-transparent to-white/30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/30 via-transparent to-white/35"
        aria-hidden="true"
      />

      {/* Prev / Next Navigation Arrows (Accessible & Styled with Frosted Glass) 
      <div className="absolute inset-y-0 left-3 right-3 sm:left-6 sm:right-6 z-20 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="pointer-events-auto group grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-navy/15 bg-white/80 text-navy backdrop-blur-md shadow-md transition-all duration-300 hover:bg-white hover:scale-110 hover:border-accent hover:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-accent"
        >
          <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="pointer-events-auto group grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-navy/15 bg-white/80 text-navy backdrop-blur-md shadow-md transition-all duration-300 hover:bg-white hover:scale-110 hover:border-accent hover:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-accent"
        >
          <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>*/}

      {/* Bottom Status Ribbon: Active Caption & Pagination Indicators (aligned right to leave bottom-left clear) */}
      <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 z-20 flex items-center justify-end gap-3 pointer-events-none">
        {/* Current slide caption pill */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 rounded-full border border-navy/10 bg-white/90 px-3.5 py-1 text-xs font-semibold text-navy backdrop-blur-md shadow-xs">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-bold text-accent">{activeSlide.category}:</span>
          <span className="text-navy-soft">{activeSlide.title}</span>
        </div>

        {/* Indicator dots with active fill & auto-play pause toggle */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-navy/10 bg-white/90 px-3 py-1.5 backdrop-blur-md shadow-xs">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-2 rounded-full transition-all duration-300 ${isActive ? "w-7 bg-accent" : "w-2 bg-navy/20 hover:bg-navy/40"
                  }`}
              />
            );
          })}

          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? "Pause automatic slideshow" : "Play automatic slideshow"}
            className="ml-1 text-navy-soft hover:text-accent transition-colors p-0.5"
            title={isPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
