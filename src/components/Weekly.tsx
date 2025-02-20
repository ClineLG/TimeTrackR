import { useEffect, useState, useContext } from "react";
// import dateFormat from "../utils/dateFormat";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import weekOfYear from "../utils/weekOfYear";
import { ActivityProps } from "../ActivitiesProps";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Weekly = (props: ActivityProps) => {
  const { setData, setError, setLoading } = props;

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [week, setWeek] = useState<number>(weekOfYear(new Date()));
  //   const [date, setDate] = useState<Date | null>(null);
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    setError("");
    const fetchData = async () => {
      try {
        setLoading(true);
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
        if (WeeklyData.length < 1) {
          setError("Pas de données disponnibles");
        }
        setData(WeeklyData);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.data.message === "no data"
        ) {
          setError("Données indisponibles");
        } else {
          setError("Une erreur est survenue");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [year, week]);
  // const weekArr = Array.from({ length: 52 }, (_, i) => i + 1);
  return (
    <div className=" bg-indigo-600 p-5 rounded-2xl">
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setYear(Number(year) - 1)}
          className="px-4 py-2 w-28 bg-white text-indigo-600 rounded-2xl font-bold"
        >
          Précédent
        </button>
        <h1 className="mx-4 text-xl font-semibold text-white">Année {year}</h1>
        <button
          onClick={() => setYear(Number(year) + 1)}
          className="px-4 py-2 w-28 bg-white text-indigo-600 rounded-2xl font-bold"
        >
          Suivant
        </button>
      </div>

      <div>
        <div className="flex justify-center items-center gap-2 text-white">
          {week !== 1 ? (
            <FaChevronLeft onClick={() => setWeek(week - 1)} />
          ) : (
            <div></div>
          )}

          <p>Semaine {week}</p>
          {week !== 52 ? (
            <FaChevronRight onClick={() => setWeek(week + 1)} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Weekly;
