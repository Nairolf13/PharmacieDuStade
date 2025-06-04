import React from 'react';

function Header({ currentPage, menuItems, isMenuOpen, setIsMenuOpen, handlePageChange }) {
  return (
    <header className="bg-green-600 text-white py-2 sm:py-3 lg:py-4 relative">
      <div className="w-full px-2 sm:px-3 lg:px-4 xl:px-6">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          <div className="flex items-center min-w-0 flex-1">
            <img 
              src="/PharmacieDuStade/assets/imgs/LogoPharma.png" 
              alt="Pharmacie Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 mr-2 sm:mr-3 lg:mr-4 flex-shrink-0 rounded-full shadow-md" 
            />
            <div className="min-w-0 flex-1">
              {/* Titre supprimé */}
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
    </header>
  );
}

export default Header;
