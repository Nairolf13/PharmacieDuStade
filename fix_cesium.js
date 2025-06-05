
const updateUserPositionFix = `
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
          text: \`📍 Vous (±\${Math.round(coords.accuracy)}m)\`,
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
`;

// Fonction showRoute sécurisée
const showRouteFix = `
  const showRoute = async () => {
    if (!userLocation || !viewer || !viewer.entities) {
      alert('Veuillez d\\'abord obtenir votre position.');
      return;
    }

    try {
      const response = await fetch(
        \`https://router.project-osrm.org/route/v1/driving/\${userLocation.longitude},\${userLocation.latitude};\${pharmacyCoords.longitude},\${pharmacyCoords.latitude}?overview=full&geometries=geojson\`
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
          alert(\`Itinéraire calculé ✅\\n📍 Distance: \${distance} km\\n⏱️ Durée estimée: \${duration} minutes\`);
        } catch (renderError) {
          console.error('Erreur lors du rendu de l\\'itinéraire:', renderError);
          alert('Erreur lors de l\\'affichage de l\\'itinéraire. Essayez de rafraîchir la page.');
        }
      } else {
        alert('Aucun itinéraire trouvé. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors du calcul de l\\'itinéraire:', error);
      alert('Impossible de calculer l\\'itinéraire. Vérifiez votre connexion internet.');
    }
  };
`;

// Fonction clearRoute sécurisée
const clearRouteFix = `
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
`;

// Fonction startNavigation sécurisée
const startNavigationFix = `
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
          alert('Impossible d\\'obtenir votre position. Veuillez autoriser la géolocalisation.');
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
            alert('Erreur lors du calcul de l\\'itinéraire. Veuillez réessayer.');
            setNavigationActive(false);
            stopGpsTracking();
          }
        } else {
          alert('🧭 Navigation GPS démarrée !');
        }
      }, 1000); // Augmenté à 1 seconde pour plus de sécurité
    } catch (error) {
      console.error('Erreur globale lors du démarrage de la navigation:', error);
      alert('Une erreur s\\'est produite. Veuillez rafraîchir la page et réessayer.');
    }
  };
`;

console.log("Copiez et remplacez les fonctions suivantes dans votre fichier CesiumMap.jsx :");
console.log("\n1. Fonction updateUserPosition :");
console.log(updateUserPositionFix);
console.log("\n2. Fonction showRoute :");
console.log(showRouteFix);
console.log("\n3. Fonction clearRoute :");
console.log(clearRouteFix);
console.log("\n4. Fonction startNavigation :");
console.log(startNavigationFix);
