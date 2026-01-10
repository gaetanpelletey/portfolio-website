import React from 'react';

interface ProjectGalleryProps {
  images: { url: string; caption: string; }[];
  onImageClick?: (index: number) => void;
}

export function ProjectGallery({ images, onImageClick }: ProjectGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-8 my-16">
      {images.map((image, index) => (
        <div key={index} className="space-y-2">
          <img
            src={image.url}
            alt={image.caption}
            className={`w-full h-[400px] object-cover ${
              onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
            }`}
            onClick={() => onImageClick?.(index)}
          />
          <p className="text-sm text-gray-600 italic">{image.caption}</p>
        </div>
      ))}
    </div>
  );
}