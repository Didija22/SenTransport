import { useState } from 'react';
import './SignalerIncident.css';
import ListeIncidents from './ListeIncidents'; // Importation pour l'Exercice 1

// Ajout de la prop listeDesLignes reçue depuis App.js pour l'Exercice 3
function SignalerIncident({ listeDesLignes = [] }) {
  const [ligne, setLigne] = useState("");
  const [description, setDescription] = useState("");
  const [lieu, setLieu] = useState("");
  const [message, setMessage] = useState(null);
  const [enCours, setEnCours] = useState(false);
  
  // Compteur pour forcer la liste des incidents à se recharger (Exercice 1)
  const [rafraichirCompteur, setRafraichirCompteur] = useState(0);

  function handleSubmit() {
    if (!ligne || !description) {
      setMessage({ type: "erreur", texte: "Remplissez la ligne et la description." });
      return;
    }
    setEnCours(true);

    fetch("http://localhost:5000/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ligne,
        description,
        lieu: lieu || "Non précisé"
      }),
    })
      .then(r => {
        if (!r.ok) throw new Error("Erreur serveur");
        return r.json();
      })
      .then(data => {
        setMessage({ type: "succes", texte: "Incident #" + data.id + " signalé. Merci !" });
        setLigne("");
        setDescription("");
        setLieu("");
        setEnCours(false);
        
        // On incrémente le compteur pour avertir la liste qu'un nouvel incident a été ajouté
        setRafraichirCompteur(prev => prev + 1);
      })
      .catch(err => {
        setMessage({ type: "erreur", texte: err.message });
        setEnCours(false);
      });
  }

  return (
    <div className="signaler">
      <h2 className="signaler-titre">Signaler un incident</h2>
      <div className="signaler-form">
        
        {/* Exercice 3 : Remplacement de l'input par le menu déroulant <select> */}
        <select 
          value={ligne} 
          onChange={e => setLigne(e.target.value)} 
          className="signaler-input"
        >
          <option value="">-- Sélectionnez une ligne --</option>
          {listeDesLignes.map(l => (
            <option key={l.id} value={l.numero}>
              Ligne {l.numero} ({l.depart} → {l.arrivee})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Lieu (ex: Colobane)"
          value={lieu}
          onChange={e => setLieu(e.target.value)}
          className="signaler-input"
        />
        <textarea
          placeholder="Description de l'incident..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="signaler-textarea"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          disabled={enCours}
          className="signaler-btn"
        >
          {enCours ? "Envoi en cours..." : "Signaler"}
        </button>
      </div>
      
      {message && (
        <div className={`signaler-message signaler-${message.type}`}>
          {message.texte}
        </div>
      )}

      {/* Exercice 1 : Affichage de la liste des incidents juste en dessous */}
      <ListeIncidents rafraichir={rafraichirCompteur} />
    </div>
  );
}

export default SignalerIncident;