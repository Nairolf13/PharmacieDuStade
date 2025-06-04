import React from 'react';

function MaterielMedical() {
  return (
    <div className="services-container">
      <div className="services-main">
        {/* Header */}
        <div className="services-header">
          <h1 className="services-title">Matériel Médical</h1>
          <p className="services-subtitle">
            Découvrez notre gamme complète de matériel médical de qualité. 
            Nous vous accompagnons dans le choix et l'utilisation de vos équipements de santé.
          </p>
        </div>

        {/* Catégories de matériel */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">🔧</span>
            </div>
            Notre Gamme de Matériel
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🩺</span>
                <h3 className="services-card-title">Diagnostic & Contrôle</h3>
              </div>
              <div className="services-card-content">
                <p>Appareils de mesure pour surveiller votre santé au quotidien avec précision et fiabilité.</p>
                <ul className="services-list">
                  <li className="services-list-item">Tensiomètres électroniques et manuels</li>
                  <li className="services-list-item">Thermomètres frontaux et auriculaires</li>
                  <li className="services-list-item">Oxymètres de pouls</li>
                  <li className="services-list-item">Pèse-personnes électroniques</li>
                  <li className="services-list-item">Stéthoscopes</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🩹</span>
                <h3 className="services-card-title">Soins & Pansements</h3>
              </div>
              <div className="services-card-content">
                <p>Matériel de soins pour traiter les blessures et assurer une cicatrisation optimale.</p>
                <ul className="services-list">
                  <li className="services-list-item">Pansements adhésifs et hydrocolloïdes</li>
                  <li className="services-list-item">Compresses stériles et non stériles</li>
                  <li className="services-list-item">Bandes de contention et élastiques</li>
                  <li className="services-list-item">Antiseptiques et désinfectants</li>
                  <li className="services-list-item">Matériel de suture</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">♿</span>
                <h3 className="services-card-title">Mobilité & Confort</h3>
              </div>
              <div className="services-card-content">
                <p>Équipements pour améliorer votre mobilité et votre confort au quotidien.</p>
                <ul className="services-list">
                  <li className="services-list-item">Cannes, déambulateurs et béquilles</li>
                  <li className="services-list-item">Fauteuils roulants manuels et électriques</li>
                  <li className="services-list-item">Coussins et matelas anti-escarres</li>
                  <li className="services-list-item">Barres d'appui et sièges de douche</li>
                  <li className="services-list-item">Chaussures thérapeutiques</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">💉</span>
                <h3 className="services-card-title">Diabète & Autocontrôle</h3>
              </div>
              <div className="services-card-content">
                <p>Matériel spécialisé pour la gestion et le suivi du diabète.</p>
                <ul className="services-list">
                  <li className="services-list-item">Lecteurs de glycémie et bandelettes</li>
                  <li className="services-list-item">Stylos à insuline et aiguilles</li>
                  <li className="services-list-item">Lancettes et autopiqueurs</li>
                  <li className="services-list-item">Carnets de suivi glycémique</li>
                  <li className="services-list-item">Capteurs de glucose en continu</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🫁</span>
                <h3 className="services-card-title">Respiratoire</h3>
              </div>
              <div className="services-card-content">
                <p>Appareils pour améliorer et surveiller votre fonction respiratoire.</p>
                <ul className="services-list">
                  <li className="services-list-item">Nébuliseurs et aérosol-doseurs</li>
                  <li className="services-list-item">Chambres d'inhalation</li>
                  <li className="services-list-item">Concentrateurs d'oxygène</li>
                  <li className="services-list-item">Appareils CPAP pour l'apnée du sommeil</li>
                  <li className="services-list-item">Peak flow meters</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🏠</span>
                <h3 className="services-card-title">Maintien à Domicile</h3>
              </div>
              <div className="services-card-content">
                <p>Solutions pour faciliter la vie quotidienne et l'autonomie à domicile.</p>
                <ul className="services-list">
                  <li className="services-list-item">Lits médicalisés électriques</li>
                  <li className="services-list-item">Tables de lit et potences</li>
                  <li className="services-list-item">Soulève-malades et sangles de transfert</li>
                  <li className="services-list-item">Bassins et urinaux</li>
                  <li className="services-list-item">Téléassistance et alarmes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Services associés */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">🛠️</span>
            </div>
            Nos Services
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">📏</span>
                <h3 className="services-card-title">Prise de Mesures</h3>
              </div>
              <div className="services-card-content">
                <p>Prise de mesures personnalisées pour les orthèses, attelles et équipements sur mesure.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🎓</span>
                <h3 className="services-card-title">Formation & Conseils</h3>
              </div>
              <div className="services-card-content">
                <p>Formation à l'utilisation de votre matériel et conseils d'entretien pour optimiser sa durée de vie.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🔧</span>
                <h3 className="services-card-title">Maintenance & SAV</h3>
              </div>
              <div className="services-card-content">
                <p>Service après-vente, maintenance préventive et réparations pour garantir le bon fonctionnement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">📅</span>
            </div>
            Location de Matériel
          </h2>
          
          <div className="services-card">
            <div className="services-card-content">
              <p>
                <strong>Service de location pour des besoins temporaires :</strong>
              </p>
              <div className="services-grid">
                <div>
                  <h4>Matériel disponible en location :</h4>
                  <ul className="services-list">
                    <li className="services-list-item">Fauteuils roulants</li>
                    <li className="services-list-item">Béquilles et déambulateurs</li>
                    <li className="services-list-item">Lits médicalisés</li>
                    <li className="services-list-item">Concentrateurs d'oxygène</li>
                  </ul>
                </div>
                <div>
                  <h4>Avantages :</h4>
                  <ul className="services-list">
                    <li className="services-list-item">Prise en charge possible par l'Assurance Maladie</li>
                    <li className="services-list-item">Livraison et installation à domicile</li>
                    <li className="services-list-item">Maintenance incluse</li>
                    <li className="services-list-item">Échange possible en cas de problème</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="services-cta">
          <h2 className="services-cta-title">Besoin de conseils pour votre matériel médical ?</h2>
          <p className="services-cta-text">
            Notre équipe vous accompagne dans le choix du matériel adapté à vos besoins. 
            N'hésitez pas à nous consulter pour un conseil personnalisé.
          </p>
          <button className="services-cta-button">
            Prendre rendez-vous
          </button>
        </div>

        {/* Informations importantes */}
        <div className="services-warning">
          <h3 className="services-warning-title">⚠️ Important</h3>
          <p className="services-warning-text">
            Certains équipements nécessitent une prescription médicale. 
            Pensez à vous munir de votre ordonnance et de votre carte Vitale.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MaterielMedical;
