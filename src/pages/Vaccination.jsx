import React from 'react';

function Vaccination() {
  return (
    <div className="services-container">
      <div className="services-main">
        {/* Header */}
        <div className="services-header">
          <h1 className="services-title">Vaccination</h1>
          <p className="services-subtitle">
            Protégez-vous et protégez vos proches grâce à nos services de vaccination. 
            Notre équipe de pharmaciens qualifiés vous accompagne dans votre parcours de prévention.
          </p>
        </div>

        {/* Vaccins disponibles */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">💉</span>
            </div>
            Vaccins Disponibles
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🦠</span>
                <h3 className="services-card-title">Grippe Saisonnière</h3>
              </div>
              <div className="services-card-content">
                <p>Vaccination antigrippale pour toutes les personnes de plus de 18 ans. 
                Recommandée particulièrement aux personnes à risque et aux professionnels de santé.</p>
                <ul className="services-list">
                  <li className="services-list-item">Disponible d'octobre à février</li>
                  <li className="services-list-item">Prise en charge possible par l'Assurance Maladie</li>
                  <li className="services-list-item">Sur rendez-vous ou sans rendez-vous</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">💊</span>
                <h3 className="services-card-title">COVID-19</h3>
              </div>
              <div className="services-card-content">
                <p>Vaccination et rappels COVID-19 selon les recommandations officielles. 
                Adaptée aux différents variants et tranches d'âge.</p>
                <ul className="services-list">
                  <li className="services-list-item">Primo-vaccination et rappels</li>
                  <li className="services-list-item">Conseils personnalisés selon votre profil</li>
                  <li className="services-list-item">Surveillance post-vaccinale</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🌍</span>
                <h3 className="services-card-title">Voyage International</h3>
              </div>
              <div className="services-card-content">
                <p>Conseils et vaccinations pour vos voyages à l'étranger. 
                Prévention adaptée selon votre destination.</p>
                <ul className="services-list">
                  <li className="services-list-item">Fièvre jaune, hépatites A et B</li>
                  <li className="services-list-item">Typhus, méningites</li>
                  <li className="services-list-item">Conseils 4-6 semaines avant le départ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Processus de vaccination */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">📋</span>
            </div>
            Comment se déroule la vaccination ?
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">1️⃣</span>
                <h3 className="services-card-title">Consultation</h3>
              </div>
              <div className="services-card-content">
                <p>Évaluation de votre état de santé, vérification des contre-indications et de votre carnet de vaccination.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">2️⃣</span>
                <h3 className="services-card-title">Information</h3>
              </div>
              <div className="services-card-content">
                <p>Explication du vaccin, de ses bénéfices et des possibles effets secondaires. Signature du consentement éclairé.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">3️⃣</span>
                <h3 className="services-card-title">Injection</h3>
              </div>
              <div className="services-card-content">
                <p>Administration du vaccin dans des conditions d'hygiène optimales avec surveillance immédiate post-injection.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations pratiques */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">ℹ️</span>
            </div>
            Informations Pratiques
          </h2>
          
          <div className="services-card">
            <div className="services-card-content">
              <div className="services-grid">
                <div>
                  <h4><strong>Qui peut se faire vacciner ?</strong></h4>
                  <ul className="services-list">
                    <li className="services-list-item">Personnes de plus de 18 ans</li>
                    <li className="services-list-item">Femmes enceintes (certains vaccins)</li>
                    <li className="services-list-item">Personnes immunodéprimées (sur avis médical)</li>
                  </ul>
                </div>
                <div>
                  <h4><strong>Documents à apporter :</strong></h4>
                  <ul className="services-list">
                    <li className="services-list-item">Carte Vitale</li>
                    <li className="services-list-item">Carnet de vaccination</li>
                    <li className="services-list-item">Prescription médicale si nécessaire</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="services-cta">
          <h2 className="services-cta-title">Prêt pour votre vaccination ?</h2>
          <p className="services-cta-text">
            Prenez rendez-vous ou venez directement à la pharmacie pour bénéficier de nos services de vaccination.
          </p>
          <button className="services-cta-button">
            Prendre rendez-vous
          </button>
        </div>

        {/* Informations importantes */}
        <div className="services-info">
          <h3 className="services-info-title">📞 Contact et Urgences</h3>
          <p className="services-info-text">
            Pour toute question sur la vaccination, appelez-nous au 04 91 79 78 54. 
            En cas d'effets secondaires importants, contactez votre médecin ou le 15.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Vaccination;
