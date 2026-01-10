import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';

interface LightboxImage {
  url: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  const handleDownload = () => {
    const currentImage = images[currentIndex];
    if (!currentImage) return;

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = currentImage.url;
    
    // Generate filename from caption or use default
    let filename = 'image';
    if (currentImage.caption) {
      // Clean the caption to make it filename-safe
      filename = currentImage.caption
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase();
    }
    
    // Try to get file extension from URL
    const urlParts = currentImage.url.split('.');
    const extension = urlParts.length > 1 ? urlParts[urlParts.length - 1].split('?')[0] : 'jpg';
    
    link.download = `${filename}.${extension}`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="absolute top-16 right-4 text-white hover:text-gray-300 transition-colors z-10"
        title="Download image"
      >
        <Download className="w-6 h-6" />
      </button>
      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image container */}
      <div className="max-w-7xl max-h-full flex flex-col items-center">
        <img
          src={currentImage.url}
          alt={currentImage.caption}
          className="max-w-full max-h-[80vh] object-contain"
        />
        
        {/* Caption */}
        {currentImage.caption && (
          <p className="text-white text-center mt-4 max-w-2xl px-4">
            {currentImage.caption}
          </p>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="text-white text-sm mt-2">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}