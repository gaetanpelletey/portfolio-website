import { useState, useEffect, useCallback } from 'react';

interface GitHubConfig {
  username: string;
  repoName: string;
  branch: string;
}

// Define the types for your data
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string; // This will contain Markdown
  image: string;
  technologies: string[];
  type: 'Academic' | 'Personal' | 'Company';
  location?: string;
  client?: string;
  year?: string;
  status?: string;
  size?: string;
  category?: string;
  collaborators?: string;
}

export interface ProjectGalleryImage {
  url: string;
  caption: string;
}

export interface ProjectContent {
  id: string;
  gallery: ProjectGalleryImage[];
  sections: {
    title: string;
    content: string; // This will contain Markdown
    image?: string;
    imagePosition?: 'left' | 'right';
  }[];
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  content: string; // This will contain Markdown
  image: string;
}

export interface CarouselImage {
  url: string;
  alt: string;
}

interface UseGitHubDataResult {
  projects: Project[];
  projectDetails: Record<string, ProjectContent>;
  newsItems: NewsItem[];
  carouselImages: CarouselImage[];
  loading: boolean;
  error: string | null;
}

export function useGitHubData(): UseGitHubDataResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectDetails, setProjectDetails] = useState<Record<string, ProjectContent>>({});
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubFile = useCallback(async <T>(path: string): Promise<T | null> => {
    const username = import.meta.env.VITE_GITHUB_USERNAME;
    const repoName = import.meta.env.VITE_GITHUB_REPO_NAME;
    const branch = import.meta.env.VITE_GITHUB_BRANCH;

    if (!username || !repoName || !branch) {
      setError("GitHub environment variables are not set. Please check your .env file.");
      setLoading(false);
      return null;
    }

    const url = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/${path}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.error(`Error fetching ${path}:`, err);
      setError(`Could not load data from GitHub: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch projects
        const fetchedProjects = await fetchGitHubFile<Project[]>('projects.json');
        if (fetchedProjects) {
          setProjects(fetchedProjects);

          // Fetch project details for each project
          const detailsMap: Record<string, ProjectContent> = {};
          for (const project of fetchedProjects) {
            const detail = await fetchGitHubFile<ProjectContent>(`project-details/${project.id}.json`);
            if (detail) {
              detailsMap[project.id] = detail;
            }
          }
          setProjectDetails(detailsMap);
        }

        // Fetch news items
        const fetchedNewsItems = await fetchGitHubFile<NewsItem[]>('news.json');
        if (fetchedNewsItems) {
          setNewsItems(fetchedNewsItems);
        }

        // Fetch carousel images
        const fetchedCarouselImages = await fetchGitHubFile<CarouselImage[]>('carousel.json');
        if (fetchedCarouselImages) {
          setCarouselImages(fetchedCarouselImages);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(`Failed to load data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchGitHubFile]);

  return { projects, projectDetails, newsItems, carouselImages, loading, error };
}