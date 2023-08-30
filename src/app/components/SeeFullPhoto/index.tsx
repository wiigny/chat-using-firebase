"use client";

import ImageHeader from "@/components/ImageHeader";
import useConversation from "@/hook/useConversation";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { User } from "@/contexts/AuthContext/types";
import formatDate from "@/utils/formatDate";
import useAuth from "@/hook/useAuth";
import Button from "@/components/Button";
import { MdClose, MdDownload } from "react-icons/md";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import clsx from "clsx";

export default function SeeFullPhoto() {
  const { viewFullPhoto, listLastPhotos, setViewFullPhoto } = useConversation();
  const { user } = useAuth();

  const ulRef = useRef<HTMLUListElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [index, setIndex] = useState(0);

  const [userSentPhoto, setUserSentPhoto] = useState<User>();

  useEffect(() => {
    setIndex(listLastPhotos.findIndex((photo) => photo === viewFullPhoto));
  }, [listLastPhotos, viewFullPhoto]);

  useEffect(() => {
    if (viewFullPhoto) {
      setUserSentPhoto({
        uid: viewFullPhoto.senderId,
        email: "",
        photoURL: viewFullPhoto.senderPhoto,
        name: viewFullPhoto.senderName,
      });
    }

    if (liRef.current && ulRef.current) {
      const li = liRef.current;
      const ul = ulRef.current;

      const scrollOffset =
        li.offsetLeft - (ul.offsetWidth - li.offsetWidth) / 2;

      ul.scrollLeft = scrollOffset;
    }
  }, [viewFullPhoto]);

  const handleClose = () => {
    const section = sectionRef.current;

    if (section) {
      section.classList.add(styles.sectionExit);

      setTimeout(() => {
        setViewFullPhoto(undefined);
      }, 500);
    }
  };

  // const handleDownload = async () => {
  //   if (!viewFullPhoto) return;

  //   const image = await fetch(viewFullPhoto.photoUrl);
  //   const imageBlob = await image.blob();
  //   const imageUrl = URL.createObjectURL(imageBlob);

  //   const link = document.createElement("a");
  //   link.href = imageUrl;
  //   link.download = "whatsapp_close_clone_xD.jpg";
  //   link.click();
  // };

  return (
    viewFullPhoto && (
      <section ref={sectionRef} className={styles.sectionFullPhoto}>
        <header>
          {userSentPhoto && (
            <div>
              <ImageHeader
                conversation={userSentPhoto}
                width={45}
                height={45}
              />
              <div>
                <p>
                  {userSentPhoto.uid === user?.uid ? "You" : userSentPhoto.name}
                </p>
                <span>
                  {formatDate(new Date(viewFullPhoto.date.seconds * 1000))}
                </span>
              </div>
            </div>
          )}

          <nav>
            {/* <Button onClick={handleDownload}>
              <MdDownload size={28} />
            </Button> */}

            <Button onClick={handleClose}>
              <MdClose size={28} />
            </Button>
          </nav>
        </header>

        <section>
          <Button
            className={clsx(index === 0 && styles.buttonDisable)}
            onClick={() => {
              setIndex((prev) => prev - 1);
              setViewFullPhoto(listLastPhotos[index - 1]);
            }}
          >
            <BsChevronLeft size={24} />
          </Button>

          <div>
            <figure>
              <Image
                src={viewFullPhoto.photoUrl}
                alt={viewFullPhoto.photoUrl}
                width={1920}
                height={1080}
                onLoad={() => {
                  ulRef.current!.style.scrollBehavior = "smooth";
                }}
              />
            </figure>

            {viewFullPhoto.newMessage && <pre>{viewFullPhoto.newMessage}</pre>}
          </div>

          <Button
            className={clsx(
              index === listLastPhotos.length - 1 && styles.buttonDisable
            )}
            onClick={() => {
              setIndex((prev) => prev + 1);
              setViewFullPhoto(listLastPhotos[index + 1]);
            }}
          >
            <BsChevronRight size={24} />
          </Button>
        </section>

        <footer>
          <ul ref={ulRef}>
            <div></div>
            {listLastPhotos.map((photo, index) => (
              <li
                key={index}
                ref={viewFullPhoto === photo ? liRef : null}
                onClick={() => {
                  setIndex(index);
                  setViewFullPhoto(photo);
                }}
                className={viewFullPhoto === photo ? styles.photoSelected : ""}
              >
                <figure>
                  <Image
                    src={photo.photoUrl}
                    alt={photo.photoUrl}
                    width={100}
                    height={100}
                  />
                </figure>
              </li>
            ))}
            <div></div>
          </ul>
        </footer>
      </section>
    )
  );
}
