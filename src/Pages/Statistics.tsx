import { useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryPie,
  VictoryAxis,
  VictoryTooltip,
  LineSegment,
} from "victory";

import totalHours from "../utils/totalInHours";
import Monthly from "../components/Monthly";
import Weekly from "../components/Weekly";
import Year from "../components/year";
import Daily from "../components/Daily";
import { ButtonStatistics } from "../components/ButtonStattistics";

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
    <section className="bg-gray-500 p-10 min-h-screen flex flex-col gap-6">
      <div className="bg-gray-200 w-full text-gray-800  p-5 rounded-2xl flex flex-col gap-5 items-center text-center max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center pb-5">
          My Statistics
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-center gap-6 mb-4">
          <ButtonStatistics
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            title="Year"
            time="year"
          />
          <ButtonStatistics
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            title="Month"
            time="monthly"
          />
          <ButtonStatistics
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            title="Week"
            time="weekly"
          />
          <ButtonStatistics
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            title="Day"
            time="daily"
          />
        </div>
      </div>

      <div className="bg-gray-800 w-full text-gray-800  p-2 sm:p-5 rounded-2xl flex flex-col gap-5 items-center text-center max-w-3xl mx-auto">
        {ComponentSelected()}
      </div>
      <div className="mx-auto flex w-fit rounded-2xl overflow-hidden">
        <button
          onClick={() => setPie(true)}
          className={` ${
            pie ? "text-gray-200  bg-gray-800" : "text-gray-800  bg-gray-400"
          } py-3 rounded-bl-2xl rounded-tl-2xl border-3 w-15`}
        >
          Pie
        </button>
        <button
          onClick={() => setPie(false)}
          className={` ${
            !pie ? "text-gray-200  bg-gray-800" : "text-gray-800  bg-gray-400"
          } py-3 rounded-br-2xl rounded-tr-2xl border-3 w-15`}
        >
          Bar
        </button>
      </div>
      {loading ? (
        <div className="w-screen flex items-center justify-center">
          <p className="text-center text-gray-800 rounded-2xl bg-gray-200 w-fit text-2xl p-4 mx-auto">
            loading
          </p>
        </div>
      ) : error ? (
        <p className="text-center text-gray-800 rounded-2xl bg-gray-200 w-fit text-2xl p-4 mx-auto">
          {error}
        </p>
      ) : pie ? (
        <div className="flex bg-gray-800 rounded-2xl items-center justify-center">
          <div className="w-full max-w-[900px] ">
            <VictoryPie
              data={Data}
              padAngle={5}
              labelIndicator={
                <LineSegment
                  style={{
                    stroke: "white",
                    strokeDasharray: 5,
                  }}
                />
              }
              labelIndicatorInnerOffset={50}
              labelIndicatorOuterOffset={5}
              labelRadius={220}
              radius={150}
              labelPlacement="vertical"
              width={600}
              height={600}
              labels={({ datum }) => `${datum.x} : \n${totalHours(datum.y)}`}
              style={{
                labels: {
                  fill: "white",
                  fontSize: 12,
                  fontWeight: 500,
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
        <div className="w-full overflow-x-auto">
          <div
            className="bg-gray-800 rounded-2xl "
            style={{
              width: Data
                ? Data.length <= 3
                  ? Data.length * 300
                  : Data.length * 150
                : "auto",
            }}
          >
            <VictoryChart
              theme={VictoryTheme.material}
              padding={{ left: 100, right: 50, top: 50, bottom: 100 }}
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
                // labels={({ datum }) => }
                // labelComponent={<VictoryLabel dy={-30} />}
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.y >= 180
                        ? "#4F3AF6"
                        : datum.y > 60 && datum.y < 180
                        ? "#3ac3f4"
                        : "#3af46f",
                  },
                }}
                alignment="middle"
              />

              <VictoryAxis
                dependentAxis
                tickFormat={(tick) => `${totalHours(tick)}`}
                style={{
                  axis: { stroke: "white" },
                  ticks: { stroke: "transparent" },
                  tickLabels: {
                    fill: " #3ac3f4",
                    fontSize: 11,
                  },
                  grid: { stroke: "#d8d8d8" },
                }}
              />

              <VictoryAxis
                tickFormat={(tick: { x: string; y: number }, i: number) =>
                  `${tick}\n ${Data ? totalHours(Data[i].y) : ""}`
                }
                style={{
                  axis: { stroke: "white" },
                  ticks: { stroke: "white" },

                  tickLabels: {
                    fill: "#3af46f",
                    fontSize: 12,
                    angle: 15,
                    padding: 15,
                  },
                  grid: { stroke: "#d8d8d8" },
                }}
                domain={[0, Data ? Data.length + 1 : 1]}
                tickValues={Data && Data.map((_, index) => index + 1)}
              />
            </VictoryChart>
          </div>
        </div>
      )}
    </section>
  );
};
export default Statistics;
