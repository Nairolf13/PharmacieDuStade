import React from 'react';

function NumerosUtiles() {
  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">Numéros Utiles</h1>
        <p className="services-subtitle">
          Tous les contacts essentiels pour votre santé et vos urgences
        </p>
      </div>

      <div className="services-content">
        <div className="services-section">
          <h2 className="services-section-title">Numéros d'urgence</h2>
          <div className="services-warning">
            <p><strong>En cas d'urgence vitale, appelez immédiatement le 15 (SAMU) ou le 112</strong></p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="services-card emergency-card">
              <div className="emergency-number">15</div>
              <h3 className="services-card-title">SAMU</h3>
              <p className="services-card-text">
                Service d'Aide Médicale Urgente<br/>
                <strong>Urgences médicales</strong><br/>
                Malaises, détresses respiratoires, douleurs thoraciques
              </p>
            </div>
            
            <div className="services-card emergency-card">
              <div className="emergency-number">18</div>
              <h3 className="services-card-title">Pompiers</h3>
              <p className="services-card-text">
                Services de Secours<br/>
                <strong>Incendies, accidents, secours</strong><br/>
                Urgences avec intervention physique
              </p>
            </div>
            
            <div className="services-card emergency-card">
              <div className="emergency-number">112</div>
              <h3 className="services-card-title">Numéro d'urgence européen</h3>
              <p className="services-card-text">
                <strong>Toutes urgences</strong><br/>
                Depuis un portable ou depuis l'étranger<br/>
                Fonctionne dans toute l'Europe
              </p>
            </div>
            
            <div className="services-card emergency-card">
              <div className="emergency-number">17</div>
              <h3 className="services-card-title">Police / Gendarmerie</h3>
              <p className="services-card-text">
                <strong>Urgences sécuritaires</strong><br/>
                Agressions, cambriolages, accidents de la route
              </p>
            </div>
            
            <div className="services-card emergency-card">
              <div className="emergency-number">196</div>
              <h3 className="services-card-title">Secours en mer</h3>
              <p className="services-card-text">
                <strong>CROSS</strong><br/>
                Centre Régional Opérationnel<br/>
                de Surveillance et de Sauvetage
              </p>
            </div>
            
            <div className="services-card emergency-card">
              <div className="emergency-number">191</div>
              <h3 className="services-card-title">Secours aéronautique</h3>
              <p className="services-card-text">
                <strong>Urgences aériennes</strong><br/>
                Accidents d'aéronefs<br/>
                Détresse aéronautique
              </p>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">Services de santé</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="services-card">
              <h3 className="services-card-title">🏥 SOS Médecins</h3>
              <div className="services-contact-info">
                <p><strong>04 91 52 91 52</strong></p>
                <p>Consultations d'urgence à domicile</p>
                <p className="text-sm text-gray-600">24h/24, 7j/7</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">💊 Pharmacies de garde</h3>
              <div className="services-contact-info">
                <p><strong>32 37</strong></p>
                <p>Informations pharmacies de garde</p>
                <p className="text-sm text-gray-600">Service automatique 24h/24</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">🦷 Urgences dentaires</h3>
              <div className="services-contact-info">
                <p><strong>04 91 54 99 68</strong></p>
                <p>Centre de garde dentaire</p>
                <p className="text-sm text-gray-600">Week-ends et jours fériés</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">🩺 Maison médicale de garde</h3>
              <div className="services-contact-info">
                <p><strong>04 13 42 72 33</strong></p>
                <p>Consultations sans rendez-vous</p>
                <p className="text-sm text-gray-600">Soirs, week-ends, jours fériés</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">Centres hospitaliers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="services-info-box">
              <h3 className="services-info-title">🏥 AP-HM - Hôpital Nord</h3>
              <div className="services-contact-details">
                <p><strong>Standard :</strong> 04 91 96 44 44</p>
                <p><strong>Urgences :</strong> 04 91 96 44 45</p>
                <p><strong>Adresse :</strong> Chemin des Bourrely, 13015 Marseille</p>
                <p><strong>Services :</strong> Urgences 24h/24, toutes spécialités, maternité niveau 3</p>
              </div>
            </div>
            
            <div className="services-info-box">
              <h3 className="services-info-title">🏥 Hôpital Européen Marseille</h3>
              <div className="services-contact-details">
                <p><strong>Standard :</strong> 04 13 42 70 00</p>
                <p><strong>Urgences :</strong> 04 13 42 72 33</p>
                <p><strong>Adresse :</strong> 6 Rue Désirée Clary, 13003 Marseille</p>
                <p><strong>Services :</strong> Urgences adultes 24h/24, cardiologie, chirurgie</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="services-info-box">
              <h3 className="services-info-title">🏥 Hôpital de la Timone (AP-HM)</h3>
              <div className="services-contact-details">
                <p><strong>Standard :</strong> 04 91 38 00 00</p>
                <p><strong>Urgences adultes :</strong> 04 91 38 56 41</p>
                <p><strong>Urgences pédiatriques :</strong> 04 91 38 68 25</p>
                <p><strong>Adresse :</strong> 264 Rue Saint-Pierre, 13005 Marseille</p>
                <p><strong>Services :</strong> Centre de traumatologie, neurologie, pédiatrie</p>
              </div>
            </div>
            
            <div className="services-info-box">
              <h3 className="services-info-title">🏥 Clinique Bouchard</h3>
              <div className="services-contact-details">
                <p><strong>Standard :</strong> 04 91 15 94 94</p>
                <p><strong>Urgences :</strong> 04 91 15 94 44</p>
                <p><strong>Adresse :</strong> 77 Rue du Dr Escat, 13006 Marseille</p>
                <p><strong>Services :</strong> Chirurgie, maternité, cardiologie</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">Services spécialisés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="services-card">
              <h3 className="services-card-title">🧠 SOS Amitié</h3>
              <div className="services-contact-info">
                <p><strong>09 72 39 40 50</strong></p>
                <p>Écoute, soutien psychologique</p>
                <p className="text-sm text-gray-600">24h/24, anonyme et gratuit</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">☎️ Suicide Écoute</h3>
              <div className="services-contact-info">
                <p><strong>01 45 39 40 00</strong></p>
                <p>Prévention du suicide</p>
                <p className="text-sm text-gray-600">24h/24, 7j/7</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">☁️ Drogues Info Service</h3>
              <div className="services-contact-info">
                <p><strong>0 800 23 13 13</strong></p>
                <p>Information sur les drogues</p>
                <p className="text-sm text-gray-600">7j/7, 8h-2h, gratuit</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">🍷 Alcool Info Service</h3>
              <div className="services-contact-info">
                <p><strong>0 980 980 930</strong></p>
                <p>Aide pour problèmes d'alcool</p>
                <p className="text-sm text-gray-600">7j/7, 8h-2h, gratuit</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">🚼 Allô Enfance Maltraitée</h3>
              <div className="services-contact-info">
                <p><strong>119</strong></p>
                <p>Protection de l'enfance</p>
                <p className="text-sm text-gray-600">24h/24, 7j/7, gratuit</p>
              </div>
            </div>
            
            <div className="services-card">
              <h3 className="services-card-title">👩 Violences Femmes Info</h3>
              <div className="services-contact-info">
                <p><strong>3919</strong></p>
                <p>Violences faites aux femmes</p>
                <p className="text-sm text-gray-600">Lun-Ven 9h-22h, Sam-Dim 9h-18h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">Centres antipoison et urgences toxicologiques à Marseille</h2>
          <div className="services-warning">
            <p><strong>En cas d'intoxication, appelez immédiatement un centre antipoison</strong></p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="services-info-box">
              <h3 className="services-info-title">☠️ Centre Antipoison Marseille</h3>
              <div className="services-contact-details">
                <p><strong>04 91 75 25 25</strong></p>
                <p>Hôpital Salvator</p>
                <p>249 Boulevard de Sainte-Marguerite, 13009 Marseille</p>
                <p>24h/24, 7j/7</p>
              </div>
            </div>
            
            <div className="services-info-box">
              <h3 className="services-info-title">☠️ Urgences Toxicologiques - Hôpital de la Timone</h3>
              <div className="services-contact-details">
                <p><strong>04 91 38 56 52</strong></p>
                <p>Service de Réanimation Médicale</p>
                <p>264 Rue Saint-Pierre, 13005 Marseille</p>
                <p>24h/24, 7j/7</p>
              </div>
            </div>
            
            <div className="services-info-box">
              <h3 className="services-info-title">☠️ Service des Urgences - Hôpital Nord</h3>
              <div className="services-contact-details">
                <p><strong>04 91 96 44 50</strong></p>
                <p>Prise en charge des intoxications</p>
                <p>Chemin des Bourrely, 13015 Marseille</p>
                <p>24h/24, 7j/7</p>
              </div>
            </div>
            
            <div className="services-info-box">
              <h3 className="services-info-title">☠️ SAMU de Marseille</h3>
              <div className="services-contact-details">
                <p><strong>15</strong> ou <strong>04 91 49 91 91</strong></p>
                <p>Régulation des urgences toxicologiques</p>
                <p>Coordination avec les centres antipoison</p>
                <p>24h/24, 7j/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">Conseils en cas d'urgence</h2>
          <div className="services-highlight">
            <h3 className="services-info-title">Avant d'appeler les secours :</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="services-subsection-title">🚨 Évaluez la situation</h4>
                <ul className="services-list">
                  <li>Y a-t-il un danger immédiat ?</li>
                  <li>La personne est-elle consciente ?</li>
                  <li>Y a-t-il des signes vitaux ?</li>
                  <li>Pouvez-vous décrire les symptômes ?</li>
                </ul>
              </div>
              <div>
                <h4 className="services-subsection-title">📞 Préparez l'appel</h4>
                <ul className="services-list">
                  <li>Votre nom et numéro de téléphone</li>
                  <li>L'adresse exacte de l'urgence</li>
                  <li>La nature du problème</li>
                  <li>Le nombre de personnes concernées</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="services-section-title">Informations importantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="services-info-box">
              <h3 className="services-info-title">📱 Applications utiles</h3>
              <ul className="services-list">
                <li><strong>SAUV Life :</strong> Alerte citoyens secouristes</li>
                <li><strong>Staying Alive :</strong> Localise défibrillateurs</li>
                <li><strong>SAIP :</strong> Alertes gouvernementales</li>
                <li><strong>permisdeconduire.ants.gouv.fr :</strong> Démarches permis</li>
              </ul>
            </div>
            
            <div className="services-info-box">
              <h3 className="services-info-title">⚠️ À retenir</h3>
              <ul className="services-list">
                <li>Gardez cette liste accessible</li>
                <li>Enregistrez les numéros d'urgence</li>
                <li>Tous les appels d'urgence sont gratuits</li>
                <li>Restez calme et suivez les instructions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="services-cta">
          <h2 className="services-cta-title">Notre pharmacie reste à votre disposition</h2>
          <p className="services-cta-text">
            Pour toute question concernant vos médicaments ou votre santé, n'hésitez pas à nous contacter.
            En cas d'urgence médicamenteuse en dehors de nos heures d'ouverture, contactez le 32 37 pour connaître 
            la pharmacie de garde la plus proche.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="services-contact-method">
              <h3 className="services-contact-title">📞 Notre numéro</h3>
              <p className="services-contact-info">04 91 79 78 54</p>
              <p className="services-contact-hours">Lun-Sam : 8h30-19h30</p>
            </div>
            <div className="services-contact-method">
              <h3 className="services-contact-title">🏪 Pharmacies de garde</h3>
              <p className="services-contact-info">32 37 (service automatique)</p>
              <p className="services-contact-hours">Informations 24h/24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumerosUtiles;
