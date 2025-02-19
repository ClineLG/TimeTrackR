import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState, useContext } from "react";
import dateFormat from "../utils/dateFormat";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ActivityProps } from "../ActivitiesProps";

const Daily = (props: ActivityProps) => {
  const { setData, setError, setLoading } = props;
  const [date, setDate] = useState<string>(dateFormat(new Date()));
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    setError("");

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/activities/daily/?date=${date}`,
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
        // console.log(response.data);
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
  }, [date]);

  return (
    <Calendar
      onChange={(event) => {
        if (Array.isArray(event)) {
          if (event[0]) {
            setDate(dateFormat(new Date(event[0])));
          }
        } else {
          if (event) {
            setDate(dateFormat(new Date(event)));
          }
        }
      }}
      value={date}
      className="shadow-lg rounded-b-4xl  place-items-center p-4 self-center m-5"
    />
  );
};
export default Daily;
