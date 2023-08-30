"use client";

import Button from "@/components/Button";
import useConversation from "@/hook/useConversation";
import styles from "./styles.module.scss";

import { IoMdAdd, IoMdClose } from "react-icons/io";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdSend } from "react-icons/md";
import GroupInput from "@/components/InputGroup/groupInput";
import handlePhotos from "@/utils/handlePhotos";
import Form from "@/components/Form";
import handleLineTextarea from "@/utils/handleLineTextarea";
import handleLineBreak from "@/utils/handleLineBreak";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import sendPhoto from "@/utils/sendPhoto";
import useAuth from "@/hook/useAuth";

export default function MessageWithPhoto() {
  const { photos, setPhotos, conversation } = useConversation();

  const { user } = useAuth();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useState("");

  const [seePhoto, setSeePhoto] = useState<{
    file: File;
    url: string | ArrayBuffer;
  }>();

  useEffect(() => {
    setSeePhoto(photos[0]);
  }, [photos]);

  const handleClose = () => {
    setPhotos([]);
    setSeePhoto(undefined);
    setMessage("");
  };

  const handleDeletePhoto = (photo: {
    file: File;
    url: string | ArrayBuffer;
  }) => {
    const deletePhoto = photos.filter((obj) => obj != photo);

    setPhotos(deletePhoto!);
  };

  const handleSendPhotos = async () => {
    photos.map(async (photo) => {
      const date = new Date().getTime();
      const extension = photo.file.type.split("/")[1];

      const storageref = ref(
        storage,
        `photos/chats/${conversation?.chatId}/${date}.${extension}`
      );

      await uploadBytes(storageref, photo.file);

      const photoUrl = await getDownloadURL(storageref);

      sendPhoto(photoUrl, conversation!, message, user!);

      handleClose();
    });
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.key === "Enter" && event.ctrlKey) {
        handleLineBreak(textareaRef);
      } else {
        event.preventDefault();
        handleSendPhotos();
      }
    }
  };

  return seePhoto ? (
    <section className={styles.sectionPhotos}>
      <header>
        <nav>
          <Button onClick={handleClose}>
            <IoMdClose size={24} />
          </Button>
        </nav>
      </header>

      <figure>
        <Image src={String(seePhoto.url)} alt={seePhoto.file.name} fill />
      </figure>

      <Form>
        <div>
          <textarea
            ref={textareaRef}
            onInput={() => handleLineTextarea(textareaRef)}
            placeholder="Message"
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </div>
      </Form>

      <footer>
        <ul>
          {photos.map((photo, index) => (
            <li
              key={index}
              className={
                photo.file === seePhoto.file ? styles.photoSelected : ""
              }
              onClick={() => setSeePhoto(photo)}
            >
              <Button onClick={() => handleDeletePhoto(photo)}>
                <IoMdClose size={18} />
              </Button>

              <figure>
                <Image src={String(photo.url)} alt={photo.file.name} fill />
              </figure>
            </li>
          ))}

          <GroupInput
            type="file"
            id="morePhotos"
            name="morePhotos"
            hidden
            multiple
            onChange={(e) => handlePhotos(e.target.files, setPhotos)}
          />

          <label htmlFor="morePhotos">
            <IoMdAdd size={24} />
          </label>
        </ul>
        <Button onClick={handleSendPhotos}>
          <MdSend size={24} />
        </Button>
      </footer>
    </section>
  ) : null;
}
