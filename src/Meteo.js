import { useState, useEffect } from 'react';
import './Meteo.css';

function Meteo() {
  const [meteo, setMeteo] = useState(null);
  const [previsions, setPrevisions] = useState([]); // État pour stocker les prévisions à 3 jours
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_OWM_KEY;
    
    if (!API_KEY) {
      setErreur("Clé API manquante (.env)");
      return;
    }

    // 1. URL pour la météo actuelle
    const urlActuelle = `https://api.openweathermap.org/data/2.5/weather?q=Dakar&appid=${API_KEY}&units=metric&lang=fr`;
    
    // 2. URL pour les prévisions (Forecast)
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=Dakar&appid=${API_KEY}&units=metric&lang=fr`;

    // Appel simultané des deux APIs pour gagner en efficacité
    Promise.all([fetch(urlActuelle), fetch(urlForecast)])
      .then(([resActuelle, resForecast]) => {
        if (!resActuelle.ok || !resForecast.ok) throw new Error("Erreur serveur API météo");
        return Promise.all([resActuelle.json(), resForecast.json()]);
      })
      .then(([dataActuelle, dataForecast]) => {
        // Traitement météo actuelle
        setMeteo({
          temperature: Math.round(dataActuelle.main.temp),
          description: dataActuelle.weather[0].description,
          condition: dataActuelle.weather[0].main,
          humidite: dataActuelle.main.humidity,
          icone: dataActuelle.weather[0].icon,
        });

        // Traitement des prévisions : l'API renvoie des blocs de 3h. 
        // On filtre pour prendre une seule mesure par jour (ex: à 12:00:00) et on prend les 3 prochains jours.
        const listePrevisions = dataForecast.list
          .filter(item => item.dt_txt.includes("12:00:00"))
          .slice(0, 3)
          .map(item => {
            // Formater la date en jour de la semaine (ex: lun., mar.)
            const dateOption = { weekday: 'short', day: 'numeric', month: 'short' };
            const jourNom = new Date(item.dt * 1000).toLocaleDateString('fr-FR', dateOption);
            
            return {
              jour: jourNom,
              temp: Math.round(item.main.temp),
              icone: item.weather[0].icon,
              desc: item.weather[0].description
            };
          });

        setPrevisions(listePrevisions);
      })
      .catch(err => setErreur(err.message));
  }, []);

  function getAlerte(condition) {
    if (condition === "Rain" || condition === "Drizzle") {
      return { message: "Pluie détectée : risque de retards", classe: "alerte-pluie" };
    }
    if (condition === "Thunderstorm") {
      return { message: "Orage en cours : soyez prudents", classe: "alerte-orage" };
    }
    return null;
  }

  if (erreur) {
    return (
      <div className="meteo meteo-erreur">
        <p>Météo indisponible</p>
        <p className="meteo-detail">{erreur}</p>
      </div>
    );
  }

  if (!meteo) {
    return <div className="meteo">Chargement météo...</div>;
  }

  const alerte = getAlerte(meteo.condition);

  return (
    <div className="meteo-container">
      <div className="meteo">
        <div className="meteo-info">
          <img
            src={`https://openweathermap.org/img/wn/${meteo.icone}@2x.png`}
            alt={meteo.description}
            className="meteo-icone"
          />
          <div>
            <span className="meteo-temp">{meteo.temperature}°C</span>
            <span className="meteo-desc">{meteo.description}</span>
          </div>
          <span className="meteo-humidite">Humidité : {meteo.humidite}%</span>
        </div>
        
        {alerte && (
          <div className={`meteo-alerte ${alerte.classe}`}>
            {alerte.message}
          </div>
        )}
      </div>

      {/* Affichage des prévisions à 3 jours juste en dessous */}
      <div className="previsions-liste">
        {previsions.map((prev, index) => (
          <div key={index} className="prevision-item">
            <span className="prevision-jour">{prev.jour}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${prev.icone}.png`} 
              alt={prev.desc} 
              title={prev.desc}
            />
            <span className="prevision-temp">{prev.temp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meteo;