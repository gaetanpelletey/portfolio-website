import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectSectionProps {
  title: string;
  content: string; // This will contain Markdown
  image?: string;
  imagePosition?: 'left' | 'right';
}

export function ProjectSection({ 
  title, 
  content, 
  image, 
  imagePosition = 'right' 
}: ProjectSectionProps) {
  const textContent = (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-semibold">{title}</h3>
      <div className="prose max-w-none">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );

  if (!image) {
    return <div className="my-16">{textContent}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
      {imagePosition === 'left' ? (
        <>
          <img src={image} alt={title} className="w-full h-[400px] object-cover" />
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          <img src={image} alt={title} className="w-full h-[400px] object-cover" />
        </>
      )}
    </div>
  );
}