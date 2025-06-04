import React, { useState } from 'react';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import PageRenderer from './components/PageRenderer';

function App() {
  const [currentPage, setCurrentPage] = useState('map');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'map', name: 'Accueil', icon: '🏠' },
    { id: 'recherche-medicaments', name: 'Rechercher un médicament', icon: '💊' },
    { id: 'conseils', name: 'Conseils', icon: '💡' },
    { id: 'entretiens', name: 'Entretiens Pharmaceutiques', icon: '👨‍⚕️' },
    { id: 'materiel', name: 'Matériel Médical', icon: '🩺' },
    { id: 'numeros', name: 'Numéros Utiles', icon: '📞' },
    { id: 'recyclage', name: 'Recyclage Médicaments', icon: '♻️' },
    { id: 'vaccination', name: 'Vaccination', icon: '💉' }
  ];

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <Header 
        currentPage={currentPage}
        menuItems={menuItems}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handlePageChange={handlePageChange}
      />
      
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      
      <MainContent>
        <PageRenderer currentPage={currentPage} />
      </MainContent>
      
      <Footer />
    </div>
  );
}

export default App;
