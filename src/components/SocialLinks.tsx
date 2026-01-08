import React, { useState } from 'react';
import { Linkedin, Globe, FileText, FileCode } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-white transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon}
      </a>
      {isHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
}

export function SocialLinks() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
      <SocialLink
        href="https://linkedin.com"
        icon={<Linkedin className="w-6 h-6" />}
        label="LinkedIn"
      />
      <SocialLink
        href="https://website.com"
        icon={<Globe className="w-6 h-6" />}
        label="Website"
      />
      <SocialLink
        href="/portfolio.pdf"
        icon={<FileText className="w-6 h-6" />}
        label="Portfolio"
      />
      <SocialLink
        href="/cv.pdf"
        icon={<FileCode className="w-6 h-6" />}
        label="CV"
      />
    </div>
  );
}