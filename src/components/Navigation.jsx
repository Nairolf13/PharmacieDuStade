import React, { useState } from 'react';

function Navigation({ onPageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { id: 'map', name: 'Carte' },
    { id: 'recherche-medicaments', name: 'Rechercher un médicament' },
    { id: 'conseils', name: 'Conseils' },
    { id: 'entretiens', name: 'Entretiens Pharmaceutiques' },
    { id: 'materiel', name: 'Matériel Médical' },
    { id: 'numeros', name: 'Numéros Utiles' },
    { id: 'recyclage', name: 'Recyclage Médicaments' },
    { id: 'vaccination', name: 'Vaccination' }
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo ou titre ici */}
              <span className="text-blue-600 font-bold text-xl">Pharmacie</span>
            </div>
          </div>
          
          {/* Menu hamburger pour mobile */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden sm:flex sm:space-x-4">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                onPageChange(page.id);
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
