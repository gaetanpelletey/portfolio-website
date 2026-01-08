import React, { useState } from 'react';
import { FolderKanban, BookOpen, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <Link
        to={to}
        className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center w-16 h-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon}
      </Link>
      {isHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-black text-sm font-medium whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
      <NavItem
        to="/"
        icon={<Home className="w-8 h-8 text-gray-700" />}
        label="Home"
      />
      <NavItem
        to="/projects"
        icon={<FolderKanban className="w-8 h-8 text-gray-700" />}
        label="Projects"
      />
      <NavItem
        to="/blog"
        icon={<BookOpen className="w-8 h-8 text-gray-700" />}
        label="Blog"
      />
    </div>
  );
}