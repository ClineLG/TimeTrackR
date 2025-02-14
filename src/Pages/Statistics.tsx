import axios from "axios";
import { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
  VictoryPie,
} from "victory";
import { TokenProps } from "../UserTypes";
import totalHours from "../utils/totalInHours";

const Statistics = ({ checkUser }: TokenProps) => {
  const [Data, setData] = useState<
    | {
        x: string;
        y: number;
      }[]
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/activities/dayly/?date=2025-02-14",
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        const daylyData = [...response.data].map(
          (activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          }
        );
        setData(daylyData);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <section>
      <h1>Statistics</h1>
      <div>
        <button>Année</button>
        <button>Mois</button>
        <button>semiane</button>
        <button>jour</button>
      </div>
      <div>
        <button>pie</button>
        <button>bar</button>
      </div>
      <div>
        <div>
          <VictoryChart domainPadding={{ x: 20 }} theme={VictoryTheme.clean}>
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
          // Label Angle - Si nécessaire pour éviter le chevauchement
          labelAngle={({ datum }) => (datum.y > 30 ? 0 : 45)} // Rotation conditionnelle des labels
        />
      </div>
    </section>
  );
};
export default Statistics;
