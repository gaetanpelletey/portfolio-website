import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectSocialLinks } from './ProjectSocialLinks';
import { useTranslation } from '../hooks/useTranslation';
import type { Project } from '../hooks/useGitHubData';

type ProjectType = 'Academic' | 'Personal' | 'Company' | 'All';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<ProjectType>('All');
  const [sortByYear, setSortByYear] = useState<'asc' | 'desc'>('desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Empty state (optional but good UX)
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-xl text-gray-500">No projects available.</p>
        </div>
      </div>
    );
  }

  const filteredProjects = projects
    .filter(
      (project) =>
        selectedType === 'All' || project.type === selectedType
    )
    .sort((a, b) => {
      const yearA = parseInt(a.year || '0', 10);
      const yearB = parseInt(b.year || '0', 10);
      return sortByYear === 'asc'
        ? yearA - yearB
        : yearB - yearA;
    });

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-32">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-xl hover:text-gray-600 transition-colors"
          >
            {t('projects.filter')}
          </button>
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden mb-8 ${
            isFilterOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {t('projects.projectType')}
                </h3>
                <div className="flex gap-3">
                  {(['All', 'Academic', 'Personal', 'Company'] as const).map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedType === type
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        {t(`projects.${type.toLowerCase()}`)}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {t('projects.sortByYear')}
                </h3>
                <button
                  onClick={() =>
                    setSortByYear((current) =>
                      current === 'asc' ? 'desc' : 'asc'
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition-colors"
                >
                  {t('projects.year')} {sortByYear === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16">
          <ProjectSocialLinks />
        </div>
      </div>
    </div>
  );
}
