import React from 'react';

function QuickInfoCards() {
  return (
    <div className="accueil-quick-cards">
      <div className="accueil-quick-card">
        <div className="accueil-quick-card-icon">📍</div>
        <h3 className="accueil-quick-card-title">Notre Adresse</h3>
        <p className="accueil-quick-card-text">120 Bd Romain Rolland<br/>13010 MARSEILLE</p>
      </div>
      <div className="accueil-quick-card" style={{animationDelay: '0.2s'}}>
        <div className="accueil-quick-card-icon">📞</div>
        <h3 className="accueil-quick-card-title">Téléphone</h3>
        <p className="accueil-quick-card-text text-xl font-bold">04 91 79 78 54</p>
      </div>
      <div className="accueil-quick-card" style={{animationDelay: '0.4s'}}>
        <div className="accueil-quick-card-icon">⏰</div>
        <h3 className="accueil-quick-card-title">Ouvert Aujourd'hui</h3>
        <p className="accueil-quick-card-text">09:00 - 12:30<br/>14:30 - 19:30</p>
      </div>
    </div>
  );
}

export default QuickInfoCards;
