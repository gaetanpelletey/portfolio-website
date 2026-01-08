import React from 'react';
import { BioLinks } from './BioLinks';

export function Biography() {
  return (
    <div className="h-screen pt-24 px-4 bg-white">
      <div className="h-[calc(100%-6rem)] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="h-[90%] mx-auto w-[90%]">
          <img
            src="/src/images/bio/Gaetan.JPG"
            alt="Gaëtan Pelletey"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6 pr-8">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-lg leading-relaxed">
            As an architect and urban planner, I focus on creating sustainable, human-centered spaces 
            that enhance community life. My work spans from intimate residential projects to large-scale 
            urban developments, always prioritizing environmental responsibility and social impact.
          </p>
          <p className="text-lg leading-relaxed">
            With a deep understanding of how thoughtful design can transform cities, I constantly 
            seek to push the boundaries of what's possible in contemporary architecture.
          </p>
          <div className="pt-4">
            <BioLinks />
          </div>
        </div>
      </div>
    </div>
  );
}