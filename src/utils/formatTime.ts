const formatTime = (time: number) => {
  if (time < 10) {
    return `00:0${time}`;
  } else if (time < 60) {
    return `00:${time}`;
  } else if (time > 59) {
    const minute =
      time / 60 < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
    const second = time % 60 < 10 ? `0${time % 60}` : time % 60;

    return `${minute}:${second}`;
  }

  return "00:00";
};

export default formatTime;
