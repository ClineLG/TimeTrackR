import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState, useContext } from "react";
import dateFormat from "../utils/dateFormat";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Daily = ({
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
  //   const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string>(dateFormat(new Date()));
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        console.log(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error);
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
      value={date} // La date affichée dans le calendrier
      className="shadow-lg rounded-lg border border-gray-300 place-items-center"
    />
  );
};
export default Daily;
