const initialLetters = (name: string) => {
  const nameArr = name.split(" ");

  if (nameArr.length <= 1) {
    return nameArr[0][0].toUpperCase();
  } else {
    return (
      nameArr[0][0].toUpperCase() + nameArr[nameArr.length - 1][0].toUpperCase()
    );
  }
};
export default initialLetters;
