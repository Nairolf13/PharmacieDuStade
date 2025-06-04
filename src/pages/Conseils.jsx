import React from 'react';

function Conseils() {
  return (
    <div className="services-container">
      <div className="services-main">
        {/* Header */}
        <div className="services-header">
          <h1 className="services-title">Conseils Santé</h1>
          <p className="services-subtitle">
            Nos pharmaciens sont là pour vous accompagner et vous conseiller au quotidien.
            Retrouvez ici nos conseils d'experts pour prendre soin de votre santé.
          </p>
        </div>

        {/* Section principale */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">💡</span>
            </div>
            Nos Domaines d'Expertise
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🩺</span>
                <h3 className="services-card-title">Conseils Thérapeutiques</h3>
              </div>
              <div className="services-card-content">
                <p>Accompagnement personnalisé pour l'observance de vos traitements, 
                gestion des effets secondaires et optimisation de votre thérapie.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🌿</span>
                <h3 className="services-card-title">Phytothérapie</h3>
              </div>
              <div className="services-card-content">
                <p>Conseils en médecines naturelles, aromathérapie et compléments 
                alimentaires pour une approche douce de votre bien-être.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">👶</span>
                <h3 className="services-card-title">Santé Familiale</h3>
              </div>
              <div className="services-card-content">
                <p>Accompagnement des familles : pédiatrie, grossesse, allaitement 
                et conseils adaptés à chaque âge de la vie.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">💪</span>
                <h3 className="services-card-title">Prévention</h3>
              </div>
              <div className="services-card-content">
                <p>Dépistage, vaccination, conseils nutritionnels et hygiène de vie 
                pour préserver votre capital santé.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="services-cta">
          <h2 className="services-cta-title">Besoin d'un conseil personnalisé ?</h2>
          <p className="services-cta-text">
            Notre équipe de pharmaciens est disponible pour répondre à toutes vos questions
          </p>
          <button className="services-cta-button">
            Prendre rendez-vous
          </button>
        </div>

        {/* Informations importantes */}
        <div className="services-info">
          <h3 className="services-info-title">📞 Contact direct</h3>
          <p className="services-info-text">
            Pour un conseil urgent, n'hésitez pas à nous appeler au 04 91 79 78 54. 
            Nos pharmaciens sont disponibles pendant nos heures d'ouverture.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Conseils;
