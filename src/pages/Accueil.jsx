import React from 'react';
import HeroSection from '../components/HeroSection';
import QuickInfoCards from '../components/QuickInfoCards';
import OpeningHours from '../components/OpeningHours';
import ServicesSection from '../components/ServicesSection';
import CesiumMap from '../components/CesiumMap';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { Ion } from 'cesium';

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESS_TOKEN;

if (!import.meta.env.VITE_CESIUM_ACCESS_TOKEN) {
  console.warn('Cesium Ion access token is not set. Please configure VITE_CESIUM_ACCESS_TOKEN in your environment variables.');
}

window.CESIUM_BASE_URL = '/cesium';

function Accueil() {
  return (
    <div className="min-h-screen gradient-bg">
      <HeroSection />
      
      <div className="w-full px-2 sm:px-3 lg:px-4 pb-6 sm:pb-8 lg:pb-12">
        <QuickInfoCards />
        
        <div className="accueil-main-grid">
          <OpeningHours />
          <ServicesSection />
        </div>
        
        <CesiumMap />
      </div>
    </div>
  );
}

export default Accueil;
