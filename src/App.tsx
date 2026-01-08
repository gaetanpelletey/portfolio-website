import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { useGitHubData } from './hooks/useGitHubData';
import { Carousel } from './components/Carousel';
import { HomeSocialLinks } from './components/HomeSocialLinks';
import { HomeNavigation } from './components/HomeNavigation';
import { Header } from './components/Header';
import { Projects } from './components/Projects';
import { ProjectDetails } from './components/ProjectDetails';
import { Biography } from './components/Biography';
import { News } from './components/News';

export default function App() {
  // 🔹 Fetch GitHub data ONCE
  const githubData = useGitHubData();

  const {
    loading,
    error,
    carouselImages,
    projects,
    projectDetails,
    newsItems
  } = githubData;

  // 🔹 Global loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  // 🔹 Global error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Unable to Load Data
          </h2>
          <p className="text-red-700 mb-4">{error}</p>
          <p className="text-sm text-red-600">
            Please check your GitHub repository configuration and ensure the data files are properly set up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />

          <div className="h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {/* ✅ Carousel now receives data via props */}
                    <Carousel
                      carouselImages={carouselImages}
                      loading={loading}
                    />
                    <HomeNavigation />
                    <HomeSocialLinks />
                  </>
                }
              />

              {/* These components should ALSO receive data via props */}
              <Route
                path="/projects"
                element={<Projects projects={projects} />}
              />

              <Route
                path="/projects/:id"
                element={
                  <ProjectDetails
                    projects={projects}
                    projectDetails={projectDetails}
                  />
                }
              />

              <Route
                path="/news"
                element={<News newsItems={newsItems} />}
              />

              <Route path="/biography" element={<Biography />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}
