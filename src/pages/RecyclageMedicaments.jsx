import React from 'react';

function RecyclageMedicaments() {
  return (
    <div className="services-container">
      <div className="services-main">
        <div className="services-header">
          <h1 className="services-title">Recyclage des Médicaments</h1>
          <p className="services-subtitle">
            Participez à la protection de l'environnement en rapportant vos médicaments non utilisés. 
            Un geste simple pour un impact écologique positif.
          </p>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">🌍</span>
            </div>
            Pourquoi Recycler vos Médicaments ?
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🌱</span>
                <h3 className="services-card-title">Protection de l'Environnement</h3>
              </div>
              <div className="services-card-content">
                <p>Les médicaments jetés dans les poubelles ou éviers contaminent sols et eaux. 
                Le recyclage évite cette pollution et protège la faune aquatique.</p>
                <ul className="services-list">
                  <li className="services-list-item">Prévention de la pollution des eaux</li>
                  <li className="services-list-item">Protection de la biodiversité</li>
                  <li className="services-list-item">Réduction des déchets dangereux</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🔒</span>
                <h3 className="services-card-title">Sécurité Sanitaire</h3>
              </div>
              <div className="services-card-content">
                <p>Éviter les accidents domestiques et l'utilisation inappropriée de médicaments périmés.</p>
                <ul className="services-list">
                  <li className="services-list-item">Prévention des intoxications accidentelles</li>
                  <li className="services-list-item">Éviter l'automédication dangereuse</li>
                  <li className="services-list-item">Protection des enfants et personnes vulnérables</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">⚡</span>
                <h3 className="services-card-title">Valorisation Énergétique</h3>
              </div>
              <div className="services-card-content">
                <p>Les médicaments collectés sont incinérés dans des conditions contrôlées pour produire de l'énergie.</p>
                <ul className="services-list">
                  <li className="services-list-item">Incinération à haute température</li>
                  <li className="services-list-item">Production d'électricité et de chaleur</li>
                  <li className="services-list-item">Économie circulaire</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">📦</span>
            </div>
            Que Rapporter ?
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">✅</span>
                <h3 className="services-card-title">À Rapporter</h3>
              </div>
              <div className="services-card-content">
                <ul className="services-list">
                  <li className="services-list-item">Médicaments périmés ou non utilisés</li>
                  <li className="services-list-item">Comprimés, gélules, sirops</li>
                  <li className="services-list-item">Ampoules, flacons entamés</li>
                  <li className="services-list-item">Inhalateurs, aérosols</li>
                  <li className="services-list-item">Crèmes, pommades, collyres</li>
                  <li className="services-list-item">Médicaments vétérinaires</li>
                  <li className="services-list-item">Emballages vides (cartons, notices)</li>
                </ul>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">❌</span>
                <h3 className="services-card-title">Ne Pas Rapporter</h3>
              </div>
              <div className="services-card-content">
                <ul className="services-list">
                  <li className="services-list-item">Seringues et aiguilles</li>
                  <li className="services-list-item">Produits chimiques de laboratoire</li>
                  <li className="services-list-item">Produits vétérinaires toxiques</li>
                  <li className="services-list-item">Radiographies</li>
                  <li className="services-list-item">Prothèses et dispositifs médicaux</li>
                  <li className="services-list-item">Cosmétiques et produits d'hygiène</li>
                </ul>
                <div className="services-info">
                  <p><strong>Pour ces déchets :</strong> Contactez votre mairie ou déchetterie.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">📋</span>
            </div>
            Comment Procéder ?
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">1️⃣</span>
                <h3 className="services-card-title">Préparation</h3>
              </div>
              <div className="services-card-content">
                <p>Rassemblez vos médicaments non utilisés dans un sac plastique. 
                Vous pouvez conserver les emballages cartonnés et notices.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">2️⃣</span>
                <h3 className="services-card-title">Apport en Pharmacie</h3>
              </div>
              <div className="services-card-content">
                <p>Déposez vos médicaments dans notre boîte CYCLAMED à l'accueil. 
                Service gratuit, aucune obligation d'achat.</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">3️⃣</span>
                <h3 className="services-card-title">Collecte & Traitement</h3>
              </div>
              <div className="services-card-content">
                <p>Nous assurons la collecte régulière vers les centres de traitement 
                spécialisés pour une valorisation énergétique.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">💡</span>
            </div>
            Conseils Pratiques
          </h2>
          
          <div className="services-card">
            <div className="services-card-content">
              <div className="services-grid">
                <div>
                  <h4><strong>Bonnes Pratiques :</strong></h4>
                  <ul className="services-list">
                    <li className="services-list-item">Vérifiez régulièrement vos armoires à pharmacie</li>
                    <li className="services-list-item">Respectez les dates de péremption</li>
                    <li className="services-list-item">Ne donnez jamais vos médicaments à d'autres personnes</li>
                    <li className="services-list-item">Conservez les médicaments dans leur emballage d'origine</li>
                  </ul>
                </div>
                <div>
                  <h4><strong>Conservation :</strong></h4>
                  <ul className="services-list">
                    <li className="services-list-item">Stockage à l'abri de la lumière et de l'humidité</li>
                    <li className="services-list-item">Température contrôlée selon les indications</li>
                    <li className="services-list-item">Hors de portée des enfants</li>
                    <li className="services-list-item">Vérification périodique des dates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">📊</span>
            </div>
            CYCLAMED en Chiffres
          </h2>
          
          <div className="services-grid">
            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🏭</span>
                <h3 className="services-card-title">12 000 tonnes</h3>
              </div>
              <div className="services-card-content">
                <p>de médicaments collectés chaque année en France</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">🏪</span>
                <h3 className="services-card-title">21 000 pharmacies</h3>
              </div>
              <div className="services-card-content">
                <p>participent au réseau de collecte CYCLAMED</p>
              </div>
            </div>

            <div className="services-card">
              <div className="services-card-header">
                <span className="services-card-icon">⚡</span>
                <h3 className="services-card-title">9 millions kWh</h3>
              </div>
              <div className="services-card-content">
                <p>d'énergie produite par la valorisation énergétique</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services-cta">
          <h2 className="services-cta-title">Agissez pour l'Environnement</h2>
          <p className="services-cta-text">
            Chaque médicament rapporté compte ! Rejoignez le mouvement CYCLAMED 
            et contribuez à la protection de notre environnement.
          </p>
          <button className="services-cta-button">
            En savoir plus sur CYCLAMED
          </button>
        </div>

        <div className="services-info">
          <h3 className="services-info-title">📍 Point de Collecte</h3>
          <p className="services-info-text">
            Notre pharmacie est un point de collecte officiel CYCLAMED. 
            Boîte de dépôt disponible aux heures d'ouverture, service gratuit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecyclageMedicaments;
