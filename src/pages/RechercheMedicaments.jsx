import React, { useState, useRef, useEffect } from 'react';
import { bdpmParser } from '../utils/bdpmParser';

function RechercheMedicaments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [medicamentInfo, setMedicamentInfo] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [stats, setStats] = useState(null);
  const debounceRef = useRef();

  useEffect(() => {
    const loadBDPMData = async () => {
      try {
        setLoading(true);
        setError('Chargement de la base de données des médicaments...');
        
        await bdpmParser.loadData();
        const bdpmStats = bdpmParser.getStats();
        setStats(bdpmStats);
        
        setIsDataLoaded(true);
        setError(null);
        setLoading(false);
        console.log(`Données BDPM chargées:`, bdpmStats);
      } catch (err) {
        setError('Erreur lors du chargement des données : ' + err.message);
        setLoading(false);
      }
    };

    loadBDPMData();
  }, []);

  useEffect(() => {
    if (!isDataLoaded || !searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      try {
        const searchResults = bdpmParser.search(searchTerm.trim(), 50);
        
        setResults(searchResults);
        if (searchResults.length === 0) {
          setError(`Aucun médicament trouvé pour "${searchTerm}"`);
        }
      } catch (err) {
        setError('Erreur lors de la recherche des médicaments : ' + err.message);
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
  }, [searchTerm, isDataLoaded]);

  const fetchDetails = (cis) => {
    const medicamentDetails = bdpmParser.getMedicamentDetails(cis);
    if (medicamentDetails) {
      setSelectedId(cis);
      
      const baseInfo = {
        nom: medicamentDetails.nom,
        'Code CIS': medicamentDetails.cis,
        'Forme pharmaceutique': medicamentDetails.forme,
        'Voie d\'administration': medicamentDetails.voie,
        'Statut d\'autorisation': medicamentDetails.statut,
        'Type de procédure': medicamentDetails.procedure,
        'État de commercialisation': medicamentDetails.etat,
        'Date d\'AMM': medicamentDetails.dateAmm || 'Non renseignée',
        'Laboratoire': medicamentDetails.laboratoire,
        'Médicament générique': medicamentDetails.generique ? 'Oui' : 'Non'
      };

      const compositions = medicamentDetails.compositions || [];
      if (compositions.length > 0) {
        baseInfo['Substances actives'] = compositions.map(comp => 
          `${comp.substance} (${comp.dosage})`
        ).join(', ');
      }

      const indications = medicamentDetails.indications || [];
      if (indications.length > 0) {
        const indicationsRecentes = indications
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 3); 
        
        baseInfo['Indications thérapeutiques'] = indicationsRecentes.map(ind => 
          `SMR ${ind.smr} - ${ind.motif}`
        ).join(' | ');
      }

      const presentations = medicamentDetails.presentations || [];
      if (presentations.length > 0) {
        const presentationsActives = presentations.filter(pres => 
          pres.statut.includes('active')
        );
        if (presentationsActives.length > 0) {
          baseInfo['Présentations disponibles'] = `${presentationsActives.length} présentation(s) commercialisée(s)`;
        }
      }

      setMedicamentInfo(baseInfo);
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
    <div className="services-container">
      {/* Header section */}
      <div className="services-header">
        <h1 className="services-title">
          🔍 Recherche de Médicaments
        </h1>
        <p className="services-subtitle">
          Recherchez dans la base de données publique des médicaments (BDPM)
        </p>
        {isDataLoaded && stats && (
          <div className="mt-4 inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            📊 {stats.medicaments.toLocaleString()} médicaments • {stats.compositions.toLocaleString()} compositions • {stats.indications.toLocaleString()} évaluations
          </div>
        )}
      </div>

      <div className="services-content">
        {/* Search Section */}
        <div className="services-section">
          <h2 className="services-section-title">
            <div className="services-section-icon">
              <span className="text-lg">🔍</span>
            </div>
            Rechercher un médicament
          </h2>
          
          <form onSubmit={e => e.preventDefault()} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setSelectedId(null);
                  setMedicamentInfo(null);
                }}
                placeholder={isDataLoaded ? "Entrez le nom d'un médicament, substance active ou laboratoire..." : "Chargement en cours..."}
                disabled={!isDataLoaded}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoFocus
              />
              {loading && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <svg className="animate-spin h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            
            {!searchTerm && isDataLoaded && stats && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">💊</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Commencez à taper pour rechercher</h3>
                <p className="text-gray-500 mb-4">
                  Recherchez parmi {stats.medicaments.toLocaleString()} médicaments référencés
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">paracétamol</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">ibuprofène</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">doliprane</span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">aspirine</span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="services-section">
            <div className={`rounded-xl p-6 border-l-4 ${
              error.includes('Chargement') 
                ? 'bg-blue-50 border-blue-400 text-blue-800' 
                : 'bg-red-50 border-red-400 text-red-800'
            }`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {error.includes('Chargement') ? (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {results.length > 0 && !selectedId && (
          <div className="services-section">
            <h2 className="services-section-title">
              <div className="services-section-icon">
                <span className="text-lg">📋</span>
              </div>
              Résultats de recherche
            </h2>
            
            <div className="mb-4 text-sm text-gray-600 bg-green-50 rounded-lg p-3 border border-green-200">
              <span className="font-medium text-green-800">
                {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
              </span>
              {results.length === 50 && (
                <span className="text-green-700"> (limité à 50 pour les performances)</span>
              )}
            </div>
            
            <div className="grid gap-4">
              {results.map((item) => (
                <div 
                  key={item.cis} 
                  className="services-card cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" 
                  onClick={() => fetchDetails(item.cis)}
                >
                  <div className="services-card-header">
                    <span className="services-card-icon">💊</span>
                    <h3 className="services-card-title text-green-800">{item.nom}</h3>
                  </div>
                  <div className="services-card-content">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.forme}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.voie}
                      </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.etat}
                      </span>
                      {item.generique && (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          Générique
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Laboratoire:</strong> {item.laboratoire} • <strong>CIS:</strong> {item.cis}
                    </div>
                    {item.compositions && item.compositions.length > 0 && (
                      <div className="text-sm text-gray-500 mt-2">
                        <strong>Substances actives:</strong> {item.compositions.slice(0, 2).map(comp => comp.substance).join(', ')}
                        {item.compositions.length > 2 && '...'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Detailed Information Section */}
        {selectedId && medicamentInfo && (
          <div className="services-section">
            <h2 className="services-section-title">
              <div className="services-section-icon">
                <span className="text-lg">📋</span>
              </div>
              Informations détaillées
            </h2>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
                <span className="text-3xl mr-3">💊</span>
                {medicamentInfo.nom}
              </h3>
            </div>
            
            <div className="grid gap-4">
              {Object.entries(medicamentInfo)
                .filter(([key]) => key !== 'nom')
                .map(([label, content]) => (
                  <div key={label} className="services-card">
                    <div className="services-card-header">
                      <h4 className="services-card-title text-green-700">
                        {label}
                      </h4>
                    </div>
                    <div className="services-card-content">
                      <p className="text-gray-700 font-medium">
                        {content || <em className="text-gray-500">Non spécifié</em>}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-8 text-center">
              <button 
                className="services-cta-button inline-flex items-center" 
                onClick={handleNewSearch}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Nouvelle recherche
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RechercheMedicaments;
