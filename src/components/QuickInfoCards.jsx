import React from 'react';

const hoursData = [
  { day: 'Lundi', hours: '08:30 - 19:30' },
  { day: 'Mardi', hours: '08:30 - 19:30' },
  { day: 'Mercredi', hours: '08:30 - 19:30' },
  { day: 'Jeudi', hours: '08:30 - 19:30' },
  { day: 'Vendredi', hours: '08:30 - 19:30' },
  { day: 'Samedi', hours: '08:30 - 12:30' },
  { day: 'Dimanche', hours: 'Fermé' },
];

function getTodayHours() {
  const today = new Date();
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const todayName = dayNames[today.getDay()];
  const todayData = hoursData.find(h => h.day === todayName);
  return todayData ? todayData.hours : '';
}

function QuickInfoCards() {
  const todayHours = getTodayHours();
  const isOpen = todayHours !== 'Fermé' && todayHours !== 'Consulter les gardes';

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
        <p className="accueil-quick-card-text">
          {isOpen ? (
            <>
              <span className="text-green-700 font-semibold">Ouvert</span><br/>
              {todayHours}
            </>
          ) : (
            <span className="text-red-600 font-semibold">Fermé</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default QuickInfoCards;
