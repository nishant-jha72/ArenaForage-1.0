import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowRight,
} from "lucide-react";
const getEnvVar = (key: string, fallback: string): string => {
  try {
    const viteKey = `VITE_${key}`;
    if (typeof import.meta !== "undefined" && import.meta.env?.[viteKey]) {
      return import.meta.env[viteKey] as string;
    }
  } catch {
    /* ignore */
  }

  try {
    const craKey = `REACT_APP_${key}`;
    if (typeof import.meta.env !== "undefined" && import.meta.env?.[craKey]) {
      return import.meta.env[craKey] as string;
    }
  } catch {
    /* ignore */
  }

  return fallback;
};

const resolveImageSource = (envKey: string, fallbackPath: string): string => {
  const value = getEnvVar(envKey, fallbackPath);
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return value;
};

const ENV_YOUTUBE_VIDEO_ID = getEnvVar(
  "YOUTUBE_VIDEO_ID",
  "YOUR_YOUTUBE_VIDEO_ID",
);
const ENV_PLACEHOLDER_IMAGE = resolveImageSource(
  "VIDEO_PLACEHOLDER_IMAGE",
  "/homepage/jonty-gaming-images.webp",
);

interface CommunityReview {
  id: string;
  author: string;
  quote: string;
  role?: string;
}

export interface HomepageAdProps {
  youtubeVideoId?: string;
  placeholderImage?: string;
  reviews?: CommunityReview[];
  autoSlideInterval?: number;
  className?: string;
}

const DEFAULT_REVIEWS: CommunityReview[] = [
  {
    id: "review-1",
    author: "TG-FOZYAJAY (TOTAL GAMING MEMBER)",
    quote:
      "Every tournament is another opportunity to improve, compete, and build unforgettable memories with your squad.",
  },
  {
    id: "review-2",
    author: "MORTAL (PUBG MOBILE LEGEND)",
    quote:
      "True champions aren't defined by victories alone—they're remembered for their dedication, teamwork, and consistency.",
  },
  {
    id: "review-3",
    author: "S8UL-PAHADI",
    quote:
      "A fair tournament environment brings out the best in every player and creates experiences worth returning for.",
  },
  {
    id: "review-4",
    author: "ROCKY AND RDX",
    quote:
      "Esports isn't just about winning prizes; it's about passion, friendships, and proving your skills on the biggest stages.",
  },
];

const TestimonialSlide: React.FC<{
  review: CommunityReview;
  isActive: boolean;
  direction: "next" | "prev";
}> = ({ review, isActive, direction }) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out will-change-transform ${
        isActive
          ? "opacity-100 translate-x-0 z-10"
          : direction === "next"
            ? "opacity-0 -translate-x-8 z-0"
            : "opacity-0 translate-x-8 z-0"
      }`}
      aria-hidden={!isActive}
    >
      <div className="mb-4">
        <Quote
          className="w-8 h-8 text-amber-500/30"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-100 leading-relaxed mb-6">
        "{review.quote}"
      </blockquote>

      <footer className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold text-sm select-none shadow-lg">
          {review.author.charAt(0)}
        </div>
        <div>
          <cite className="not-italic font-semibold text-white text-sm sm:text-base">
            {review.author}
          </cite>
          {review.role && (
            <p className="text-xs sm:text-sm text-gray-400">{review.role}</p>
          )}
        </div>
      </footer>
    </div>
  );
};

const VideoEmbed: React.FC<{ videoId: string; placeholderImage: string }> = ({
  videoId,
  placeholderImage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 group">
      {!isLoaded ? (
        <button
          onClick={() => setIsLoaded(true)}
          className="relative w-full h-full block cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded-2xl sm:rounded-3xl"
          aria-label="Play featured esports video"
        >
          {/* Custom Placeholder Image (supports both external links & local paths) */}
          <img
            src={placeholderImage}
            alt="Featured esports video thumbnail"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=Esports+Video";
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 group-hover:scale-110 transition-all duration-300">
              <Play
                className="w-6 h-6 sm:w-8 sm:h-8 text-black ml-1"
                fill="currentColor"
                aria-hidden="true"
              />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Featured Esports Video"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
};

export const HomepageAd: React.FC<HomepageAdProps> = ({
  youtubeVideoId,
  placeholderImage = "/homepage/jonty-gaming-images.webp",
  reviews = DEFAULT_REVIEWS,
  autoSlideInterval = 4500,
  className = "",
}) => {
  const finalVideoId = youtubeVideoId || import.meta.env.ENV_YOUTUBE_VIDEO_ID;
  const finalPlaceholderImage =
    placeholderImage || import.meta.env.ENV_PLACEHOLDER_IMAGE;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && timerRef.current) {
          clearInterval(timerRef.current);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (isTransitioning || index === activeIndex || reviews.length <= 1)
        return;
      setIsTransitioning(true);
      setDirection(dir);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, activeIndex, reviews.length],
  );

  const handleNext = useCallback(() => {
    goTo((activeIndex + 1) % reviews.length, "next");
  }, [activeIndex, reviews.length, goTo]);

  const handlePrev = useCallback(() => {
    goTo((activeIndex - 1 + reviews.length) % reviews.length, "prev");
  }, [activeIndex, reviews.length, goTo]);

  // Auto-slide
  useEffect(() => {
    if (isHovered || reviews.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(handleNext, autoSlideInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, autoSlideInterval, handleNext, reviews.length]);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-[#0a0a0a] py-16 sm:py-20 lg:py-24 overflow-hidden relative ${className}`}
      aria-label="Community Thoughts and Featured Video"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(234,88,12,0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-40" />

      {/* FULL WIDTH CONTAINER — no max-w constraint */}
      <div
        className={`w-full px-6 sm:px-12 lg:px-16 relative z-10 transition-all duration-700 ease-out will-change-transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 50 / 50 Grid — stretches full screen width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          {/* LEFT PANEL: Video + Custom Image Placeholder */}
          <div className="order-1 w-full">
            <VideoEmbed
              videoId={finalVideoId}
              placeholderImage={finalPlaceholderImage}
            />
          </div>

          {/* RIGHT PANEL: Thoughts / Community Reviews */}
          <div
            className="order-2 w-full bg-white/[0.03] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/10 flex flex-col h-full min-h-[420px] sm:min-h-[480px] relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Header with decorative quotes */}
            <div className="relative mb-8 sm:mb-10">
              <Quote
                className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-10 h-10 sm:w-14 sm:h-14 text-amber-500/15 rotate-180"
                strokeWidth={1}
                aria-hidden="true"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight relative z-10 pl-2">
                What People Are Saying About Esports
              </h2>
              <Quote
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-10 h-10 sm:w-14 sm:h-14 text-amber-500/15"
                strokeWidth={1}
                aria-hidden="true"
              />
            </div>

            {/* Carousel Viewport */}
            <div
              className="relative flex-1 min-h-[200px] sm:min-h-[240px] w-full"
              aria-live="polite"
              aria-atomic="true"
            >
              {reviews.map((review, idx) => (
                <TestimonialSlide
                  key={review.id}
                  review={review}
                  isActive={idx === activeIndex}
                  direction={direction}
                />
              ))}
            </div>

            {/* Controls & CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
              <div className="flex items-center gap-3 order-2 sm:order-1">
                <button
                  onClick={handlePrev}
                  disabled={isTransitioning}
                  aria-label="Previous testimonial"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-400 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        goTo(idx, idx > activeIndex ? "next" : "prev")
                      }
                      aria-label={`Go to testimonial ${idx + 1}`}
                      aria-current={idx === activeIndex ? "true" : undefined}
                      className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                        idx === activeIndex
                          ? "w-8 bg-gradient-to-r from-amber-400 to-orange-500"
                          : "w-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  aria-label="Next testimonial"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-400 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <a
                href="/register"
                className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-amber-400/50 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                Join Tournament
                <ArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageAd;
