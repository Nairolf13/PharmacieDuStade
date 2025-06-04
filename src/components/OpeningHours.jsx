import React from 'react';

function OpeningHours() {
  const today = new Date();
  const currentDay = today.getDay(); 
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const todayName = dayNames[currentDay];

  const hoursData = [
    { 
      day: 'Lundi', 
      hours: '08:30 – 19:30', 
      mobileHours: { morning: '08:30 - 19:30', afternoon: null },
      isToday: todayName === 'Lundi' 
    },
    { 
      day: 'Mardi', 
      hours: '08:30 – 19:30', 
      mobileHours: { morning: '08:30 - 19:30', afternoon: null },
      isToday: todayName === 'Mardi' 
    },
    { 
      day: 'Mercredi', 
      hours: '08:30 – 19:30', 
      mobileHours: { morning: '08:30 - 19:30', afternoon: null },
      isToday: todayName === 'Mercredi' 
    },
    { 
      day: 'Jeudi', 
      hours: '08:30 – 19:30', 
      mobileHours: { morning: '08:30 - 19:30', afternoon: null },
      isToday: todayName === 'Jeudi' 
    },
    { 
      day: 'Vendredi', 
      hours: '08:30 – 19:30', 
      mobileHours: { morning: '08:30 - 19:30', afternoon: null },
      isToday: todayName === 'Vendredi' 
    },
    { 
      day: 'Samedi', 
      hours: '08:30 – 12:30', 
      mobileHours: { morning: '08:30 - 12:30', afternoon: null },
      isToday: todayName === 'Samedi' 
    },
    { 
      day: 'Dimanche', 
      hours: 'Consulter les gardes', 
      mobileHours: { morning: 'Fermé', afternoon: null },
      isToday: todayName === 'Dimanche' 
    },
  ];

  return (
    <div className="accueil-hours-section">
      <div className="accueil-hours-header">
        <div className="accueil-hours-icon">
          <span className="text-2xl">🕒</span>
        </div>
        <h2 className="accueil-hours-title">Horaires d'Ouverture</h2>
      </div>
      <div className="accueil-hours-list">
        {hoursData.map((item, index) => (
          <div key={index} className={`accueil-hours-item ${item.isToday ? 'today' : ''}`}>
            <span className={`accueil-hours-day ${item.isToday ? 'today' : ''}`}>
              {item.day}
            </span>
            {/* Affichage desktop */}
            <span className={`accueil-hours-time ${item.isToday ? 'today' : ''} hidden sm:block`}>
              {item.hours}
            </span>
            {/* Affichage mobile */}
            <div className={`accueil-hours-mobile ${item.isToday ? 'today' : ''} block sm:hidden`}>
              <div className="text-xs">
                {item.mobileHours.morning}
              </div>
              {item.mobileHours.afternoon && (
                <div className="text-xs opacity-75">
                  {item.mobileHours.afternoon}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpeningHours;
