"use client";

import ImageHeader from "@/components/ImageHeader";
import clsx from "clsx";
import PlayerAudio from "./PlayerAudio";
import styles from "../styles.module.scss";
import { Messages } from "@/contexts/ConversationContext/types";
import { User } from "@/contexts/AuthContext/types";

interface MessageWithAudioProps {
  msgs: Messages;
  objMessage: User;
  dateFormated: string;
  count: number;
  user: User;
}

export default function MessageWithAudio({
  msgs,
  objMessage,
  dateFormated,
  count,
  user,
}: MessageWithAudioProps) {
  return (
    <li
      className={clsx(
        msgs.senderId === user!.uid && styles.myMessage,
        count === 0 && styles.lastMessage
      )}
    >
      <div>
        <ImageHeader conversation={objMessage} width={55} height={55} />

        <div className={styles.divAudio}>
          <PlayerAudio src={msgs.newMessage} duration={msgs.audioDuration} />

          <p>{dateFormated}</p>
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
    </li>
  );
}
