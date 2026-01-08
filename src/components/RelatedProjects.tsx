import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGitHubData } from '../hooks/useGitHubData';

interface RelatedProjectsProps {
  currentProjectId: string;
}

export function RelatedProjects({ currentProjectId }: RelatedProjectsProps) {
  const navigate = useNavigate();
  const { projects, loading, error } = useGitHubData();

  if (loading || error) {
    return null;
  }

  const relatedProjects = projects
    .filter(project => project.id !== currentProjectId)
    .slice(0, 3);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {relatedProjects.map(project => (
        <div 
          key={project.id} 
          onClick={() => handleProjectClick(project.id)}
          className="group relative h-64 cursor-pointer"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <div className="absolute inset-0 bg-gray-100 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-xl font-semibold mb-4 text-black">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}