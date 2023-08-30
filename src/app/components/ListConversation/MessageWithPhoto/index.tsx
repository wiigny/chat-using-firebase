"use client";

import clsx from "clsx";
import styles from "../styles.module.scss";
import Image from "next/image";
import { Messages } from "@/contexts/ConversationContext/types";
import { User } from "@/contexts/AuthContext/types";
import useConversation from "@/hook/useConversation";
import { RefObject, useEffect, useState } from "react";

interface ListPhotoProps {
  msgs: Messages;
  count: number;
  dateFormated: string;
  user: User;
  ulRef: RefObject<HTMLUListElement>;
}

export default function MessageWithPhoto({
  msgs,
  count,
  dateFormated,
  user,
  ulRef,
}: ListPhotoProps) {
  const { setListLastPhotos, setViewFullPhoto } = useConversation();
  const [loadImg, setLoadImg] = useState(true);

  useEffect(() => {
    setListLastPhotos((prev) => [...prev, msgs]);
  }, [msgs, setListLastPhotos]);

  useEffect(() => {
    const ulHeight = ulRef.current?.scrollHeight;

    ulRef.current?.scrollTo({
      top: ulHeight,
    });
  }, [loadImg, ulRef]);

  return (
    <div
      className={clsx(
        styles.photoMessage,
        msgs.senderId === user!.uid && styles.myMessage,
        count === 0 && styles.lastMessage
      )}
      hidden={loadImg}
    >
      <div>
        <figure onClick={() => setViewFullPhoto(msgs)}>
          <Image
            src={msgs.photoUrl}
            alt="image received"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setLoadImg(false)}
          />
        </figure>

        <div>
          {msgs.newMessage && (
            <pre>{msgs.newMessage.replace(/\n+/g, "\n")}</pre>
          )}

          <div className={clsx(msgs.newMessage && styles.divDateWPhoto)}>
            <p>{dateFormated}</p>
            <span>{dateFormated}</span>
          </div>

          {count === 1 && (
            <span
              className={clsx(
                msgs.senderId === user!.uid
                  ? styles.myfirstMessage
                  : styles.firstMessage
              )}
            ></span>
          )}
        </div>
      </div>
    </div>
  );
}
