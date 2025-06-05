import { getBDPMPath, getCompositionsPath, getPresentationsPath, getSMRPath } from './pathUtils.js';

class BDPMParser {
  constructor() {
    this.medicaments = new Map();
    this.compositions = new Map();
    this.presentations = new Map();
    this.indications = new Map();
    this.isLoaded = false;
  }

  async loadData() {
    if (this.isLoaded) return;

    try {
      await Promise.all([
        this.loadMedicaments(),
        this.loadCompositions(),
        this.loadPresentations(),
        this.loadIndications()
      ]);
      this.isLoaded = true;
    } catch (error) {
      console.error('Erreur lors du chargement des données BDPM:', error);
      throw error;
    }
  }

  async loadMedicaments() {
    const response = await fetch(getBDPMPath());
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());

    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length >= 11) {
        const [cis, nom, forme, voie, statut, procedure, etat, dateAmm, , , laboratoire, generique] = parts;
        
        this.medicaments.set(cis, {
          cis,
          nom: nom.trim(),
          forme: forme.trim(),
          voie: voie.trim(),
          statut: statut.trim(),
          procedure: procedure.trim(),
          etat: etat.trim(),
          dateAmm: dateAmm.trim(),
          laboratoire: laboratoire.trim(),
          generique: generique.trim() === 'Oui'
        });
      }
    }
  }

  async loadCompositions() {
    try {
      const response = await fetch(getCompositionsPath());
      const text = await response.text();
      const lines = text.split('\n').filter(line => line.trim());

      for (const line of lines) {
        const parts = line.split('\t');
        if (parts.length >= 7) {
          const [cis, forme, code, substance, dosage, reference, nature, numero] = parts;
          
          if (!this.compositions.has(cis)) {
            this.compositions.set(cis, []);
          }
          
          this.compositions.get(cis).push({
            forme: forme?.trim() || '',
            code: code?.trim() || '',
            substance: substance?.trim() || '',
            dosage: dosage?.trim() || '',
            reference: reference?.trim() || '',
            nature: nature?.trim() || '',
            numero: numero?.trim() || ''
          });
        }
      }
    } catch (error) {
      console.warn('Fichier compositions.txt non trouvé ou erreur de chargement:', error);
    }
  }

  async loadPresentations() {
    try {
      const response = await fetch(getPresentationsPath());
      const text = await response.text();
      const lines = text.split('\n').filter(line => line.trim());

      for (const line of lines) {
        const parts = line.split('\t');
        if (parts.length >= 6) {
          const [cis, cip, libelle, statut, etat, dateDeclaration] = parts;
          
          if (!this.presentations.has(cis)) {
            this.presentations.set(cis, []);
          }
          
          this.presentations.get(cis).push({
            cip: cip?.trim() || '',
            libelle: libelle?.trim() || '',
            statut: statut?.trim() || '',
            etat: etat?.trim() || '',
            dateDeclaration: dateDeclaration?.trim() || ''
          });
        }
      }
    } catch (error) {
      console.warn('Fichier presentations.txt non trouvé ou erreur de chargement:', error);
    }
  }

  async loadIndications() {
    try {
      const response = await fetch(getSMRPath());
      const text = await response.text();
      const lines = text.split('\n').filter(line => line.trim());

      for (const line of lines) {
        const parts = line.split('\t');
        if (parts.length >= 6) {
          const [cis, , , date, smr, motif] = parts;
          
          if (!this.indications.has(cis)) {
            this.indications.set(cis, []);
          }
          
          this.indications.get(cis).push({
            date: date?.trim() || '',
            smr: smr?.trim() || '',
            motif: motif?.trim() || ''
          });
        }
      }
    } catch (error) {
      console.warn('Fichier smr.txt non trouvé ou erreur de chargement:', error);
    }
  }

  search(query, limit = 50) {
    if (!this.isLoaded) {
      throw new Error('Les données BDPM ne sont pas encore chargées');
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results = [];

    for (const [cis, medicament] of this.medicaments) {
      const nomLower = medicament.nom.toLowerCase();
      
      // Recherche dans le nom du médicament
      const nomMatch = nomLower.includes(normalizedQuery);
      const nomStartsWith = nomLower.startsWith(normalizedQuery);
      
      // Recherche dans les substances actives
      const compositions = this.compositions.get(cis) || [];
      const substanceMatch = compositions.some(comp => 
        comp.substance.toLowerCase().includes(normalizedQuery)
      );
      const substanceStartsWith = compositions.some(comp => 
        comp.substance.toLowerCase().startsWith(normalizedQuery)
      );

      // Recherche dans le laboratoire
      const laboratoireMatch = medicament.laboratoire.toLowerCase().includes(normalizedQuery);

      if (nomMatch || substanceMatch || laboratoireMatch) {
        const enrichedMedicament = {
          ...medicament,
          compositions: compositions,
          presentations: this.presentations.get(cis) || [],
          indications: this.indications.get(cis) || []
        };

        // Score de pertinence avec priorité pour les correspondances exactes au début
        let score = 0;
        
        // Priorité maximale : nom qui commence par la recherche
        if (nomStartsWith) {
          score += 100;
        }
        // Priorité haute : nom qui contient la recherche
        else if (nomMatch) {
          score += 50;
        }
        
        // Priorité moyenne : substance qui commence par la recherche
        if (substanceStartsWith) {
          score += 20;
        }
        // Priorité basse : substance qui contient la recherche
        else if (substanceMatch) {
          score += 10;
        }
        
        // Priorité minimale : laboratoire qui contient la recherche
        if (laboratoireMatch) {
          score += 1;
        }

        results.push({ ...enrichedMedicament, score });
      }
    }

    // Tri par score de pertinence (décroissant) puis par nom (alphabétique)
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.nom.localeCompare(b.nom);
    });

    return results.slice(0, limit);
  }

  getMedicamentDetails(cis) {
    if (!this.isLoaded) {
      throw new Error('Les données BDMP ne sont pas encore chargées');
    }

    const medicament = this.medicaments.get(cis);
    if (!medicament) return null;

    return {
      ...medicament,
      compositions: this.compositions.get(cis) || [],
      presentations: this.presentations.get(cis) || [],
      indications: this.indications.get(cis) || []
    };
  }

  getStats() {
    return {
      medicaments: this.medicaments.size,
      compositions: this.compositions.size,
      presentations: this.presentations.size,
      indications: this.indications.size,
      isLoaded: this.isLoaded
    };
  }
}

// Instance singleton
export const bdpmParser = new BDPMParser();
