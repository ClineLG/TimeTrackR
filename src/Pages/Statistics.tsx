// import axios from "axios";
import { useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
  VictoryPie,
} from "victory";

import totalHours from "../utils/totalInHours";
import Monthly from "../components/Monthly";
import Weekly from "../components/Weekly";
import Year from "../components/year";
import Daily from "../components/daily";

const Statistics = () => {
  const [Data, setData] = useState<
    | {
        x: string;
        y: number;
      }[]
    | undefined
  >(undefined);
  const [error, setError] = useState("");
  const [selectedTime, setSelectedTime] = useState("daily");

  const handleSelectTime = (time: string) => setSelectedTime(time);

  const ComponentSelected = () => {
    switch (selectedTime) {
      case "daily":
        return <Daily setData={setData} setError={setError} />;
        break;
      case "monthly":
        return <Monthly setData={setData} setError={setError} />;
        break;
      case "weekly":
        return <Weekly setData={setData} setError={setError} />;
        break;
      case "year":
        return <Year setData={setData} setError={setError} />;
        break;
    }
  };

  return (
    <section>
      <h1>Statistics</h1>
      <div>
        <button onClick={() => handleSelectTime("year")}>Année</button>
        <button onClick={() => handleSelectTime("monthly")}>Mois</button>
        <button onClick={() => handleSelectTime("weekly")}>semiane</button>
        <button onClick={() => handleSelectTime("daily")}>jour</button>
      </div>
      <div>
        <button>pie</button>
        <button>bar</button>
      </div>
      <div>
        {ComponentSelected()}
        {/* Ajout pending et error et loading */}

        {error ? (
          error
        ) : (
          <>
            <div>
              <VictoryChart
                domainPadding={{ x: 20 }}
                theme={VictoryTheme.clean}
              >
                <VictoryBar
                  data={Data}
                  labels={({ datum }) => totalHours(datum.y)} // Récupère et affiche la valeur 'y' comme texte
                  labelComponent={
                    <VictoryLabel
                      dy={-50} // Décale le label vers le haut (ajuste selon le besoin)
                    />
                  }
                />
              </VictoryChart>
            </div>

            <VictoryPie
              data={Data}
              colorScale="cool"
              innerRadius={50}
              labelRadius={70}
              padAngle={5}
              labels={({ datum }) => `${datum.x}`} // Affiche l'étiquette avec la valeur
              style={{
                labels: { fill: "white", fontSize: 4, fontWeight: "bold" }, // Style des labels
              }}
              theme={VictoryTheme.material}
              labelPlacement="perpendicular" // Ajuste l'orientation des labels
            />
          </>
        )}
      </div>
    </section>
  );
};
export default Statistics;
