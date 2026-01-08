import React from 'react';

interface GalleryImage {
  url: string;
  caption: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-8 my-16">
      {images.map((image, index) => (
        <div key={index} className="space-y-2">
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-[400px] object-cover"
          />
          <p className="text-sm text-gray-600 italic">{image.caption}</p>
        </div>
      ))}
    </div>
  );
}