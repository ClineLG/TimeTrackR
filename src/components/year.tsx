import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Year = ({
  setData,
  setError,
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
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    setError("");
    const fetchData = async () => {
      try {
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
        // setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Pas de donées pour cette date");
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
          className="px-4 py-2 bg-blue-500 text-white rounded-l-md"
        >
          Précédent
        </button>
        <h1 className="mx-4 text-xl font-semibold">{year}</h1>
        <button
          onClick={() => setYear(year + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
export default Year;
