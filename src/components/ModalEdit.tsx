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
  const { checkUser } = useContext(UserContext);

  const handleSubmit = async () => {
    try {
      const totalTime = Number(time.hours) * 60 + Number(time.minutes);
      console.log("Total", totalTime);
      const response = await axios.post(
        "http://localhost:3000/activity/addTime",

        { id: idToEdit.id, date: date, time: totalTime, name: idToEdit.name },
        {
          headers: {
            Authorization: "Bearer " + checkUser(),
          },
        }
      );
      console.log(response);
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white  p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Ajouter du Temps</h2>

        <div className="flex gap-2.5 justify-center place-items-center">
          <input
            type="number"
            className="w-15 p-3 mb-4 border border-gray-300 rounded-lg  focus:outline-none"
            placeholder="heures"
            onChange={(event) => {
              const obj = { ...time, hours: event.target.value };
              setTime(obj);
            }}
            value={time.hours}
          />
          <label className="block text-lg mb-2">H</label>
          <input
            type="number"
            onChange={(event) => {
              const obj = { ...time, minutes: event.target.value };
              setTime(obj);
            }}
            value={time.minutes}
            className="w-15 p-3 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none"
            placeholder="minutes"
          />
          <label className="block text-lg mb-2">minutes</label>
        </div>
        <label className="block text-lg mb-2">Date :</label>

        <Calendar
          onChange={(event) => {
            if (Array.isArray(event)) {
              setDate(event[0]);
            } else {
              setDate(event);
            }
          }}
          value={date} // La date affichée dans le calendrier
          className="shadow-lg rounded-lg border border-gray-300 place-items-center"
        />
        <div className="flex justify-between">
          <button
            className="px-6 py-2 bg-gray-300 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-400 transition"
            onClick={() => setEdit(false)}
          >
            Annuler
          </button>
          <button
            className="px-6 py-2 bg-green-600 rounded-lg text-lg font-medium text-white hover:bg-green-700 transition"
            onClick={handleSubmit}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalEdit;
