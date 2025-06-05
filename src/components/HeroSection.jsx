import React from 'react';
import { getImagePath } from '../utils/pathUtils';

function HeroSection() {
  return (
    <section className="accueil-hero">
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="text-center fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 drop-shadow-lg">
            PHARMACIE DU STADE
          </h1>
          <div className="mb-8">
            <img 
              src={getImagePath('pharma.webp')} 
              alt="Pharmacie du Stade" 
              className="accueil-hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
