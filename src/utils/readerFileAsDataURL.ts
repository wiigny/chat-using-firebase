const readFileAsDataURL = (file: File): Promise<string | ArrayBuffer> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result);
      }
    };

    reader.readAsDataURL(file);
  });
};

export default readFileAsDataURL;
