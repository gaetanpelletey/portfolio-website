import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

export function HomeNavigation() {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 flex flex-col items-center">
      <h1 className="text-white text-3xl mt-8">Gaëtan Pelletey</h1>
      <div className="flex gap-20 h-full items-center -mt-16">
        <Link to="/projects" className="text-white text-3xl hover:text-black transition-colors">
          {t('nav.projects')}
        </Link>
        <Link to="/news" className="text-white text-3xl hover:text-black transition-colors">
          {t('nav.news')}
        </Link>
        <Link to="/biography" className="text-white text-3xl hover:text-black transition-colors">
          {t('nav.biography')}
        </Link>
      </div>
    </div>
  );
}