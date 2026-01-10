// NewsCard.tsx
import React from 'react';
import type { NewsItem } from '../hooks/useGitHubData'; // Changed this line

interface NewsCardProps {
  item: NewsItem;
  onClick: () => void;
}

export function NewsCard({ item, onClick }: NewsCardProps) {
  return (
    <div 
      className="bg-white overflow-hidden cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{item.date}</div>
        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}