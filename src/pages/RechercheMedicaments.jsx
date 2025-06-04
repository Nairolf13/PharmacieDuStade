import React, { useState, useRef, useEffect } from 'react';

// Utilise les données réelles du fichier BDPM
function RechercheMedicaments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [medicamentInfo, setMedicamentInfo] = useState(null);
  const [medicaments, setMedicaments] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const debounceRef = useRef();

  // Chargement des données BDPM au démarrage
  useEffect(() => {
    const loadBDPMData = async () => {
      try {
        setLoading(true);
        setError('Chargement de la base de données des médicaments...');
        const response = await fetch('/bdpm.csv');
        const csvText = await response.text();
        
        // Parse CSV (format TSV)
        const lines = csvText.split('\n');
        const parsedData = lines
          .filter(line => line.trim()) // Supprimer les lignes vides
          .map(line => {
            const columns = line.split('\t');
            if (columns.length >= 12) {
              return {
                id: columns[0],
                nom: columns[1],
                forme: columns[2],
                voie: columns[3],
                statut: columns[4],
                procedure: columns[5],
                commercialisation: columns[6],
                dateAMM: columns[7],
                statutBDM: columns[8],
                numeroEuropeen: columns[9],
                titulaire: columns[10],
                surveillanceRenforcee: columns[11]
              };
            }
            return null;
          })
          .filter(Boolean); // Supprimer les entrées nulles
        
        setMedicaments(parsedData);
        setIsDataLoaded(true);
        setError(null);
        console.log(`${parsedData.length} médicaments chargés depuis la BDPM`);
      } catch (err) {
        setError('Erreur lors du chargement des données BDPM');
        console.error('Erreur chargement BDPM:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBDPMData();
  }, []);

  // Suggestions instantanées (autocomplete)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      if (isDataLoaded) setError(null);
      return;
    }
    
    if (!isDataLoaded) {
      return; // Attendre que les données soient chargées
    }
    
    setLoading(true);
    setError(null);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      try {
        // Recherche dans les données BDPM directement dans useEffect
        const searchLower = searchTerm.toLowerCase();
        const suggestions = medicaments
          .filter(med => 
            med.nom.toLowerCase().includes(searchLower) ||
            med.forme.toLowerCase().includes(searchLower)
          )
          .filter(med => med.commercialisation === 'Commercialisée') // Seulement les médicaments commercialisés
          .slice(0, 50); // Limiter les résultats pour les performances
        
        setResults(suggestions);
        if (suggestions.length === 0) {
          setError(`Aucun médicament commercialisé trouvé pour "${searchTerm}"`);
        }
      } catch {
        setError('Erreur lors de la recherche des médicaments');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm, isDataLoaded, medicaments]);

  // Récupère les infos détaillées d'un médicament
  const fetchDetails = (id) => {
    const medicament = medicaments.find(med => med.id === id);
    if (medicament) {
      setSelectedId(id);
      setMedicamentInfo({
        nom: medicament.nom,
        'Code CIS': medicament.id,
        'Forme pharmaceutique': medicament.forme,
        'Voie d\'administration': medicament.voie,
        'Statut d\'autorisation': medicament.statut,
        'Type de procédure': medicament.procedure,
        'État de commercialisation': medicament.commercialisation,
        'Date d\'AMM': medicament.dateAMM || 'Non spécifiée',
        'Numéro européen': medicament.numeroEuropeen || 'Non applicable',
        'Titulaire de l\'AMM': medicament.titulaire,
        'Surveillance renforcée': medicament.surveillanceRenforcee === 'Oui' ? 'Oui' : 'Non'
      });
    }
  };

  // Nouvelle recherche (reset)
  const handleNewSearch = () => {
    setSelectedId(null);
    setMedicamentInfo(null);
    setSearchTerm('');
    setResults([]);
    if (isDataLoaded) setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Rechercher un médicament
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Base de données publique des médicaments (BDPM) - {medicaments.length} médicaments référencés
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Recherchez parmi les médicaments autorisés et commercialisés en France
          </p>
        </div>
        
        <div className="mt-8">
          <form onSubmit={e => e.preventDefault()} className="max-w-xl mx-auto">
            <div className="flex shadow-sm rounded-md">
              <input
                type="text"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setSelectedId(null);
                  setMedicamentInfo(null);
                }}
                placeholder={isDataLoaded ? "Entrez le nom d'un médicament..." : "Chargement en cours..."}
                disabled={!isDataLoaded}
                className="flex-1 min-w-0 block w-full px-4 py-3 rounded-l-md border border-gray-300 focus:ring-green-500 focus:border-green-500 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !isDataLoaded}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${(loading || !isDataLoaded) ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Rechercher'}
              </button>
            </div>
          </form>
          
          {error && (
            <div className={`mt-4 text-center ${error.includes('Chargement') ? 'text-blue-600' : 'text-red-600'}`}>
              {error}
            </div>
          )}
          
          <div className="mt-8">
            {/* Affichage de la liste des suggestions */}
            {results.length > 0 && !selectedId && (
              <div className="max-w-3xl mx-auto">
                <div className="mb-4 text-sm text-gray-600 text-center">
                  {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                  {results.length === 50 ? ' (limité à 50 pour les performances)' : ''}
                </div>
                <ul className="divide-y divide-gray-200 bg-white shadow rounded-lg">
                  {results.map((item) => (
                    <li 
                      key={item.id} 
                      className="py-4 px-6 cursor-pointer hover:bg-gray-100 transition-colors" 
                      onClick={() => fetchDetails(item.id)}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-lg text-green-800">{item.nom}</span>
                        <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded">{item.forme}</span>
                          <span className="bg-blue-100 px-2 py-1 rounded">{item.voie}</span>
                          <span className="bg-green-100 px-2 py-1 rounded">{item.commercialisation}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Titulaire: {item.titulaire} • CIS: {item.id}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Affichage des détails du médicament sélectionné */}
            {selectedId && medicamentInfo && (
              <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold text-green-700 mb-6">{medicamentInfo.nom}</h2>
                <div className="space-y-4">
                  {Object.entries(medicamentInfo)
                    .filter(([key]) => key !== 'nom')
                    .map(([label, content]) => (
                      <div key={label} className="border rounded-lg overflow-hidden">
                        <div className="bg-green-100 px-4 py-3 font-semibold text-lg text-green-900">
                          {label}
                        </div>
                        <div className="bg-gray-50 px-4 py-4 text-gray-700">
                          {content || <em className="text-gray-500">Non spécifié</em>}
                        </div>
                      </div>
                    ))}
                </div>
                <button 
                  className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium" 
                  onClick={handleNewSearch}
                >
                  ← Nouvelle recherche
                </button>
              </div>
            )}
            
            {/* Message d'aide initial */}
            {!searchTerm && isDataLoaded && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-lg mb-2">🔍 Commencez à taper pour rechercher un médicament</p>
                <p className="text-sm">
                  Exemples: "paracétamol", "ibuprofène", "doliprane", "aspirine"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RechercheMedicaments;
