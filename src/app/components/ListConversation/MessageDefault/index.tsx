"use client";

import clsx from "clsx";
import styles from "../styles.module.scss";
import { Messages } from "@/contexts/ConversationContext/types";
import { User } from "@/contexts/AuthContext/types";

interface MessageDefaultProps {
  msgs: Messages;
  count: number;
  dateFormated: string;
  user: User;
}

export default function MessageDefault({
  count,
  dateFormated,
  msgs,
  user,
}: MessageDefaultProps) {
  return (
    <li
      className={clsx(
        msgs.senderId === user!.uid && styles.myMessage,
        count === 0 && styles.lastMessage
      )}
    >
      <div className={styles.textResponsive}>
        <pre>{msgs.newMessage.replace(/\n+/g, "\n")}</pre>
        <div>
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
    </li>
  );
}
