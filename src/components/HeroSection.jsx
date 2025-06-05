import React from 'react';
import { getImagePath } from '../utils/pathUtils';

function HeroSection() {
  return (
    <section className="accueil-hero">
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="text-center fade-in-up">
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
