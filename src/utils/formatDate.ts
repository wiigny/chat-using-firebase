const formatDate = (date: Date, days?: boolean) => {
  const minute =
    String(date.getMinutes()).length > 1
      ? String(date.getMinutes())
      : "0" + date.getMinutes();

  const hours =
    String(date.getHours()).length === 1
      ? `0${date.getHours()}`
      : date.getHours();

  const today = new Date();

  if (days) {
    const difDays = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (difDays === 0) {
      return "Today";
    } else if (difDays === 1) {
      return "Yesterday";
    } else if (difDays > 1 && difDays < 7) {
      const day = date.getDay();

      if (day == 0) return "Sunday";
      if (day == 1) return "Monday";
      if (day == 2) return "Tuesday";
      if (day == 3) return "Wednesday";
      if (day == 4) return "Thursday";
      if (day == 5) return "Friday";
      if (day == 6) return "Saturday";
    } else {
      const day = date.getDate();
      const mounth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${mounth}/${year}`;
    }
  }

  return hours + ":" + minute;
};

export default formatDate;
