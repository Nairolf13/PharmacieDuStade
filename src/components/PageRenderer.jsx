import React from 'react';
import Accueil from '../pages/Accueil';
import RechercheMedicaments from '../pages/RechercheMedicaments';
import Conseils from '../pages/Conseils';
import EntretiensPharmaceutiques from '../pages/EntretiensPharmaceutiques';
import MaterielMedical from '../pages/MaterielMedical';
import NumerosUtiles from '../pages/NumerosUtiles';
import RecyclageMedicaments from '../pages/RecyclageMedicaments';
import Vaccination from '../pages/Vaccination';

function PageRenderer({ currentPage }) {
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

  return renderPage();
}

export default PageRenderer;
