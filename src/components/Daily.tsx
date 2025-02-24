import Calendar from "react-calendar";
import "../calendar.css";
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
          `https://site--timetrackr--phx29rm2mv76.code.run/activities/daily/?date=${date}`,
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        const daylyData = [...response.data]
          .map((activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          })
          .filter((activity) => activity.y !== 0)
          .sort((a, b) => b.y - a.y);
        setData(daylyData);
        if (daylyData.length < 1) {
          setError("Data unavailable");
        }
        // console.log("ResponseDaily", response.data);
        // console.log("ResponseData", daylyData);

        setLoading(false);
      } catch (error) {
        console.log(error);
        if (
          axios.isAxiosError(error) &&
          error.response?.data.message === "no data"
        ) {
          setError("Data unavailable");
        } else {
          setError("An error occurred");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);

  return (
    <div className="w-full">
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
        locale="en-GB"
        value={date}
        className="w-full rounded-2xl p-1  mx-auto"
      />
    </div>
  );
};
export default Daily;
