{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import React, \{ useState \} from 'react';\
import \{ ProjectSocialLinks \} from './ProjectSocialLinks';\
import \{ NewsCard \} from './NewsCard';\
import \{ NewsArticle \} from './NewsArticle';\
import type \{ NewsItem \} from '../hooks/useGitHubData';\
\
interface NewsProps \{\
  newsItems: NewsItem[];\
\}\
\
export function News(\{ newsItems \}: NewsProps) \{\
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);\
\
  // If no news items exist, show empty state\
  if (!newsItems || newsItems.length === 0) \{\
    return (\
      <div className="bg-white min-h-screen">\
        <div className="container mx-auto px-4 pt-32 text-center">\
          <p className="text-xl text-gray-500">No news available.</p>\
        </div>\
      </div>\
    );\
  \}\
\
  return (\
    <div className="bg-white min-h-screen">\
      <div className="container mx-auto px-4 pt-32 max-w-6xl">\
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">\
          \{newsItems.map((item) => (\
            <NewsCard\
              key=\{item.id\}\
              item=\{item\}\
              onClick=\{() => setSelectedArticle(item)\}\
            />\
          ))\}\
        </div>\
\
        <ProjectSocialLinks />\
      </div>\
\
      \{selectedArticle && (\
        <NewsArticle\
          article=\{selectedArticle\}\
          onClose=\{() => setSelectedArticle(null)\}\
        />\
      )\}\
    </div>\
  );\
\}\
}