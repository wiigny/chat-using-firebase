import { Contacts, User } from "@/contexts/AuthContext/types";
import { db } from "@/firebase";
import { v4 as uuid } from "uuid";
import {
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import checkCollectionChatsExists from "./checkCollectionChatsExists";
import handleLineTextarea from "./handleLineTextarea";
import { RefObject } from "react";

const sendMessage = async (
  newMessage: string,
  conversation: Contacts,
  user: User,
  RefObject: RefObject<HTMLTextAreaElement>,
  setNewMessage: (string: string) => void
) => {
  if (!newMessage) {
    return;
  }

  try {
    await checkCollectionChatsExists(conversation, user);

    setNewMessage("");

    await updateDoc(doc(db, "chats", conversation!.chatId), {
      messages: arrayUnion({
        id: uuid(),
        newMessage: newMessage.trim(),
        senderId: user!.uid,
        date: Timestamp.now(),
      }),
    });

    handleLineTextarea(RefObject);

    await updateDoc(doc(db, "userChats", user!.uid), {
      [conversation!.chatId + ".lastMessage"]: {
        newMessage: newMessage.trim(),
      },
      [conversation!.chatId + ".date"]: Timestamp.now(),
    });

    await updateDoc(doc(db, "userChats", conversation!.user.uid), {
      [conversation!.chatId + ".lastMessage"]: {
        newMessage: newMessage.trim(),
      },
      [conversation!.chatId + ".date"]: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

export default sendMessage;
