import { Contacts, User } from "@/contexts/AuthContext/types";
import { db } from "@/firebase";
import {
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import checkCollectionChatsExists from "./checkCollectionChatsExists";

const sendAudio = async (
  url: string,
  conversation: Contacts,
  user: User,
  duration: string
) => {
  try {
    await checkCollectionChatsExists(conversation, user);

    await updateDoc(doc(db, "chats", conversation.chatId), {
      messages: arrayUnion({
        id: uuid(),
        newMessage: url,
        audioDuration: duration,
        senderId: user.uid,
        senderPhoto: user.photoURL,
        senderName: user.name,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [conversation.chatId + ".lastMessage"]: {
        newMessage: url,
        audioDuration: duration,
      },
      [conversation!.chatId + ".date"]: Timestamp.now(),
    });

    await updateDoc(doc(db, "userChats", conversation.user.uid), {
      [conversation.chatId + ".lastMessage"]: {
        newMessage: url,
        audioDuration: duration,
      },
      [conversation.chatId + ".date"]: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

export default sendAudio;
