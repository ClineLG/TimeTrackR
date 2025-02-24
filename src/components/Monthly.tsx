import Calendar from "react-calendar";
import "../calendar.css";
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
          `https://site--timetrackr--phx29rm2mv76.code.run/activities/month/?year=${year}&month=${month}`,
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        const monthlyData = [...response.data]
          .map((activity: { id: string; name: string; time: number }) => {
            return { x: activity.name, y: activity.time };
          })
          .filter((activity) => activity.y !== 0)
          .sort((a, b) => b.y - a.y);
        setData(monthlyData);
        if (monthlyData.length < 1) {
          setError("No data available");
        }
        console.log(response.data);
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
  }, [year, month]);

  return (
    <div className="w-3/4 sm:w-fit">
      <Calendar
        onClickMonth={(event) => {
          setDate(event);
          setYear(event.getFullYear().toString());
          setMonth((event.getMonth() + 1).toString());
        }}
        locale="en-GB"
        view="year"
        value={date}
        className="rounded-2xl p-2 "
      />
    </div>
  );
};
export default Monthly;
