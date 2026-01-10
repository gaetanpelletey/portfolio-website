import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

const getTitleFromPath = (pathname: string, t: (key: string) => string): string => {
  // Check if we're on projects page or any project detail page
  if (pathname === '/projects' || pathname.startsWith('/projects/')) {
    return t('nav.projects');
  }
  
  switch (pathname) {
    case '/news':
      return t('nav.news');
    case '/biography':
      return t('nav.biography');
    default:
      return '';
  }
};

export function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const isHome = location.pathname === '/';
  
  if (isHome) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 py-6 px-8">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-medium hover:text-gray-600 transition-colors">
          Gaëtan Pelletey
        </Link>
        
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl tracking-[0.2em]">
          {getTitleFromPath(location.pathname, t)}
        </h1>
        
        <nav className="flex items-center gap-8">
          <Link to="/projects" className="hover:text-gray-600 transition-colors">
            {t('nav.projects')}
          </Link>
          <Link to="/news" className="hover:text-gray-600 transition-colors">
            {t('nav.news')}
          </Link>
          <Link to="/biography" className="hover:text-gray-600 transition-colors">
            {t('nav.biography')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}