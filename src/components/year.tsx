import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ActivityProps } from "../ActivitiesProps";

const Year = (props: ActivityProps) => {
  const { setData, setError, setLoading } = props;
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    setError("");

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/activities/year/?year=${year}`,
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        const YearData = [...response.data].map(
          (activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          }
        );
        setData(YearData);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
  }, [year]);
  //   const weekArr = Array.from({ length: 52 }, (_, i) => i + 1);
  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setYear(year - 1)}
          className="px-4 py-2 bg-indigo-600 w-40 text-white rounded-l-md"
        >
          Précédent
        </button>
        <h1 className="mx-4 text-indigo-600 text-xl font-semibold">{year}</h1>
        <button
          onClick={() => setYear(year + 1)}
          className="px-4 py-2 bg-indigo-600 w-40 text-white rounded-r-md"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
export default Year;
