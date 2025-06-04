import React from 'react';

function ServicesSection() {
  const servicesData = [
    { icon: '💬', title: 'Entretiens pharmaceutiques', desc: 'Conseils personnalisés sur vos traitements' },
    { icon: '💉', title: 'Vaccination', desc: 'Services de vaccination pour vous protéger' },
    { icon: '🔧', title: 'Matériel médical', desc: 'Gamme complète adaptée à vos besoins' },
    { icon: '♻️', title: 'Recyclage médicaments', desc: 'Recyclage responsable de vos médicaments' },
    { icon: '📞', title: 'Numéros utiles', desc: 'Contacts essentiels pour votre santé' },
    { icon: '💡', title: 'Conseils experts', desc: 'Notre équipe à votre écoute' },
  ];

  return (
    <div className="accueil-services-section">
      <div className="accueil-services-header">
        <div className="accueil-services-icon">
          <span className="text-2xl text-white">🏥</span>
        </div>
        <h2 className="accueil-services-title">Nos Services</h2>
      </div>
      <div className="accueil-services-list">
        {servicesData.map((service, index) => (
          <div key={index} className="accueil-service-item">
            <span className="accueil-service-icon">{service.icon}</span>
            <div className="accueil-service-content">
              <h4>{service.title}</h4>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;
