import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../hooks/useGitHubData';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-64 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <img
        src={project.image}
        alt={project.title}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div 
        className={`absolute inset-0 bg-white p-6 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-xl font-semibold mb-4 text-black">{project.title}</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
    </div>
  );
}