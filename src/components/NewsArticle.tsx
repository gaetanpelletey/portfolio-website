import React from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { NewsItem } from '../hooks/useGitHubData';

interface NewsArticleProps {
  article: NewsItem;
  onClose: () => void;
}

export function NewsArticle({ article, onClose }: NewsArticleProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto pt-20 pb-8">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        
        <div className="p-8">
          <div className="text-sm text-gray-500 mb-2">{article.date}</div>
          <h2 className="text-3xl font-bold mb-6">{article.title}</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}