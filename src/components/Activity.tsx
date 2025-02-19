import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

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
    <li className="p-6 bg-white text-gray-900 border border-gray-300 rounded-lg flex justify-between items-center  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300">
      <p className="text-2xl font-semibold w-1/3"> {activity.name}</p>

      <div className="flex items-center space-x-4 flex-auto justify-between">
        <p className="text-2xl text-gray-600">{formatTime()}</p>{" "}
        <button
          className={
            stop
              ? "bg-green-500 text-white border border-green-700 rounded-lg py-2 px-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              : "bg-red-500 text-white border border-red-700 rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          }
          onClick={handleStart}
        >
          {stop ? "Start" : "Stop"}
        </button>
      </div>
      <div className="flex space-x-2 gap-8 w-1/3 justify-end">
        <button
          onClick={() => {
            if (!stop) {
              handleStart();
            }
            handleDelete(activity._id);
          }}
          className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaRegTrashAlt />
        </button>

        <button
          onClick={handleEdit}
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none flex items-center gap-1.5"
        >
          <MdEdit />
          <span> Add Time</span>
        </button>
      </div>
    </li>
  );
});
