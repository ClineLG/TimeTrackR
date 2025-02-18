import { useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
  VictoryPie,
  VictoryAxis,
} from "victory";

import totalHours from "../utils/totalInHours";
import Monthly from "../components/Monthly";
import Weekly from "../components/Weekly";
import Year from "../components/year";
import Daily from "../components/Daily";
import { ButtonStatistics } from "../components/buttonStattistics";

//comparer visuellement

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
  const [pie, setPie] = useState(false);
  const [loading, setLoading] = useState(true);

  const ComponentSelected = () => {
    switch (selectedTime) {
      case "daily":
        return (
          <Daily
            setData={setData}
            setError={setError}
            setLoading={setLoading}
          />
        );
        break;
      case "monthly":
        return (
          <Monthly
            setData={setData}
            setError={setError}
            setLoading={setLoading}
          />
        );
        break;
      case "weekly":
        return (
          <Weekly
            setData={setData}
            setError={setError}
            setLoading={setLoading}
          />
        );
        break;
      case "year":
        return (
          <Year setData={setData} setError={setError} setLoading={setLoading} />
        );
        break;
    }
  };

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4 text-indigo-600">
        Mes Statistiques
      </h1>
      <div className="flex justify-center mb-4">
        <ButtonStatistics
          setSelectedTime={setSelectedTime}
          title="Par Année"
          time="year"
        />
        <ButtonStatistics
          setSelectedTime={setSelectedTime}
          title="Par Mois"
          time="monthly"
        />
        <ButtonStatistics
          setSelectedTime={setSelectedTime}
          title="Par Semaine"
          time="weekly"
        />
        <ButtonStatistics
          setSelectedTime={setSelectedTime}
          title="Par Jour"
          time="daily"
        />
      </div>

      <div className="mb-4 flex flex-col justify-center w-full">
        {ComponentSelected()}{" "}
        <div className="flex justify-center m-5">
          <button
            onClick={() => setPie(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mx-2"
          >
            pie
          </button>
          <button
            onClick={() => setPie(false)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mx-2"
          >
            bar
          </button>
        </div>
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-xl">loading</div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : pie ? (
            <VictoryPie
              data={Data}
              colorScale="cool"
              innerRadius={50}
              labelRadius={70}
              padAngle={5}
              labels={({ datum }) => `${datum.x}\n${totalHours(datum.y)}`} // Affiche l'étiquette avec la valeur
              style={{
                labels: { fill: "white", fontSize: 4, fontWeight: "bold" }, // Style des labels
              }}
              theme={VictoryTheme.material}
              labelPlacement="perpendicular" // Ajuste l'orientation des labels
            />
          ) : (
            <div className="w-full max-w-xl mx-auto">
              <VictoryChart
                domainPadding={{ x: 20 }}
                theme={VictoryTheme.clean}
              >
                <VictoryBar
                  data={Data}
                  labels={({ datum }) => totalHours(datum.y)} // Récupère et affiche la valeur 'y' comme texte
                  labelComponent={
                    <VictoryLabel
                      dy={-30} // Décale le label vers le haut (ajuste selon le besoin)
                    />
                  }
                />
                <VictoryAxis />
              </VictoryChart>
            </div>
          )}
        </div>{" "}
      </div>
    </section>
  );
};
export default Statistics;
