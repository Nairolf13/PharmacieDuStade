import React from 'react';

function MobileMenu({ isMenuOpen, setIsMenuOpen, menuItems, currentPage, handlePageChange }) {
  return (
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
                src="/assets/imgs/LogoPharma.png" 
                alt="Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-2 sm:mr-3 rounded-full shadow-md flex-shrink-0" 
              />
              <div className="min-w-0 flex-1">
                {/* Titre et navigation supprimés */}
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
  );
}

export default MobileMenu;
