"use client";

import useConversation from "@/hook/useConversation";
import styles from "./styles.module.scss";
import useAuth from "@/hook/useAuth";
import formatDate from "@/utils/formatDate";
import MessageWithAudio from "./MessageWithAudio";
import MessageDefault from "./MessageDefault";
import { useEffect, useRef } from "react";
import MessageWithPhoto from "./MessageWithPhoto";

export default function ListConversation() {
  const { user } = useAuth();

  const { conversation, messages } = useConversation();

  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ulHeight = ulRef.current?.scrollHeight;

    ulRef.current?.scrollTo({
      top: ulHeight,
    });
  }, [messages]);

  let count = 0;

  return (
    conversation &&
    user && (
      <ul className={styles.ulConversation} ref={ulRef}>
        {messages &&
          messages.map((msgs, index) => {
            const date = new Date(msgs.date.seconds * 1000);

            const dateFormated = formatDate(date);

            if (messages[index - 1]?.senderId !== msgs.senderId) {
              count = 0;
            }

            count++;

            if (msgs.newMessage.includes(".mp3")) {
              const objMessage = {
                uid: "",
                email: "",
                photoURL: msgs.senderPhoto,
                name: msgs.senderName,
              };

              return (
                <MessageWithAudio
                  key={msgs.id}
                  msgs={msgs}
                  count={count}
                  dateFormated={dateFormated}
                  objMessage={objMessage}
                  user={user}
                />
              );
            }

            if (msgs.photoUrl) {
              return (
                <MessageWithPhoto
                  key={msgs.id}
                  msgs={msgs}
                  count={count}
                  dateFormated={dateFormated}
                  user={user}
                  ulRef={ulRef}
                />
              );
            }

            return (
              <MessageDefault
                key={msgs.id}
                msgs={msgs}
                count={count}
                dateFormated={dateFormated}
                user={user}
              />
            );
          })}
      </ul>
    )
  );
}
