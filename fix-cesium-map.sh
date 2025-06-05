#!/bin/bash
cat > /home/florian/Pharmacie/src/components/CesiumMap.jsx << 'ENDOFFILE'
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

function CesiumMap() {
  const cesiumContainer = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [viewer, setViewer] = useState(null);
  const [routeVisible, setRouteVisible] = useState(false);
  
  // Nouveaux états pour le GPS en temps réel
  const [isGpsTracking, setIsGpsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [userEntity, setUserEntity] = useState(null);
  const [navigationActive, setNavigationActive] = useState(false);

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

              viewer.camera.flyTo({
                destination: Cartesian3.fromDegrees(
                  userCoords.longitude,
                  userCoords.latitude,
                  1000
                ),
              });
            } catch (error) {
              console.error('Erreur d\'affichage de la position:', error);
            }
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

  // Fonction pour démarrer le suivi GPS en temps réel
  const startGpsTracking = () => {
    if (!navigator.geolocation) {
      alert('La géolocalisation n\'est pas supportée par ce navigateur.');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000 // 1 seconde max pour les données cached
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
        alert('Erreur GPS: ' + error.message);
      },
      options
    );

    setWatchId(id);
    setIsGpsTracking(true);
    alert('🛰️ Suivi GPS activé !');
  };

  // Fonction pour arrêter le suivi GPS
  const stopGpsTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsGpsTracking(false);
    alert('📍 Suivi GPS désactivé');
  };

  // Fonction pour mettre à jour la position utilisateur en temps réel
  const updateUserPosition = (coords) => {
    if (!viewer || !viewer.entities) {
      console.log("Le viewer Cesium n'est pas encore prêt");
      return;
    }

    try {
      // Supprimer l'ancienne entité utilisateur
      if (userEntity && viewer.entities) {
        viewer.entities.remove(userEntity);
      }

      // Créer une nouvelle entité avec la position mise à jour
      const newUserEntity = viewer.entities.add({
        name: 'user-position',
        position: Cartesian3.fromDegrees(coords.longitude, coords.latitude),
        point: {
          pixelSize: 15,
          color: Color.LIME,
          outlineColor: Color.BLACK,
          outlineWidth: 2,
          heightReference: 1 // CLAMP_TO_GROUND
        },
        label: {
          text: `📍 Vous (±${Math.round(coords.accuracy)}m)`,
          font: '12pt sans-serif',
          style: LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: new Cartesian2(0, -25),
          fillColor: Color.LIME,
          outlineColor: Color.BLACK
        },
      });

      setUserEntity(newUserEntity);

      // Si navigation active, centrer la caméra sur l'utilisateur
      if (navigationActive && viewer.camera) {
        viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(
            coords.longitude,
            coords.latitude,
            500 // Altitude plus basse pour la navigation
          ),
          duration: 1.0
        });
      }

      // Vérifier si on est proche de la pharmacie
      const distance = calculateDistance(coords, pharmacyCoords);
      if (distance < 50) { // 50 mètres
        alert('🎯 Vous êtes arrivé à la pharmacie !');
        setNavigationActive(false);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la position:", error);
    }
  };

  // Fonction pour calculer la distance entre deux points
  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; // Rayon de la Terre en mètres
    const φ1 = coord1.latitude * Math.PI/180;
    const φ2 = coord2.latitude * Math.PI/180;
    const Δφ = (coord2.latitude-coord1.latitude) * Math.PI/180;
    const Δλ = (coord2.longitude-coord1.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance en mètres
  };

  // Fonction pour démarrer la navigation GPS
  const startNavigation = async () => {
    try {
      if (!userLocation) {
        // Essayer d'obtenir la position avant de démarrer la navigation
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
              (error) => {
                console.error('Erreur de géolocalisation:', error);
                reject(error);
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
          });
        } catch (geoError) {
          alert('Impossible d\'obtenir votre position. Veuillez autoriser la géolocalisation.');
          return;
        }
      }
      
      // Maintenant que nous avons une position, activer la navigation
      setNavigationActive(true);
      startGpsTracking();
      
      // Laisser un court délai pour s'assurer que l'interface est mise à jour
      setTimeout(async () => {
        // Afficher l'itinéraire si pas déjà visible
        if (!routeVisible) {
          try {
            await showRoute();
            alert('🧭 Navigation GPS démarrée !');
          } catch (routeError) {
            console.error('Erreur lors du démarrage de la navigation:', routeError);
            alert('Erreur lors du calcul de l\'itinéraire. Veuillez réessayer.');
            setNavigationActive(false);
            stopGpsTracking();
          }
        } else {
          alert('🧭 Navigation GPS démarrée !');
        }
      }, 1000); // Augmenté à 1 seconde pour plus de sécurité
    } catch (error) {
      console.error('Erreur globale lors du démarrage de la navigation:', error);
      alert('Une erreur s\'est produite. Veuillez rafraîchir la page et réessayer.');
    }
  };

  const showRoute = async () => {
    if (!userLocation || !viewer || !viewer.entities) {
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
        
        // Conversion correcte des coordonnées pour Cesium
        const positions = [];
        coordinates.forEach(coord => {
          positions.push(coord[0]); // longitude
          positions.push(coord[1]); // latitude
        });

        console.log('Coordonnées converties:', positions.length, 'points');

        try {
          // Ajout du tracé de l'itinéraire
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

          // Ajout d'une ligne plus épaisse en arrière-plan pour meilleure visibilité
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

          // Zoom pour afficher tout l'itinéraire
          if (viewer.camera) {
            viewer.camera.flyTo({
              destination: Cartesian3.fromDegrees(
                (userLocation.longitude + pharmacyCoords.longitude) / 2,
                (userLocation.latitude + pharmacyCoords.latitude) / 2,
                Math.max(2000, route.distance * 1.5) // Altitude adaptée à la distance
              ),
            });
          }

          setRouteVisible(true);
          
          const distance = (route.distance / 1000).toFixed(1);
          const duration = Math.round(route.duration / 60);
          alert(`Itinéraire calculé ✅\n📍 Distance: ${distance} km\n⏱️ Durée estimée: ${duration} minutes`);
        } catch (renderError) {
          console.error('Erreur lors du rendu de l\'itinéraire:', renderError);
          alert('Erreur lors de l\'affichage de l\'itinéraire. Essayez de rafraîchir la page.');
        }
      } else {
        alert('Aucun itinéraire trouvé. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors du calcul de l\'itinéraire:', error);
      alert('Impossible de calculer l\'itinéraire. Vérifiez votre connexion internet.');
    }
  };

  const clearRoute = () => {
    if (viewer && viewer.entities) {
      try {
        const entities = viewer.entities.values;
        for (let i = entities.length - 1; i >= 0; i--) {
          const entity = entities[i];
          // Supprimer les tracés d'itinéraire et la position utilisateur
          if (entity.polyline || 
              (entity.label && entity.label.text && entity.label.text._value === 'Votre position') ||
              (entity.name && (entity.name === 'route' || entity.name === 'route-background' || entity.name === 'user-position'))) {
            viewer.entities.remove(entity);
          }
        }
        setRouteVisible(false);
        setUserLocation(null);
        
        // Arrêter le GPS et la navigation
        if (isGpsTracking) {
          stopGpsTracking();
        }
        setNavigationActive(false);
        setUserEntity(null);
        
        // Retour à la vue de la pharmacie
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
      console.log('CesiumMap component unmounted');
      
      // Nettoyer le suivi GPS si actif
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
      
      if (viewer) {
        console.log('Destroying Cesium Viewer');
        viewer.destroy();
        viewer = null;
        if (container) {
          container.viewerInitialized = false;
        }
      }
    };
  }, [watchId]);

  return (
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
        
        <button
          onClick={isGpsTracking ? stopGpsTracking : startGpsTracking}
          className={`font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
            isGpsTracking 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          <span className="text-lg">{isGpsTracking ? '📡' : '🛰️'}</span>
          {isGpsTracking ? 'Arrêter GPS' : 'Suivi GPS'}
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
  );
}

export default CesiumMap;
ENDOFFILE

chmod +x /home/florian/Pharmacie/src/components/CesiumMap.jsx
