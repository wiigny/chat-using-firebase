"use client";

import useAuth from "@/hook/useAuth";
import styles from "./styles.module.scss";
import useConversation from "@/hook/useConversation";
import ImageHeader from "@/components/ImageHeader";
import combinedIds from "@/utils/combinedIds";
import clsx from "clsx";
import { MdCameraAlt, MdOutlineMic } from "react-icons/md";
import formatDate from "@/utils/formatDate";
import { BsFillChatLeftTextFill } from "react-icons/bs";

export default function ListContacts() {
  const { user } = useAuth();
  const {
    contacts,
    setConversation,
    conversation,
    setListLastPhotos,
    setNewMessage,
  } = useConversation();

  let contactLength = false;

  if (contacts) {
    contactLength = Object.entries(contacts).length > 0;
  }

  return (
    <ul className={styles.ulContactList}>
      {contactLength && contacts ? (
        Object.entries(contacts).map((val, index) => {
          const contact = {
            ...val[1].userInfo,
            name: val[1].userInfo.displayName,
          };

          const date = new Date(val[1].date?.seconds * 1000);

          const dateFormated = formatDate(date, true);

          const audioDuration = val[1].lastMessage?.audioDuration;

          const audioMinute = Math.floor(audioDuration / 60);
          const audioSeconds =
            audioDuration > 60 ? audioDuration % 60 : audioDuration;

          const audioFormat =
            audioDuration &&
            `${audioMinute}:${
              audioSeconds < 10 ? "0" + audioSeconds : audioSeconds
            }`;

          const isPhoto = val[1].lastMessage?.photo;
          const message = val[1].lastMessage?.newMessage;

          return (
            <li
              key={val[0]}
              className={clsx(
                !Object.entries(contacts)[index + 1] && styles.lastContact,
                val[0] === conversation?.chatId && styles.contactSelect
              )}
              onClick={() => {
                val[0] !== conversation?.chatId && setListLastPhotos([]);
                setNewMessage("");
                setConversation({
                  chatId: combinedIds(user!.uid, contact.uid),
                  user: contact,
                });
              }}
            >
              <ImageHeader conversation={contact} />

              <div>
                <div>
                  <p>{contact.name}</p>

                  {message && <span>{dateFormated}</span>}
                </div>

                {audioDuration ? (
                  <div>
                    <MdOutlineMic size={18} />

                    <p>{audioFormat}</p>
                  </div>
                ) : isPhoto ? (
                  <div>
                    <MdCameraAlt size={18} />

                    <p>{message}</p>
                  </div>
                ) : (
                  <p>{message}</p>
                )}
              </div>
            </li>
          );
        })
      ) : (
        <div className={styles.emptyContact}>
          <p>
            To start a messaging contacts who have this Chat, tap{" "}
            <BsFillChatLeftTextFill size={14} /> at the top
          </p>
        </div>
      )}
    </ul>
  );
}
