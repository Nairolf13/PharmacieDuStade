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
import Modal from './Modal';

function CesiumMap() {
  const cesiumContainer = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [viewer, setViewer] = useState(null);
  const [routeVisible, setRouteVisible] = useState(false);
  
  const [isGpsTracking, setIsGpsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [userEntity, setUserEntity] = useState(null);
  const [navigationActive, setNavigationActive] = useState(false);

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const navigationActiveRef = useRef(false);
  const watchIdRef = useRef(null);
  const viewerRef = useRef(null);

  const pharmacyCoords = {
    longitude: 5.4204846,
    latitude: 43.2777243
  };

  const showModal = (title, message, type = 'info') => {
    setModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: '',
      message: '',
      type: 'info'
    });
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
          
          if (viewer && viewer.entities) {
            try {
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

              if (viewer.camera) {
                viewer.camera.flyTo({
                  destination: Cartesian3.fromDegrees(
                    userCoords.longitude,
                    userCoords.latitude,
                    1000
                  ),
                });
              }
            } catch (error) {
              console.error('Erreur lors de l\'ajout de la position sur la carte:', error);
            }
          }
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          showModal('Erreur de géolocalisation', 'Impossible d\'obtenir votre position. Veuillez autoriser la géolocalisation.', 'error');
        }
      );
    } else {
      showModal('Géolocalisation non supportée', 'La géolocalisation n\'est pas supportée par ce navigateur.', 'error');
    }
  };

  // Fonction pour démarrer le suivi GPS en temps réel
  const startGpsTracking = (fromNavigation = false) => {
    if (!navigator.geolocation) {
      showModal('Géolocalisation non supportée', 'La géolocalisation n\'est pas supportée par ce navigateur.', 'error');
      return;
    }

    // Vérifier que le viewer est prêt avant de démarrer le GPS
    if (!viewer || viewer.isDestroyed() || !viewer.entities) {
      console.log("Le viewer n'est pas prêt pour le suivi GPS");
      setTimeout(() => startGpsTracking(fromNavigation), 1000);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000 
    };

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          speed: position.coords.speed
        };

        updateUserPosition(newCoords);
        setUserLocation(newCoords);
      },
      (error) => {
        console.error('Erreur GPS:', error);
        setIsGpsTracking(false);
        showModal('Erreur GPS', `Erreur GPS: ${error.message}`, 'error');
      },
      options
    );

    setWatchId(id);
    watchIdRef.current = id;
    setIsGpsTracking(true);
    
    // Ne pas afficher d'alerte si on vient de la navigation automatique
    if (!fromNavigation) {
      showModal('Suivi GPS', '🛰️ Suivi GPS activé ! Votre position se met à jour automatiquement.', 'success');
    }
  };

  const stopGpsTracking = () => {
    const currentWatchId = watchIdRef.current || watchId;
    if (currentWatchId !== null) {
      navigator.geolocation.clearWatch(currentWatchId);
      setWatchId(null);
      watchIdRef.current = null;
    }
    setIsGpsTracking(false);
    showModal('Suivi GPS', '📍 Suivi GPS désactivé', 'info');
  };

  // Fonction pour mettre à jour la position utilisateur en temps réel
  const updateUserPosition = (coords) => {
    if (!viewer || viewer.isDestroyed()) {
      console.log("Le viewer Cesium n'est pas encore prêt ou a été détruit");
      return;
    }
    
    if (!viewer.entities) {
      console.log("Les entités du viewer ne sont pas encore disponibles");
      return;
    }

    if (typeof viewer.entities.add !== 'function' || typeof viewer.entities.remove !== 'function') {
      console.log("Les méthodes d'entités ne sont pas encore disponibles");
      return;
    }

    try {
      if (userEntity && viewer.entities && !viewer.isDestroyed()) {
        try {
          viewer.entities.remove(userEntity);
        } catch (removeError) {
          console.log("Erreur lors de la suppression de l'entité utilisateur:", removeError);
        }
      }

      const newUserEntity = viewer.entities.add({
        name: 'user-position',
        position: Cartesian3.fromDegrees(coords.longitude, coords.latitude),
        label: {
          text: '🚗',
          font: '24pt sans-serif',
          style: LabelStyle.FILL_AND_OUTLINE,
          fillColor: Color.BLUE,
          outlineColor: Color.WHITE,
          outlineWidth: 3,
          verticalOrigin: VerticalOrigin.CENTER,
          pixelOffset: new Cartesian2(0, 0),
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        },
      });

      setUserEntity(newUserEntity);

      // Si navigation active, centrer la caméra sur l'utilisateur
      if (navigationActive && viewer.camera && typeof viewer.camera.flyTo === 'function') {
        viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(
            coords.longitude,
            coords.latitude,
            500 
          ),
          duration: 1.0
        });
      }

      // Vérifier si on est proche de la pharmacie
      const distance = calculateDistance(coords, pharmacyCoords);
      if (distance < 50) { // 50 mètres
        showModal('Arrivée', '🎯 Vous êtes arrivé à la pharmacie !', 'success');
        setNavigationActive(false);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la position:", error);
      if (error.message && error.message.includes('entities')) {
        console.log("Arrêt du GPS en raison d'erreurs répétées d'entités");
        setIsGpsTracking(false);
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId);
          setWatchId(null);
        }
      }
    }
  };

  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; 
    const φ1 = coord1.latitude * Math.PI/180;
    const φ2 = coord2.latitude * Math.PI/180;
    const Δφ = (coord2.latitude-coord1.latitude) * Math.PI/180;
    const Δλ = (coord2.longitude-coord1.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; 
  };

  const startNavigation = async () => {
    try {
      if (!viewer || viewer.isDestroyed() || !viewer.entities) {
        console.log("En attente de l'initialisation complète du viewer...");
        showModal('Chargement', 'Carte en cours de chargement, veuillez patienter...', 'info');
        setTimeout(() => startNavigation(), 1000);
        return;
      }
      
      if (!userLocation) {
        try {
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userCoords = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  accuracy: position.coords.accuracy
                };
                setUserLocation(userCoords); 
                resolve();
              },
              (geoError) => {
                console.error('Erreur de géolocalisation:', geoError);
                reject(geoError);
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
          });
        } catch (geoError) {
          console.error('Erreur de géolocalisation:', geoError);
          showModal('Erreur de géolocalisation', 'Impossible d\'obtenir votre position. Veuillez autoriser la géolocalisation.', 'error');
          return;
        }
      }
      
      if (!viewer || viewer.isDestroyed() || !viewer.entities) {
        console.log("Le viewer n'est plus disponible après la géolocalisation");
        showModal('Erreur', 'La carte n\'est plus disponible. Veuillez recharger la page.', 'error');
        return;
      }
      
      let currentUserLocation = userLocation;
      
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${currentUserLocation.longitude},${currentUserLocation.latitude};${pharmacyCoords.longitude},${pharmacyCoords.latitude}?overview=full&geometries=geojson`
        );
        
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates;
          
          // Conversion des coordonnées pour Cesium
          const positions = [];
          coordinates.forEach(coord => {
            positions.push(coord[0]); // longitude
            positions.push(coord[1]); // latitude
          });

          // Supprimer l'ancien itinéraire et la position statique s'ils existent
          if (routeVisible) {
            const entities = viewer.entities.values;
            for (let i = entities.length - 1; i >= 0; i--) {
              const entity = entities[i];
              if (entity.name && (entity.name === 'route' || entity.name === 'route-background')) {
                viewer.entities.remove(entity);
              }
            }
          }

          // Supprimer le point bleu de position statique pour la navigation
          const entities = viewer.entities.values;
          for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            // Supprimer le point bleu de "Ma position" (position statique)
            if (entity.label && entity.label.text && entity.label.text._value === 'Votre position') {
              viewer.entities.remove(entity);
            }
          }

          // Ajout du nouvel itinéraire avec arrière-plan blanc
          viewer.entities.add({
            name: 'route-background',
            polyline: {
              positions: Cartesian3.fromDegreesArray(positions),
              width: 10,
              material: Color.WHITE.withAlpha(0.6),
              clampToGround: true,
              show: true
            },
          });

          // Ajout de l'itinéraire principal en bleu
          viewer.entities.add({
            name: 'route',
            polyline: {
              positions: Cartesian3.fromDegreesArray(positions),
              width: 6,
              material: Color.BLUE.withAlpha(0.8),
              clampToGround: true,
              show: true
            },
          });

          setRouteVisible(true);
          
          const distance = (route.distance / 1000).toFixed(1);
          const duration = Math.round(route.duration / 60);
          
          setNavigationActive(true);
          navigationActiveRef.current = true; 
          startGpsTracking(true); 
          
          showModal('Navigation démarrée', `🧭 Navigation démarrée !\n📍 Distance: ${distance} km\n⏱️ Durée estimée: ${duration} minutes`, 'success');
        } else {
          showModal('Aucun itinéraire', 'Aucun itinéraire trouvé. Veuillez réessayer.', 'warning');
          return;
        }
      } catch (routeError) {
        console.error('Erreur lors du calcul de l\'itinéraire:', routeError);
        showModal('Erreur itinéraire', 'Impossible de calculer l\'itinéraire. Vérifiez votre connexion internet.', 'error');
        return;
      }
    } catch (error) {
      console.error('Erreur générale lors du démarrage de la navigation:', error);
      showModal('Erreur navigation', 'Erreur lors du démarrage de la navigation. Veuillez réessayer.', 'error');
      setNavigationActive(false);
      if (isGpsTracking) {
        stopGpsTracking();
      }
    }
  };

  const showRoute = async () => {
    if (!userLocation || !viewer || !viewer.entities) {
      showModal('Position requise', 'Veuillez d\'abord obtenir votre position.', 'warning');
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
          positions.push(coord[0]); 
          positions.push(coord[1]); 
        });

        console.log('Coordonnées converties:', positions.length, 'points');

        // Ajout du tracé de l'itinéraire
        try {
          viewer.entities.add({
            name: 'route',
            polyline: {
              positions: Cartesian3.fromDegreesArray(positions),
              width: 6,
              material: Color.BLUE.withAlpha(0.8),
              clampToGround: true,
              show: true
            },
          });

          viewer.entities.add({
            name: 'route-background',
            polyline: {
              positions: Cartesian3.fromDegreesArray(positions),
              width: 10,
              material: Color.WHITE.withAlpha(0.6),
              clampToGround: true,
              show: true
            },
          });

          // Zoom pour montrer l'itinéraire complet, mais seulement si on n'est pas en navigation
          if (viewer.camera && !navigationActive) {
            viewer.camera.flyTo({
              destination: Cartesian3.fromDegrees(
                (userLocation.longitude + pharmacyCoords.longitude) / 2,
                (userLocation.latitude + pharmacyCoords.latitude) / 2,
                Math.max(2000, route.distance * 1.5) 
              ),
            });
          }

          setRouteVisible(true);
          
          const distance = (route.distance / 1000).toFixed(1);
          const duration = Math.round(route.duration / 60);
          showModal('Itinéraire calculé', `✅ Itinéraire calculé\n📍 Distance: ${distance} km\n⏱️ Durée estimée: ${duration} minutes`, 'success');
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'itinéraire:', error);
          showModal('Erreur d\'affichage', 'Erreur lors de l\'affichage de l\'itinéraire.', 'error');
        }
      } else {
        showModal('Aucun itinéraire', 'Aucun itinéraire trouvé. Veuillez réessayer.', 'warning');
      }
    } catch (error) {
      console.error('Erreur lors du calcul de l\'itinéraire:', error);
      showModal('Erreur de connexion', 'Impossible de calculer l\'itinéraire. Vérifiez votre connexion internet.', 'error');
    }
  };

  const clearRoute = () => {
    if (viewer && viewer.entities) {
      try {
        const entities = viewer.entities.values;
        for (let i = entities.length - 1; i >= 0; i--) {
          const entity = entities[i];
          if (entity.polyline || 
              (entity.label && entity.label.text && entity.label.text._value === 'Votre position') ||
              (entity.name && (entity.name === 'route' || entity.name === 'route-background' || entity.name === 'user-position'))) {
            viewer.entities.remove(entity);
          }
        }
        setRouteVisible(false);
        setUserLocation(null);
        
        if (isGpsTracking) {
          stopGpsTracking();
        }
        setNavigationActive(false);
        setUserEntity(null);
        
        if (viewer.camera) {
          viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(pharmacyCoords.longitude, pharmacyCoords.latitude, 1000),
          });
        }
      } catch (error) {
        console.error('Erreur lors du nettoyage de la carte:', error);
      }
    }
  };

  useEffect(() => {
    console.log('CesiumMap component mounted');
    const container = cesiumContainer.current;

    const initializeViewer = async () => {
      if (container && !container.viewerInitialized) {
        console.log('Initializing Cesium Viewer');
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        try {
          const newViewer = new Viewer(container, {
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

          newViewer.scene.globe.enableLighting = false;
          newViewer.scene.globe.show = true;
          newViewer.scene.skyBox.show = false;
          newViewer.scene.backgroundColor = new Color(0.48, 0.51, 0.56, 1.0);

          if (!navigationActiveRef.current) {
            newViewer.camera.flyTo({
              destination: Cartesian3.fromDegrees(5.4204846, 43.2777243, 100),
            });
          }

          newViewer.entities.add({
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
          viewerRef.current = newViewer;
          setViewer(newViewer);
          console.log('Cesium Viewer initialized');
        } catch (error) {
          console.error('Error initializing Cesium viewer:', error);
        }
      }
    };

    initializeViewer();

    return () => {
      console.log('CesiumMap component unmounted');
      
      const currentWatchId = watchIdRef.current;
      if (currentWatchId !== null) {
        navigator.geolocation.clearWatch(currentWatchId);
        watchIdRef.current = null;
      }
      
      const currentViewer = viewerRef.current;
      if (currentViewer && !currentViewer.isDestroyed()) {
        console.log('Destroying Cesium Viewer');
        currentViewer.destroy();
        viewerRef.current = null;
        if (container) {
          container.viewerInitialized = false;
        }
      }
    };
  }, []); 

  return (
    <>
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
          
          {userLocation && !navigationActive && (
            <button
              onClick={startNavigation}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">🧭</span>
              Navigation
            </button>
          )}
          
          {navigationActive && (
            <button
              onClick={() => {
                setNavigationActive(false);
                stopGpsTracking();
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-lg">⏹️</span>
              Arrêter Navigation
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

      {/* Modal pour les messages */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        type={modal.type}
      >
        <div style={{ whiteSpace: 'pre-line' }}>
          {modal.message}
        </div>
      </Modal>
    </>
  );
}

export default CesiumMap;
