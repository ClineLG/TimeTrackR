import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { FaStopCircle } from "react-icons/fa";

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
        "https://site--timetrackr--phx29rm2mv76.code.run/activity/start",
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
        "https://site--timetrackr--phx29rm2mv76.code.run/activity/stop",
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
    <li className=" h-fit  p-4 text-xs bg-gray-800 text-gray-200 rounded-lg  hover:bg-gray-900 transition duration-300">
      <div className="flex justify-between items-center ">
        <p className="font-bold flex-auto"> {activity.name}</p>

        <div className=" flex-auto">
          {!stop ? <p> {formatTime()}</p> : <div></div>}
        </div>
        <button
          className={` bg-gray-200 rounded-lg text-xl  hover:cursor-pointer py-2 px-2  ${
            stop
              ? " text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white hover:border "
              : " text-red-700 hover:bg-gray-800 "
          }`}
          onClick={handleStart}
        >
          {stop ? <VscDebugStart /> : <FaStopCircle />}
        </button>
      </div>
      <div className="flex mt-4 mx-1 justify-between w-full text-xl ">
        <button
          onClick={handleEdit}
          className="text-gray-00 hover:cursor-pointer hover:text-yellow-400 focus:outline-none flex items-center gap-1.5"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => {
            if (!stop) {
              handleStart();
            }
            handleDelete(activity._id);
          }}
          className="text-red-700 hover:cursor-pointer hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </li>
  );
});
