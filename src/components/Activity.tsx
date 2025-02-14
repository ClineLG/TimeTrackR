import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export const Activity = React.memo(function Activity(props: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  activity: {
    name: string;
    _id: string;
    pending:
      | { year: number; week: number; day: number; time: number }
      | undefined;
  };
  handleDelete: (id: string) => Promise<void>;
  setIdToEdit: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
    }>
  >;
}) {
  const { activity, handleDelete, setEdit, setIdToEdit } = props;
  const { checkUser } = useContext(UserContext);
  const [stop, setStop] = useState(true);
  const [time, setTime] = useState(0);

  const handleStart = async () => {
    if (stop) {
      const response = await axios.post(
        "http://localhost:3000/activity/start",
        { id: activity._id },
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
        { id: activity._id, name: activity.name },
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

  const handleEdit = async () => {
    const obj = { name: activity.name, id: activity._id };
    setIdToEdit(obj);
    setEdit(true);
  };

  useEffect(() => {
    if (activity.pending) {
      setStop(false);
      const TimeNow = new Date().getTime();
      const time = ((TimeNow - activity.pending.time) / 1000).toFixed(0);
      setTime(Number(time));
    }
  }, []);
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

  return (
    <>
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
            if (!stop) {
              handleStart();
            }
            handleDelete(activity._id);
          }}
        >
          delete
        </button>

        <button onClick={handleEdit}>Edit</button>
      </li>
    </>
  );
});
