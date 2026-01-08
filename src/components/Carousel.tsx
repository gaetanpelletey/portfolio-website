import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CarouselImage } from '../hooks/useGitHubData';

interface CarouselProps {
  carouselImages: CarouselImage[];
  loading: boolean;
}

export function Carousel({ carouselImages, loading }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback images if GitHub data is not available
  const fallbackImages: CarouselImage[] = [
    {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
      alt: 'Architecture 1',
    },
    {
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
      alt: 'Architecture 2',
    },
    {
      url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80',
      alt: 'Architecture 3',
    },
  ];

  const images = carouselImages.length > 0 ? carouselImages : fallbackImages;

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  if (loading) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading images...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white transition-colors z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-colors z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
