import React from 'react';

function HeroSection() {
  return (
    <section className="accueil-hero">
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="text-center fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 drop-shadow-lg">
            Pharmacie DU STADE
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white mb-8 sm:mb-10 lg:mb-12 drop-shadow-md opacity-90">
            Votre santé, notre priorité
          </p>
          <div className="mb-8">
            <img 
              src="/PharmacieDuStade/assets/imgs/pharma.webp" 
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
