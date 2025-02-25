import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ActivityProps } from "../ActivitiesProps";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

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
          `https://site--timetrackr--phx29rm2mv76.code.run/activities/year/?year=${year}`,
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        const YearData = [...response.data]
          .map((activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          })
          .filter((activity) => activity.y !== 0)
          .sort((a, b) => b.y - a.y);
        setData(YearData);
        if (YearData.length < 1) {
          setError("No data available");
        }
        setLoading(false);
      } catch (error) {
        if (error) {
          if (
            axios.isAxiosError(error) &&
            error.response?.data.message === "no data"
          ) {
            setError("No data available");
          } else {
            setError("An error occurred");
          }
        }

        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  return (
    <div className="flex items-center justify-center  p-4 rounded-2xl">
      <button
        className="bg-gray-200 p-4 rounded-2xl text-xl  hover:bg-gray-50"
        onClick={() => setYear(year - 1)}
      >
        <FaChevronLeft />
      </button>
      <h1 className="mx-4 text-white text-2xl font-semibold"> {year}</h1>
      <button
        className="bg-gray-200 p-4 rounded-2xl text-xl hover:bg-gray-50"
        onClick={() => setYear(year + 1)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
export default Year;
