import axios from "axios";
import { useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { UserContext } from "../context/UserContext";

const ModalEdit = ({
  setEdit,
  idToEdit,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  idToEdit: {
    name: string;
    id: string;
  };
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState({ hours: "", minutes: "" });
  const [error, setError] = useState("");
  const { checkUser } = useContext(UserContext);

  console.log(date);

  const handleSubmit = async () => {
    setError("");
    if (!date) {
      setError("Please select a day");
    } else {
      try {
        const totalTime = Number(time.hours) * 60 + Number(time.minutes);
        console.log("Total", totalTime);
        const response = await axios.post(
          "https://site--timetrackr--phx29rm2mv76.code.run/activity/addTime",

          { id: idToEdit.id, date: date, time: totalTime, name: idToEdit.name },
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        if (response) {
          setEdit(false);
        }
      } catch (error) {
        if (error) {
          setError("An error occurred");
        }
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgb(255,255,255)]/50 flex justify-center items-center z-10">
      <div className="bg-gray-800 text-gray-200 p-5 sm:p-10 rounded-lg  w-90   h-auto flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-semibold mb-4">Add time</h2>

        <div className="flex gap-2.5 justify-center place-items-center">
          <input
            type="number"
            id="hour"
            className="w-16 p-3 mb-4 border  border-gray-300 rounded-lg text-lg focus:outline-none"
            placeholder="00"
            onChange={(event) => {
              const obj = { ...time, hours: event.target.value };
              setTime(obj);
            }}
            value={time.hours}
          />
          <label htmlFor="hour" className="block text-lg mb-2">
            H
          </label>
          <input
            id="min"
            type="number"
            onChange={(event) => {
              const obj = { ...time, minutes: event.target.value };
              setTime(obj);
            }}
            value={time.minutes}
            className="w-16 p-3 mb-4 border  border-gray-300 rounded-lg text-lg focus:outline-none"
            placeholder="00"
          />
          <label htmlFor="min" className="block text-lg mb-2">
            min
          </label>
        </div>
        <div className="w-full  text-gray-800 rounded-2xl">
          <Calendar
            onChange={(event) => {
              if (Array.isArray(event)) {
                setDate(event[0]);
              } else {
                setDate(event);
              }
            }}
            locale="en-GB"
            value={date} // La date affichée dans le calendrier
            className="rounded-lg react-calendar text-xs"
          />
        </div>
        {error && <p className="text-red-600">{error} </p>}
        <div className=" flex mt-5  w-full  my-2 justify-between h-10">
          <button
            className="px-3 py-3 bg-gray-200  box-border rounded-2xl text-xs font-medium text-gray-800 hover:border-gray-200 hover:border hover:cursor-pointer hover:bg-gray-800 hover:text-gray-200 transition"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-3 bg-green-800 rounded-2xl text-xs font-medium text-white hover:cursor-pointer hover:bg-green-600 transition"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalEdit;
