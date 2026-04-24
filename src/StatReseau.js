import './StatReseau.css';

function StatReseau({ lignes }) {
  const totalLignes = lignes.length;
  const totalArrets = lignes.reduce((sum, ligne) => sum + ligne.arrets, 0);
  const ligneMax = lignes.reduce((max, ligne) =>
    ligne.arrets > max.arrets ? ligne : max, lignes[0]);

  return (
    <div className="stat-reseau">
      <div className="stat-item">
        <span className="stat-nombre">{totalLignes}</span>
        <span className="stat-libelle">lignes</span>
      </div>
      <div className="stat-item">
        <span className="stat-nombre">{totalArrets}</span>
        <span className="stat-libelle">arrets au total</span>
      </div>
      <div className="stat-item">
        <span className="stat-nombre">Ligne {ligneMax.numero}</span>
        <span className="stat-libelle">la plus longue ({ligneMax.arrets} arrets)</span>
      </div>
    </div>
  );
}

export default StatReseau;