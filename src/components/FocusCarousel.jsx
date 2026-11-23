import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { FOCUS_SLIDES } from '../data/focusSlides';

export default function FocusCarousel({ tasks = [], completionRate = 0 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = FOCUS_SLIDES.length;
  const slide = FOCUS_SLIDES[activeIndex];

  // Derive the preview card dynamically from live tasks
  const nextUpTask =
    tasks.find((t) => t.status === 'To do') ||
    tasks.find((t) => t.status === 'In progress');
  const inProgressTask = tasks.find((t) => t.status === 'In progress');
  const completedTask = tasks.find((t) => t.status === 'Completed');

  const previewCards = [
    {
      label: 'NEXT UP',
      title: nextUpTask ? nextUpTask.title : 'All tasks completed!',
      progress: completionRate,
    },
    {
      label: 'IN PROGRESS',
      title: inProgressTask ? inProgressTask.title : 'No tasks in progress',
      progress: completionRate,
    },
    {
      label: 'COMPLETED',
      title: completedTask ? completedTask.title : 'No completed tasks yet',
      progress: completedTask ? 100 : 0,
    },
  ];

  const previewCard = previewCards[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section
      aria-label="Focus Notes carousel"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#5B4EF5] via-[#6556F6] to-[#4E42E5] text-white p-5 sm:p-7 shadow-sm mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Slide Text & Indicators */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-wider uppercase text-indigo-200 mb-2">
            <span>Focus Notes</span>
            <span className="text-indigo-300/80">{slide.step}</span>
          </div>

          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight leading-tight">
            {slide.title}
          </h2>
          <p className="text-sm text-indigo-100/90 mt-1.5">
            {slide.subtitle}
          </p>

          {/* Mobile Progress Bar (matches mobile Figma card) */}
          <div className="mt-4 flex items-center gap-3 lg:hidden">
            <div className="flex-1 h-2 bg-white/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-white shrink-0">
              {completionRate}%
            </span>
          </div>

          {/* Slide Indicator Bars + Mobile Arrows */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slides">
              {FOCUS_SLIDES.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'w-8 bg-white'
                        : 'w-6 bg-white/35 hover:bg-white/60'
                    }`}
                  />
                );
              })}
            </div>

            {/* Mobile Prev / Next Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full bg-white text-[#5B4EF5] hover:bg-indigo-50 flex items-center justify-center shadow-sm transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right (Desktop): Tilted Preview Card + Prev/Next Controls */}
        <div className="hidden lg:flex items-center gap-8 shrink-0">
          {/* Decorative Floating Card */}
          <div className="relative">
            {/* Soft tilted background layer */}
            <div className="absolute inset-0 bg-white/15 rounded-2xl -rotate-6 scale-95 pointer-events-none" />

            {/* Foreground white card */}
            <div className="relative bg-white text-slate-900 rounded-2xl p-4 w-60 shadow-lg rotate-2 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                    {previewCard.label}
                  </p>
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {previewCard.title}
                  </p>
                </div>
              </div>

              <div className="mt-3.5 flex items-center gap-2.5">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5B4EF5] rounded-full transition-all duration-300"
                    style={{ width: `${previewCard.progress}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-[#5B4EF5]">
                  {previewCard.progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Prev / Next Controls */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-white text-[#5B4EF5] hover:bg-indigo-50 flex items-center justify-center shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}