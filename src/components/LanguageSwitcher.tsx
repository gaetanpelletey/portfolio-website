import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}