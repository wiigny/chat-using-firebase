import { Contacts, User } from "@/contexts/AuthContext/types";
import { db } from "@/firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

const checkCollectionChatsExists = async (
  conversation: Contacts,
  user: User
) => {
  const resp = await getDoc(doc(db, "chats", conversation.chatId));

  const userChats = await getDoc(doc(db, "userChats", user.uid));

  if (!userChats.exists()) {
    await setDoc(doc(db, "userChats", user.uid), {});
    await setDoc(doc(db, "userChats", conversation.user.uid), {});
  }

  if (!resp.exists()) {
    await setDoc(doc(db, "chats", conversation.chatId), {
      messages: [],
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [conversation?.chatId + ".userInfo"]: {
        uid: conversation.user.uid,
        displayName: conversation.user.name,
        photoURL: conversation.user.photoURL,
      },
      [conversation?.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", conversation.user.uid), {
      [conversation?.chatId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.name,
        photoURL: user.photoURL,
      },
      [conversation?.chatId + ".date"]: Timestamp.now(),
    });
  }
};

export default checkCollectionChatsExists;
