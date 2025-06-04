import React, { useRef, useState, useEffect } from 'react';
import { 
  Viewer, 
  Ion, 
  Cartesian3, 
  Cartesian2, 
  Color, 
  LabelStyle, 
  VerticalOrigin 
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESS_TOKEN;

if (!import.meta.env.VITE_CESIUM_ACCESS_TOKEN) {
  console.warn('Cesium Ion access token is not set. Please configure VITE_CESIUM_ACCESS_TOKEN in your environment variables.');
}

window.CESIUM_BASE_URL = '/cesium';

function Accueil() {
  const cesiumContainer = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [viewer, setViewer] = useState(null);
  const [routeVisible, setRouteVisible] = useState(false);

  const pharmacyCoords = {
    longitude: 5.4204846,
    latitude: 43.2777243
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          if (viewer) {
            viewer.entities.add({
              position: Cartesian3.fromDegrees(userCoords.longitude, userCoords.latitude),
              point: {
                pixelSize: 12,
                color: Color.BLUE,
              },
              label: {
                text: 'Votre position',
                font: '12pt sans-serif',
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -20),
              },
            });

            viewer.camera.flyTo({
              destination: Cartesian3.fromDegrees(
                (userCoords.longitude + pharmacyCoords.longitude) / 2,
                (userCoords.latitude + pharmacyCoords.latitude) / 2,
                2000
              ),
            });
          }
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert('Impossible d\'obtenir votre position. Veuillez autoriser la géolocalisation.');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  };

  const showRoute = async () => {
    if (!userLocation || !viewer) {
      alert('Veuillez d\'abord obtenir votre position.');
      return;
    }

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLocation.longitude},${userLocation.latitude};${pharmacyCoords.longitude},${pharmacyCoords.latitude}?overview=full&geometries=geojson`
      );
      
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates;
        
        const positions = [];
        coordinates.forEach(coord => {
          positions.push(coord[0], coord[1], 0); 
        });

        viewer.entities.add({
          polyline: {
            positions: Cartesian3.fromDegreesArray(positions),
            width: 8,
            material: Color.ORANGE.withAlpha(0.8),
            clampToGround: true,
          },
        });

        setRouteVisible(true);
        
        const distance = (route.distance / 1000).toFixed(1);
        const duration = Math.round(route.duration / 60);
        alert(`Itinéraire calculé:\nDistance: ${distance} km\nDurée estimée: ${duration} minutes`);
      }
    } catch (error) {
      console.error('Erreur lors du calcul de l\'itinéraire:', error);
      alert('Impossible de calculer l\'itinéraire. Veuillez réessayer.');
    }
  };

  const clearRoute = () => {
    if (viewer) {
      const entities = viewer.entities.values;
      for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i];
        if (entity.polyline || (entity.label && entity.label.text._value === 'Votre position')) {
          viewer.entities.remove(entity);
        }
      }
      setRouteVisible(false);
      setUserLocation(null);
    }
  };

  useEffect(() => {
    console.log('Accueil component mounted');
    let viewer;
    const container = cesiumContainer.current;

    const initializeViewer = async () => {
      if (container && !container.viewerInitialized) {
        console.log('Initializing Cesium Viewer');
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        try {
          viewer = new Viewer(container, {
            animation: false,
            timeline: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            selectionIndicator: false,
            navigationHelpButton: false,
            navigationInstructionsInitiallyVisible: false
          });

          viewer.scene.globe.enableLighting = false;
          viewer.scene.globe.show = true;
          viewer.scene.skyBox.show = false;
          viewer.scene.backgroundColor = new Color(0.48, 0.51, 0.56, 1.0);

          viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(5.4204846, 43.2777243, 100),
          });

          viewer.entities.add({
            position: Cartesian3.fromDegrees(5.4204846, 43.2777243),
            point: {
              pixelSize: 10,
              color: Color.RED,
            },
            label: {
              text: 'Pharmacie DU STADE',
              font: '14pt sans-serif',
              style: LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              verticalOrigin: VerticalOrigin.BOTTOM,
              pixelOffset: new Cartesian2(0, -20),
            },
          });

          container.viewerInitialized = true;
          setViewer(viewer);
          console.log('Cesium Viewer initialized');
        } catch (error) {
          console.error('Error initializing Cesium viewer:', error);
        }
      }
    };

    initializeViewer();

    return () => {
      console.log('Accueil component unmounted');
      if (viewer) {
        console.log('Destroying Cesium Viewer');
        viewer.destroy();
        viewer = null;
        if (container) {
          container.viewerInitialized = false;
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <section className="accueil-hero">
        <div className="w-full px-2 sm:px-3 lg:px-4">
          <div className="text-center fade-in-up">
            <div className="mb-8">
              <img 
                src="./assets/imgs/pharma.webp" 
                alt="Pharmacie du Stade" 
                className="accueil-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-2 sm:px-3 lg:px-4 pb-6 sm:pb-8 lg:pb-12">
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

        {/* Main Content Grid */}
        <div className="accueil-main-grid">
          {/* Hours Section */}
          <div className="accueil-hours-section">
            <div className="accueil-hours-header">
              <div className="accueil-hours-icon">
                <span className="text-2xl">🕒</span>
              </div>
              <h2 className="accueil-hours-title">Horaires d'Ouverture</h2>
            </div>
            <div className="accueil-hours-list">
              {[
                { day: 'Lundi', hours: '09:00 – 12:30 | 14:30 – 19:30', isToday: false },
                { day: 'Mardi', hours: '09:00 – 12:30 | 14:30 – 19:30', isToday: false },
                { day: 'Mercredi', hours: '09:00 – 12:30 | 14:30 – 19:30', isToday: true },
                { day: 'Jeudi', hours: '09:00 – 12:30 | 14:30 – 19:30', isToday: false },
                { day: 'Vendredi', hours: '09:00 – 12:30 | 14:30 – 19:30', isToday: false },
                { day: 'Samedi', hours: '09:00 – 12:30', isToday: false },
                { day: 'Dimanche', hours: 'Consulter les gardes', isToday: false },
              ].map((item, index) => (
                <div key={index} className={`accueil-hours-item ${item.isToday ? 'today' : ''}`}>
                  <span className={`accueil-hours-day ${item.isToday ? 'today' : ''}`}>
                    {item.day}
                  </span>
                  <span className={`accueil-hours-time ${item.isToday ? 'today' : ''}`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="accueil-services-section">
            <div className="accueil-services-header">
              <div className="accueil-services-icon">
                <span className="text-2xl text-white">🏥</span>
              </div>
              <h2 className="accueil-services-title">Nos Services</h2>
            </div>
            <div className="accueil-services-list">
              {[
                { icon: '💬', title: 'Entretiens pharmaceutiques', desc: 'Conseils personnalisés sur vos traitements' },
                { icon: '💉', title: 'Vaccination', desc: 'Services de vaccination pour vous protéger' },
                { icon: '🔧', title: 'Matériel médical', desc: 'Gamme complète adaptée à vos besoins' },
                { icon: '♻️', title: 'Recyclage médicaments', desc: 'Recyclage responsable de vos médicaments' },
                { icon: '📞', title: 'Numéros utiles', desc: 'Contacts essentiels pour votre santé' },
                { icon: '💡', title: 'Conseils experts', desc: 'Notre équipe à votre écoute' },
              ].map((service, index) => (
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
        </div>

        {/* Map Section */}
        <div className="accueil-map-section">
          <div className="accueil-map-header">
            <div className="accueil-map-icon">
              <span className="text-2xl text-white">🗺️</span>
            </div>
            <h2 className="accueil-map-title">Localisation & Itinéraire</h2>
          </div>
          
          <div className="accueil-map-buttons">
            <button
              onClick={getUserLocation}
              className="btn-primary flex items-center gap-2"
            >
              <span className="text-lg">📍</span>
              Ma position
            </button>
            
            {userLocation && (
              <button
                onClick={showRoute}
                disabled={routeVisible}
                className={`font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  routeVisible 
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                    : 'btn-secondary'
                }`}
              >
                <span className="text-lg">🗺️</span>
                Itinéraire
              </button>
            )}
            
            {routeVisible && (
              <button
                onClick={clearRoute}
                className="btn-danger flex items-center gap-2"
              >
                <span className="text-lg">🗑️</span>
                Effacer
              </button>
            )}
          </div>
          
          <div ref={cesiumContainer} className="accueil-map-container"></div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
