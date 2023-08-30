import { Dispatch, SetStateAction } from "react";
import readFileAsDataURL from "./readerFileAsDataURL";

const handlePhotos = async (
  file: FileList | null,
  setPhotos: Dispatch<
    SetStateAction<
      {
        file: File;
        url: string | ArrayBuffer;
      }[]
    >
  >
) => {
  const files = Object.values(file!);

  const mimeTypes = ["image/jpeg", "image/gif", "image/png"];

  const filterPhotos = files.filter((photo) => mimeTypes.includes(photo.type));

  const getUrlPhotos = filterPhotos.map(async (photo) => {
    const url = await readFileAsDataURL(photo);
    return {
      file: photo,
      url: url,
    };
  });

  Promise.all(getUrlPhotos).then((result) =>
    setPhotos((prev) => [...prev, ...result])
  );
};

export default handlePhotos;
