import { useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryPie,
  VictoryAxis,
  VictoryTooltip,
} from "victory";

import totalHours from "../utils/totalInHours";
import Monthly from "../components/Monthly";
import Weekly from "../components/Weekly";
import Year from "../components/year";
import Daily from "../components/Daily";
import { ButtonStatistics } from "../components/ButtonStattistics";

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
        {ComponentSelected()}
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
        <div className="">
          {loading ? (
            <div className="text-center text-xl">loading</div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : pie ? (
            <div className="flex justify-center">
              <div className="w-full max-w-[900px]">
                <VictoryPie
                  data={Data}
                  theme={VictoryTheme.clean}
                  padAngle={5}
                  labelIndicator
                  labelIndicatorInnerOffset={50}
                  labelIndicatorOuterOffset={5}
                  labelRadius={220}
                  radius={150}
                  labelPlacement="vertical"
                  width={600}
                  height={600}
                  labels={({ datum }) =>
                    `${datum.x} : \n${totalHours(datum.y)}`
                  }
                  style={{
                    labels: {
                      fill: "black",
                      fontSize: 8,
                      fontWeight: 200,
                    },
                    data: {
                      fill: ({ datum }) =>
                        datum.y > 180
                          ? "#4F3AF6"
                          : datum.y > 60 && datum.y < 180
                          ? "#3ac3f4"
                          : "#3af46f",
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full  overflow-x-auto rounded-2xl ">
                <div
                  style={{
                    width: Data
                      ? Data.length <= 3
                        ? Data.length * 300
                        : Data.length * 150
                      : "auto",
                  }}
                  className="bg-indigo-600  mx-auto rounded-2xl"
                >
                  <VictoryChart
                    theme={VictoryTheme.material}
                    padding={{ left: 100, right: 50, top: 50, bottom: 50 }}
                    domainPadding={{ x: 0, y: 0 }}
                    width={
                      Data
                        ? Data.length <= 3
                          ? Data.length * 300
                          : Data.length * 150
                        : 0
                    }
                    height={500}
                  >
                    <VictoryBar
                      barWidth={40}
                      height={500}
                      cornerRadius={{ top: 20 }}
                      data={Data}
                      labelComponent={<VictoryTooltip />}
                      labels={({ datum }) => totalHours(datum.y)}
                      // labels={({ datum }) => }
                      // labelComponent={<VictoryLabel dy={-30} />}
                      style={{ data: { fill: "white" } }}
                      alignment="middle"
                    />

                    <VictoryAxis
                      dependentAxis
                      tickFormat={(tick) => `${totalHours(tick)}`}
                      style={{
                        axis: { stroke: "white" },
                        ticks: { stroke: "transparent" },
                        tickLabels: {
                          fill: "white",
                          fontSize: 11,
                        },
                        grid: { stroke: "#d8d8d8" },
                      }}
                    />

                    <VictoryAxis
                      tickFormat={(tick, i) =>
                        `${tick}\n ${totalHours(Data[i].y)}`
                      }
                      style={{
                        axis: { stroke: "white" },
                        ticks: { stroke: "transparent" },
                        tickLabels: {
                          fill: "white",
                          fontSize: 12,
                        },
                        grid: { stroke: "#d8d8d8" },
                      }}
                      domain={[0, Data.length + 1]}
                      tickValues={Data.map((datum, index) => index + 1)}
                    />
                  </VictoryChart>
                </div>
              </div>
            </div>
          )}
        </div>{" "}
      </div>
    </section>
  );
};
export default Statistics;
