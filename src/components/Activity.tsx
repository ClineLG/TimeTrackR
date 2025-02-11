import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export const Activity = ({
  activity,
  handleDelete,
}: {
  activity: { name: string; id: string };
  handleDelete: (name: string) => Promise<void>;
}) => {
  const { checkUser } = useContext(UserContext);
  const [stop, setStop] = useState(true);
  const [time, setTime] = useState(0);

  const handleStart = async () => {
    if (stop) {
      const response = await axios.post(
        "http://localhost:3000/activity/start",
        { name: name },
        {
          headers: {
            Authorization: "Bearer " + checkUser(),
          },
        }
      );
      console.log(response.data);
    } else {
      const response = await axios.post(
        "http://localhost:3000/activity/stop",
        { name: name },
        {
          headers: {
            Authorization: "Bearer " + checkUser(),
          },
        }
      );
      console.log(response.data);
      setTime(0);
    }

    setStop(!stop);
  };

  useEffect(() => {
    let interval = 0;
    if (!stop) {
      interval = setInterval(() => {
        setTime((s: number) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [stop]);

  const formatTime = () => {
    if (!stop) {
      return `${String(Math.floor(time / 3600)).padStart(2, "0")}:${String(
        Math.floor((time % 3600) / 60)
      ).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`;
    } else {
      return "00:00:00";
    }
  };

  // const handleDelete=async()=>{
  //    try {

  //     const response=await axios.delete('http://localhost:3000/activity/delete',

  //     {  data: { name: name },
  //       headers: {
  //         Authorization: "Bearer " + checkUser(),
  //       },
  //     })
  //     console.log(response.data)

  //    } catch (error) {
  //     console.log(error)

  //    }

  // }

  return (
    <li className="bg-gray-500 text-white border border-gray-700 rounded-[5px] flex justify-around py-2 px-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
      <p> {activity.name}</p>
      <p>{formatTime()}</p>
      <button
        className={
          stop
            ? "bg-green-500 text-white border border-green-700 rounded py-2 px-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            : "bg-red-500 text-white border border-red-700 rounded py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        }
        onClick={handleStart}
      >
        {stop ? "Start" : "Stop"}
      </button>
      <button
        onClick={() => {
          handleDelete(activity.id);
        }}
      >
        delete
      </button>
    </li>
  );
};
