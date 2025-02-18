export const ButtonStatistics = ({
  title,
  setSelectedTime,
  time,
}: {
  title: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  time: string;
}) => {
  const handleSelectTime = (time: string) => setSelectedTime(time);

  return (
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-blue-600 mx-2"
      onClick={() => handleSelectTime(time)}
    >
      {title}
    </button>
  );
};
