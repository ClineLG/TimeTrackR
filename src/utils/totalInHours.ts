const totalHours = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${String(hours).padStart(2, "0")} H ${String(minutes).padStart(
    2,
    "0"
  )} min`;
};

export default totalHours;
