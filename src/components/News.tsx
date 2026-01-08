import React, { useState } from 'react';
import { ProjectSocialLinks } from './ProjectSocialLinks';
import { NewsCard } from './NewsCard';
import { NewsArticle } from './NewsArticle';
import type { NewsItem } from '../hooks/useGitHubData';

interface NewsProps {
  newsItems: NewsItem[];
}

export function News({ newsItems }: NewsProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // If no news items exist, show empty state
  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 pt-32 text-center">
          <p className="text-xl text-gray-500">No news available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 pt-32 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {newsItems.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onClick={() => setSelectedArticle(item)}
            />
          ))}
        </div>

        <ProjectSocialLinks />
      </div>

      {selectedArticle && (
        <NewsArticle
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
