const totalHours = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours} H ${String(minutes).padStart(2, "0")} min`;
};

export default totalHours;
