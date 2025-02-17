import { useEffect, useState, useContext } from "react";
// import dateFormat from "../utils/dateFormat";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import weekOfYear from "../utils/weekOfYear";

const Weekly = ({
  setData,
}: {
  setData: React.Dispatch<
    React.SetStateAction<
      | {
          x: string;
          y: number;
        }[]
      | undefined
    >
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [week, setWeek] = useState<number>(weekOfYear(new Date()));
  //   const [date, setDate] = useState<Date | null>(null);
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(year, "week", week);
        const response = await axios.get(
          `http://localhost:3000/activities/weekly/?year=${year}&week=${week}`,
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        const WeeklyData = [...response.data].map(
          (activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          }
        );
        setData(WeeklyData);
        console.log(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [year, week]);
  const weekArr = Array.from({ length: 52 }, (_, i) => i + 1);
  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setYear(Number(year) - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-md"
        >
          &#60; Précédent
        </button>
        <h1 className="mx-4 text-xl font-semibold">{year}</h1>
        <button
          onClick={() => Number(year) + 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        >
          Suivant &#62;
        </button>
      </div>

      <h2 className="text-center mb-4">
        Sélectionnez une semaine de l'année {year}
      </h2>
      <div className="grid grid-cols-13 gap-4">
        {weekArr.map((Week) => (
          <div
            key={Week}
            className={`p-4 cursor-pointer border-2 rounded-md text-center ${
              Week === week ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setWeek(Week)}
          >
            Semaine {Week}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Weekly;
