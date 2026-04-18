import './Statistique.css';

function Statistique() {
  return (
    <div className="statistiques-container">
      <div className="statistique">
        <span className="statistique-nombre">10</span>
        <span className="statistique-libelle">lignes</span>
      </div>
      <div className="statistique">
        <span className="statistique-nombre">150</span>
        <span className="statistique-libelle">arrets</span>
      </div>
      <div className="statistique">
        <span className="statistique-nombre">500 000</span>
        <span className="statistique-libelle">voyageurs / jour</span>
      </div>
    </div>
  );
}

export default Statistique;