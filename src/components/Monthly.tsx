import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState, useContext } from "react";
// import dateFormat from "../utils/dateFormat";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ActivityProps } from "../ActivitiesProps";

const Monthly = (props: ActivityProps) => {
  const { setData, setError, setLoading } = props;
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString()
  );
  const [date, setDate] = useState<Date | null>(null);
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    setError("");

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:3000/activities/month/?year=${year}&month=${month}`,
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        const monthlyData = [...response.data].map(
          (activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          }
        );
        setData(monthlyData);
        console.log(response.data);
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
  }, [year, month]);

  return (
    <Calendar
      onClickMonth={(event) => {
        setDate(event);
        setYear(event.getFullYear().toString());
        setMonth((event.getMonth() + 1).toString());
      }}
      view="year"
      value={date}
      className="shadow-lg rounded-lg border border-gray-300 place-items-center self-center m-5"
    />
  );
};
export default Monthly;
