import './App.css';
import Header from './Header';
import StatReseau from './StatReseau';
import ListeLignes from './ListeLignes';
import Footer from './Footer';

function App() {
  const lignes = [
    { id: 1, numero: "1", depart: "Parcelles Assainies",
      arrivee: "Plateau", arrets: 14, couleur: "#0a6e31" },
    { id: 2, numero: "7", depart: "Guediawaye",
      arrivee: "Place Obe", arrets: 18, couleur: "#e74c3c" },
    { id: 3, numero: "15", depart: "Pikine",
      arrivee: "Medina", arrets: 12, couleur: "#3498db" },
    { id: 4, numero: "23", depart: "Ouakam",
      arrivee: "Grand Dakar", arrets: 10, couleur: "#f39c12" },
    { id: 5, numero: "8", depart: "Almadies",
      arrivee: "Colobane", arrets: 16, couleur: "#9b59b6" },
    { id: 6, numero: "12", depart: "Yoff",
      arrivee: "Sandaga", arrets: 11, couleur: "#1abc9c" },
    { id: 7, numero: "3", depart: "Fann",
      arrivee: "Liberte", arrets: 9, couleur: "#e67e22" },
    { id: 8, numero: "18", depart: "HLM",
      arrivee: "Dieuppeul", arrets: 13, couleur: "#2ecc71" },
    { id: 9, numero: "25", depart: "Sicap",
      arrivee: "Medina", arrets: 8, couleur: "#e84393" },
    { id: 10, numero: "30", depart: "Grand Yoff",
      arrivee: "Plateau", arrets: 15, couleur: "#0984e3" },
  ];

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <StatReseau lignes={lignes} />
        <ListeLignes lignes={lignes} />
      </main>
      <Footer />
    </div>
  );
}

export default App;