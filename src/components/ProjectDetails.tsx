import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { RelatedProjects } from './RelatedProjects';
import { MetadataItem } from './MetadataItem';
import { ProjectSocialLinks } from './ProjectSocialLinks';
import { ProjectGallery } from './ProjectGallery';
import { ProjectSection } from './ProjectSection';
import { Lightbox } from './Lightbox';
import { useTranslation } from '../hooks/useTranslation';
import type { Project, ProjectContent } from '../hooks/useGitHubData';

interface ProjectDetailsProps {
  projects: Project[];
  projectDetails: Record<string, ProjectContent>;
}

export function ProjectDetails({
  projects,
  projectDetails,
}: ProjectDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentLightboxImageIndex, setCurrentLightboxImageIndex] = React.useState(0);

  const project = projects.find((p) => p.id === id);
  const details = id ? projectDetails[id] : undefined;

  // Consolidate all project images for lightbox
  const allProjectImages = React.useMemo(() => {
    const images: { url: string; caption: string }[] = [];
    
    // Add cover image
    if (project?.image) {
      images.push({
        url: project.image,
        caption: `${project.title} - Cover Image`
      });
    }
    
    // Add gallery images
    if (details?.gallery) {
      images.push(...details.gallery);
    }
    
    // Add section images
    if (details?.sections) {
      details.sections.forEach((section) => {
        if (section.image) {
          images.push({
            url: section.image,
            caption: `${section.title}`
          });
        }
      });
    }
    
    return images;
  }, [project, details]);

  const openLightbox = (imageIndex: number) => {
    setCurrentLightboxImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const openLightboxByUrl = (imageUrl: string) => {
    const index = allProjectImages.findIndex(img => img.url === imageUrl);
    if (index !== -1) {
      openLightbox(index);
    }
  };

  const openLightboxForGalleryImage = (galleryIndex: number) => {
    // Calculate the actual index in allProjectImages
    // Cover image is at index 0 (if it exists)
    const coverImageOffset = project?.image ? 1 : 0;
    const actualIndex = coverImageOffset + galleryIndex;
    openLightbox(actualIndex);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <p className="text-xl text-gray-700">Project not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        {t('projectDetails.back')}
      </Link>

      <div className="mb-16">
        <h1 className="text-5xl font-display font-bold mb-12 uppercase tracking-wider text-center">
          {project.title}
        </h1>

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[600px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => openLightboxByUrl(project.image)}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="prose max-w-none mb-16">
          <ReactMarkdown>{project.fullDescription}</ReactMarkdown>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          <MetadataItem
            title={t('projectDetails.location')}
            value={project.location || ''}
            showTopBorder
          />
          <MetadataItem
            title={t('projectDetails.client')}
            value={project.client || ''}
            showTopBorder
          />
          <MetadataItem
            title={t('projectDetails.year')}
            value={project.year || ''}
            showTopBorder
          />
          <MetadataItem
            title={t('projectDetails.status')}
            value={project.status || ''}
          />
          <MetadataItem
            title={t('projectDetails.size')}
            value={project.size || ''}
          />
          <MetadataItem
            title={t('projectDetails.category')}
            value={project.category || ''}
          />
          <div className="col-span-3">
            <MetadataItem
              title={t('projectDetails.collaborators')}
              value={project.collaborators || ''}
            />
          </div>
        </div>
      </div>

      {details && (
        <div className="mt-24">
          <ProjectGallery 
            images={details.gallery} 
            onImageClick={openLightboxForGalleryImage}
          />

          {details.sections.map((section, index) => (
            <ProjectSection
              key={index}
              title={section.title}
              content={section.content}
              image={section.image}
              imagePosition={section.imagePosition}
              onImageClick={openLightboxByUrl}
            />
          ))}
        </div>
      )}

      <div className="w-full h-px bg-gray-200 my-24"></div>

      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8">
          {t('projectDetails.otherProjects')}
        </h2>

        <RelatedProjects currentProjectId={project.id} />
        <ProjectSocialLinks />
      </div>

      {lightboxOpen && allProjectImages.length > 0 && (
        <Lightbox
          images={allProjectImages}
          initialIndex={currentLightboxImageIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
