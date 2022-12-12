export const formatDate = (date: Date) => {
  const newDate = `${
    date.getDate() < 10 ? `${date.getDate()}0` : date.getDate()
  }/${
    date.getMonth() < 10 ? `${date.getMonth}0` : date.getMonth()
  }/${date.getFullYear()}`;

  return newDate;
};
