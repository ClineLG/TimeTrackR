export const ButtonStatistics = ({
  title,
  setSelectedTime,
  time,
  selectedTime,
}: {
  title: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  time: string;
  selectedTime: string;
}) => {
  const handleSelectTime = (time: string) => setSelectedTime(time);

  return (
    <button
      className={` ${
        selectedTime === time
          ? " bg-gray-400  text-gray-800 border-3  "
          : "bg-gray-800 text-gray-200 hover:bg-gray-600 "
      } py-3 w-20 rounded-lg hover:cursor-pointer `}
      onClick={() => handleSelectTime(time)}
    >
      {title}
    </button>
  );
};
