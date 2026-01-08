import React from 'react';
import { FileText, Linkedin, Globe } from 'lucide-react';

export function BioLinks() {
  return (
    <div className="flex justify-center gap-8 mt-16">
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
      >
        <FileText className="w-5 h-5" />
        <span>Print CV</span>
      </a>
      <a
        href="https://www.linkedin.com/in/gaetan-pelletey/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
      >
        <Linkedin className="w-5 h-5" />
        <span>LinkedIn Profile</span>
      </a>
      <a
        href="https://website.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
      >
        <Globe className="w-5 h-5" />
        <span>Urban Planning Website</span>
      </a>
    </div>
  );
}