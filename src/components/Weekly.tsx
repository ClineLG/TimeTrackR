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
        const WeeklyData = [...response.data]
          .map((activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          })
          .filter((activity) => activity.y !== 0)
          .sort((a, b) => b.y - a.y);
        if (WeeklyData.length < 1) {
          setError("No data available");
        }
        setData(WeeklyData);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.data.message === "no data"
        ) {
          setError("No data available");
        } else {
          setError("An error occurred");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [year, week]);
  // const weekArr = Array.from({ length: 52 }, (_, i) => i + 1);
  return (
    <div className="p-5 rounded-2xl">
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setYear(Number(year) - 1)}
          className="bg-gray-200 p-4 rounded-2xl text-xl hover:bg-gray-50"
        >
          <FaChevronLeft />
        </button>
        <h1 className="mx-4 text-white text-2xl font-semibold"> {year}</h1>
        <button
          onClick={() => setYear(Number(year) + 1)}
          className="bg-gray-200 p-4 rounded-2xl text-xl hover:bg-gray-50"
        >
          <FaChevronRight />
        </button>
      </div>

      <div>
        <div className="flex px-2 bg-gray-200 py-4 rounded-2xl justify-center items-center gap-2 text-gray-800">
          {week !== 1 ? (
            <button className="bg-gray-800 text-gray-200 p-4 rounded-2xl text-xl  hover:bg-gray-500">
              <FaChevronLeft onClick={() => setWeek(week - 1)} />
            </button>
          ) : (
            <div className="w-13"></div>
          )}

          <p className=" text-xl font-semibold">Week {week}</p>
          {week !== 52 ? (
            <button className="bg-gray-800 text-gray-200 p-4 rounded-2xl text-xl hover:bg-gray-500">
              <FaChevronRight onClick={() => setWeek(week + 1)} />
            </button>
          ) : (
            <div className="w-13"></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Weekly;
