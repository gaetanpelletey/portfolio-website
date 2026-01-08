import React, { useState } from 'react';
import { Linkedin, Globe, FileText, FileCode } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/social';

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
        className="text-white hover:text-black transition-colors"
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

export function HomeSocialLinks() {
  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 flex gap-8">
      <SocialLink
        href={SOCIAL_LINKS.linkedin}
        icon={<Linkedin className="w-6 h-6" />}
        label="LinkedIn"
      />
      <SocialLink
        href={SOCIAL_LINKS.website}
        icon={<Globe className="w-6 h-6" />}
        label="Website"
      />
      <SocialLink
        href={SOCIAL_LINKS.portfolio}
        icon={<FileText className="w-6 h-6" />}
        label="Portfolio"
      />
      <SocialLink
        href={SOCIAL_LINKS.cv}
        icon={<FileCode className="w-6 h-6" />}
        label="CV"
      />
    </div>
  );
}