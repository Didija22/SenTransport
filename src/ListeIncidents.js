import { useState, useEffect } from 'react';

function ListeIncidents({ rafraichir }) {
  const [incidents, setIncidents] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/incidents")
      .then(response => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des incidents");
        return response.json();
      })
      .then(data => {
        setIncidents(data);
        setChargement(false);
      })
      .catch(error => {
        console.error(error);
        setChargement(false);
      });
  }, [rafraichir]); // Se réinitialise si 'rafraichir' change

  if (chargement) return <p>Chargement des incidents...</p>;

  return (
    <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '12px' }}>Incidents Signalés</h3>
      {incidents.length === 0 ? (
        <p style={{ color: '#7f8c8d' }}>Aucun incident signalé pour le moment.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {incidents.map(inc => (
            <li key={inc.id} style={{ padding: '10px', borderBottom: '1px solid #eee', marginBottom: '8px' }}>
              <strong>Ligne {inc.ligne}</strong> - <em>{inc.lieu}</em> : {inc.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListeIncidents;