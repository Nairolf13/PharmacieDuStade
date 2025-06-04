import React, { useState } from 'react';
import Accueil from './pages/Accueil';
import RechercheMedicaments from './pages/RechercheMedicaments';
import Conseils from './pages/Conseils';
import EntretiensPharmaceutiques from './pages/EntretiensPharmaceutiques';
import MaterielMedical from './pages/MaterielMedical';
import NumerosUtiles from './pages/NumerosUtiles';
import RecyclageMedicaments from './pages/RecyclageMedicaments';
import Vaccination from './pages/Vaccination';

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

  const renderPage = () => {
    switch (currentPage) {
      case 'map':
        return <Accueil />;
      case 'recherche-medicaments':
        return <RechercheMedicaments />;
      case 'conseils':
        return <Conseils />;
      case 'entretiens':
        return <EntretiensPharmaceutiques />;
      case 'materiel':
        return <MaterielMedical />;
      case 'numeros':
        return <NumerosUtiles />;
      case 'recyclage':
        return <RecyclageMedicaments />;
      case 'vaccination':
        return <Vaccination />;
      default:
        return <Accueil />;
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <header className="bg-green-600 text-white py-2 sm:py-3 lg:py-4 relative">
        <div className="w-full px-2 sm:px-3 lg:px-4 xl:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
            <div className="flex items-center min-w-0 flex-1">
              <img 
                src="./assets/imgs/LogoPharma.png" 
                alt="Pharmacie Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 mr-2 sm:mr-3 lg:mr-4 flex-shrink-0 rounded-full shadow-md" 
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold truncate leading-tight">
                  Pharmacie DU STADE
                </h1>
                <p className="hidden sm:block text-xs lg:text-sm opacity-90 truncate">
                  Votre santé, notre priorité
                </p>
              </div>
            </div>
            
            {/* Navigation desktop pour très grands écrans */}
            <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2 flex-shrink-0">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`desktop-nav-item px-2 xl:px-3 2xl:px-4 py-2 text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                    currentPage === item.id ? 'active bg-green-700 ring-2 ring-green-300' : 'hover:bg-green-700 hover:bg-opacity-80'
                  }`}
                  title={item.name}
                >
                  <span className="menu-icon mr-1 xl:mr-2 text-sm xl:text-base 2xl:text-lg">{item.icon}</span>
                  <span className="hidden 2xl:inline">{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Navigation tablette optimisée */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1 flex-shrink-0">
              {menuItems.slice(0, 5).map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`desktop-nav-item px-2 py-2 text-xs font-medium transition-all duration-200 rounded-lg ${
                    currentPage === item.id ? 'active bg-green-700 ring-2 ring-green-300' : 'hover:bg-green-700 hover:bg-opacity-80'
                  }`}
                  title={item.name}
                >
                  <span className="text-lg">{item.icon}</span>
                </button>
              ))}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="desktop-nav-item px-2 py-2 text-xs font-medium hover:bg-green-700 hover:bg-opacity-80 rounded-lg"
                title="Plus d'options"
              >
                <span className="text-lg">⋯</span>
              </button>
            </nav>

            {/* Bouton menu burger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`burger-button lg:hidden p-2 rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20 ${isMenuOpen ? 'burger-open' : ''}`}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center">
                <span className="burger-line"></span>
                <span className="burger-line"></span>
                <span className="burger-line"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Menu mobile overlay */}
        <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
          {/* Backdrop */}
          <div 
            className={`burger-menu-overlay absolute inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-50' : 'opacity-0'}`}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
          
          {/* Menu panel avec améliorations responsives */}
          <div className={`mobile-menu-panel absolute top-0 right-0 h-full w-full max-w-sm sm:w-80 md:w-96 shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-3 sm:p-4 lg:p-6 h-full flex flex-col bg-white">
              {/* Header du menu avec centrage amélioré */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="flex items-center min-w-0 flex-1">
                  <img 
                    src="./assets/imgs/LogoPharma.png" 
                    alt="Logo" 
                    className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-2 sm:mr-3 rounded-full shadow-md flex-shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 truncate">Menu</h2>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">Navigation</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="menu-focus p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 ml-2"
                  aria-label="Fermer le menu"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items du menu avec scroll optimisé */}
              <nav className="flex-1 space-y-1 sm:space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" role="navigation" aria-label="Menu principal">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`mobile-menu-item menu-focus w-full flex items-center px-3 sm:px-4 py-3 sm:py-4 text-left transition-all duration-200 rounded-lg ${
                      currentPage === item.id 
                        ? 'active text-green-700 bg-green-50 border-l-4 border-green-500' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600 hover:translate-x-1'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="menu-icon text-lg sm:text-xl lg:text-2xl mr-3 sm:mr-4 flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium block text-sm sm:text-base lg:text-lg truncate">{item.name}</span>
                      {currentPage === item.id && (
                        <span className="text-xs sm:text-sm text-green-600 font-normal">Page actuelle</span>
                      )}
                    </div>
                    {currentPage === item.id && (
                      <span className="text-green-500 flex-shrink-0 ml-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Footer du menu avec centrage parfait */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 flex-shrink-0">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-100 via-blue-50 to-green-100 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-sm">
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mb-1">Pharmacie DU STADE</p>
                    <p className="text-xs sm:text-sm text-gray-600">Votre santé, notre priorité</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                    <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-base sm:text-lg mb-1">📞</span>
                      <span className="text-xs">Contact</span>
                    </button>
                    <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-base sm:text-lg mb-1">🕒</span>
                      <span className="text-xs">Horaires</span>
                    </button>
                    <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-base sm:text-lg mb-1">📍</span>
                      <span className="text-xs">Localisation</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Contenu principal avec container responsive optimisé */}
      <main className="min-h-screen bg-gray-50">
        <div className="w-full px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 lg:py-4 xl:py-6">
          <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm sm:shadow-md lg:shadow-lg p-2 sm:p-3 lg:p-4 xl:p-6">
            {renderPage()}
          </div>
        </div>
      </main>
      
      {/* Footer responsive avec centrage parfait */}
      <footer className="bg-gray-800 text-white mt-4 lg:mt-6">
        <div className="w-full px-2 sm:px-3 lg:px-4 xl:px-6 py-4 sm:py-6 lg:py-8">
          <div className="text-center">
            {/* Logo et titre dans le footer */}
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <img 
                src="./assets/imgs/LogoPharma.png" 
                alt="Pharmacie Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 mr-3 sm:mr-4 rounded-full shadow-lg" 
              />
              <div className="text-left">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Pharmacie DU STADE</h3>
                <p className="text-sm sm:text-base text-gray-300">Votre santé, notre priorité</p>
              </div>
            </div>
            
            {/* Informations de contact en grille responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl mb-2">📞</div>
                <h4 className="font-semibold text-sm sm:text-base mb-1">Contact</h4>
                <p className="text-xs sm:text-sm text-gray-300">01 23 45 67 89</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl mb-2">🕒</div>
                <h4 className="font-semibold text-sm sm:text-base mb-1">Horaires</h4>
                <p className="text-xs sm:text-sm text-gray-300">Lun-Sam 8h-20h</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl mb-2">📍</div>
                <h4 className="font-semibold text-sm sm:text-base mb-1">Adresse</h4>
                <p className="text-xs sm:text-sm text-gray-300">Près du stade</p>
              </div>
            </div>
            
            {/* Copyright et liens légaux */}
            <div className="border-t border-gray-600 pt-4 sm:pt-6">
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                &copy; 2025 Pharmacie DU STADE. Tous droits réservés.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <button className="text-green-400 hover:text-green-300 text-sm sm:text-base transition-colors duration-200 hover:underline">
                  Mentions légales
                </button>
                <span className="hidden sm:inline text-gray-500">|</span>
                <button className="text-green-400 hover:text-green-300 text-sm sm:text-base transition-colors duration-200 hover:underline">
                  Politique de confidentialité
                </button>
                <span className="hidden sm:inline text-gray-500">|</span>
                <button className="text-green-400 hover:text-green-300 text-sm sm:text-base transition-colors duration-200 hover:underline">
                  Plan du site
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
