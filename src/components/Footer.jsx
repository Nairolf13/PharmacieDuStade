import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-4 lg:mt-6">
      <div className="w-full px-2 sm:px-3 lg:px-4 xl:px-6 py-4 sm:py-6 lg:py-8">
        <div className="text-center">
          {/* Logo et titre dans le footer */}
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <img
              src="/PharmacieDuStade/assets/imgs/LogoPharma.png"
              alt="Pharmacie Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 mr-3 sm:mr-4 rounded-full shadow-lg"
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
                Pharmacie DU STADE
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                Votre santé, notre priorité
              </p>
            </div>
          </div>

          {/* Informations de contact en grille responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl mb-2">📞</div>
              <h4 className="font-semibold text-sm sm:text-base mb-1">
                Contact
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">04 91 79 78 54</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl mb-3">🕒</div>
              <h4 className="font-semibold text-sm sm:text-base mb-3">
                Horaires d'ouverture
              </h4>
              <div className="text-xs sm:text-sm text-gray-300 space-y-2">
                <div className="flex justify-between items-center px-2">
                  <span className="text-gray-400">Lundi - Vendredi</span>
                  <span className="text-green-400 font-medium">
                    8h30 - 19h30
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-gray-400">Samedi</span>
                  <span className="text-green-400 font-medium">
                    8h30 - 12h30
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-gray-400">Dimanche</span>
                    <span className="text-red-400 font-medium">Consulter les gardes</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 italic">
                  Ouvert sans interruption
                </div>
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl mb-2">📍</div>
              <h4 className="font-semibold text-sm sm:text-base mb-1">
                Adresse
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                120 Bd Romain Rolland 10ème, 13010 Marseille
              </p>
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
  );
}

export default Footer;
