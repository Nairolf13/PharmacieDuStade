import React from 'react';

function EntretiensPharmaceutiques() {
  return (
    <div className="services-container">
      {/* En-tête de la page */}
      <div className="services-header">
        <h1 className="services-title">Entretiens Pharmaceutiques</h1>
        <p className="services-subtitle">
          Un accompagnement personnalisé pour optimiser votre traitement médicamenteux
        </p>
      </div>

      {/* Section introduction */}
      <div className="services-content">
        <div className="services-section">
          <h2 className="services-section-title">Qu'est-ce qu'un entretien pharmaceutique ?</h2>
          <p className="services-text">
            L'entretien pharmaceutique est un moment privilégié d'échange entre vous et votre pharmacien. 
            Il s'agit d'un service personnalisé qui vous permet de mieux comprendre votre traitement, 
            d'optimiser son efficacité et de prévenir les risques liés aux médicaments.
          </p>
        </div>

        {/* Section objectifs */}
        <div className="services-section">
          <h2 className="services-section-title">Nos objectifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="services-card">
              <h3 className="services-card-title">Améliorer l'observance</h3>
              <p className="services-card-text">
                Vous aider à bien prendre vos médicaments selon les prescriptions médicales
              </p>
            </div>
            <div className="services-card">
              <h3 className="services-card-title">Prévenir les interactions</h3>
              <p className="services-card-text">
                Identifier et éviter les interactions médicamenteuses dangereuses
              </p>
            </div>
            <div className="services-card">
              <h3 className="services-card-title">Optimiser l'efficacité</h3>
              <p className="services-card-text">
                Maximiser les bénéfices de votre traitement pour votre santé
              </p>
            </div>
            <div className="services-card">
              <h3 className="services-card-title">Réduire les effets indésirables</h3>
              <p className="services-card-text">
                Minimiser les risques d'effets secondaires et gérer ceux existants
              </p>
            </div>
          </div>
        </div>

        {/* Section pour qui */}
        <div className="services-section">
          <h2 className="services-section-title">À qui s'adressent nos entretiens ?</h2>
          <div className="services-info-box">
            <h3 className="services-info-title">Entretiens particulièrement recommandés pour :</h3>
            <ul className="services-list">
              <li>Patients sous anticoagulants oraux (AVK, AOD)</li>
              <li>Personnes asthmatiques utilisant des dispositifs d'inhalation</li>
              <li>Patients diabétiques sous insuline</li>
              <li>Personnes âgées de plus de 65 ans avec polymédication</li>
              <li>Patients en sortie d'hospitalisation</li>
              <li>Personnes ayant des difficultés d'observance</li>
              <li>Patients souhaitant mieux comprendre leur traitement</li>
            </ul>
          </div>
        </div>

        {/* Section déroulement */}
        <div className="services-section">
          <h2 className="services-section-title">Comment se déroule un entretien ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="services-step">
              <div className="services-step-number">1</div>
              <h3 className="services-step-title">Prise de rendez-vous</h3>
              <p className="services-step-text">
                Planification d'un créneau dédié de 15 à 30 minutes en toute confidentialité
              </p>
            </div>
            <div className="services-step">
              <div className="services-step-number">2</div>
              <h3 className="services-step-title">Échange personnalisé</h3>
              <p className="services-step-text">
                Discussion approfondie sur vos traitements, habitudes et difficultés rencontrées
              </p>
            </div>
            <div className="services-step">
              <div className="services-step-number">3</div>
              <h3 className="services-step-title">Plan d'action</h3>
              <p className="services-step-text">
                Établissement d'un plan personnalisé avec conseils pratiques et suivi
              </p>
            </div>
          </div>
        </div>

        {/* Section thèmes abordés */}
        <div className="services-section">
          <h2 className="services-section-title">Thèmes abordés lors de l'entretien</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="services-subsection-title">Gestion des médicaments</h3>
              <ul className="services-list">
                <li>Mode d'administration correct</li>
                <li>Horaires de prise optimal</li>
                <li>Conservation des médicaments</li>
                <li>Que faire en cas d'oubli</li>
              </ul>
            </div>
            <div>
              <h3 className="services-subsection-title">Suivi et surveillance</h3>
              <ul className="services-list">
                <li>Paramètres à surveiller</li>
                <li>Signes d'alerte à connaître</li>
                <li>Examens biologiques nécessaires</li>
                <li>Coordination avec les autres professionnels</li>
              </ul>
            </div>
            <div>
              <h3 className="services-subsection-title">Hygiène de vie</h3>
              <ul className="services-list">
                <li>Alimentation et médicaments</li>
                <li>Interactions avec l'alcool</li>
                <li>Activité physique adaptée</li>
                <li>Gestion du stress</li>
              </ul>
            </div>
            <div>
              <h3 className="services-subsection-title">Prévention</h3>
              <ul className="services-list">
                <li>Vaccination adaptée</li>
                <li>Dépistages recommandés</li>
                <li>Mesures d'hygiène</li>
                <li>Facteurs de risque à éviter</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section outils */}
        <div className="services-section">
          <h2 className="services-section-title">Outils et supports fournis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="services-tool">
              <h4 className="services-tool-title">Pilulier personnalisé</h4>
              <p className="services-tool-text">Organisation optimale de vos prises</p>
            </div>
            <div className="services-tool">
              <h4 className="services-tool-title">Fiches conseils</h4>
              <p className="services-tool-text">Informations détaillées sur vos médicaments</p>
            </div>
            <div className="services-tool">
              <h4 className="services-tool-title">Carnet de suivi</h4>
              <p className="services-tool-text">Suivi de vos paramètres et observations</p>
            </div>
            <div className="services-tool">
              <h4 className="services-tool-title">Aide-mémoire</h4>
              <p className="services-tool-text">Rappels visuels pour votre traitement</p>
            </div>
          </div>
        </div>

        {/* Section avantages */}
        <div className="services-section">
          <h2 className="services-section-title">Les bénéfices pour votre santé</h2>
          <div className="services-highlight">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="services-benefit-icon">📈</div>
                <h3 className="services-benefit-title">Efficacité accrue</h3>
                <p className="services-benefit-text">Meilleure réponse au traitement</p>
              </div>
              <div className="text-center">
                <div className="services-benefit-icon">🛡️</div>
                <h3 className="services-benefit-title">Sécurité renforcée</h3>
                <p className="services-benefit-text">Réduction des risques médicamenteux</p>
              </div>
              <div className="text-center">
                <div className="services-benefit-icon">💰</div>
                <h3 className="services-benefit-title">Économies</h3>
                <p className="services-benefit-text">Éviter le gaspillage et les complications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section informations pratiques */}
        <div className="services-section">
          <h2 className="services-section-title">Informations pratiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="services-info-box">
              <h3 className="services-info-title">Tarifs et remboursement</h3>
              <ul className="services-list">
                <li>Service gratuit pour les patients éligibles</li>
                <li>Pris en charge par l'Assurance Maladie</li>
                <li>Aucun dépassement d'honoraires</li>
                <li>Possible sur prescription médicale</li>
              </ul>
            </div>
            <div className="services-info-box">
              <h3 className="services-info-title">Planning et disponibilité</h3>
              <ul className="services-list">
                <li>Sur rendez-vous uniquement</li>
                <li>Durée : 15 à 45 minutes selon les besoins</li>
                <li>Suivi régulier possible</li>
                <li>Urgences accommodées selon disponibilité</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section contact */}
        <div className="services-cta">
          <h2 className="services-cta-title">Prenez rendez-vous pour votre entretien pharmaceutique</h2>
          <p className="services-cta-text">
            Nos pharmaciens sont à votre disposition pour vous accompagner dans la gestion de vos traitements. 
            Un entretien peut considérablement améliorer l'efficacité de votre thérapie.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="services-contact-method">
              <h3 className="services-contact-title">Par téléphone</h3>
              <p className="services-contact-info">04 XX XX XX XX</p>
              <p className="services-contact-hours">Lun-Sam : 8h30-19h30</p>
            </div>
            <div className="services-contact-method">
              <h3 className="services-contact-title">Sur place</h3>
              <p className="services-contact-info">Directement à la pharmacie</p>
              <p className="services-contact-hours">Prise de RDV au comptoir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntretiensPharmaceutiques;
