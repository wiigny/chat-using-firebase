"use client";

import { createContext, useEffect, useState } from "react";
import {
  ConversationContextValues,
  ConversationProviderProps,
  Messages,
} from "./types";
import { Contacts } from "../AuthContext/types";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import useAuth from "@/hook/useAuth";
import combinedIdss from "@/utils/combinedIds";

export const ConversationContext = createContext(
  {} as ConversationContextValues
);

export default function ConversationProvider({
  children,
}: ConversationProviderProps) {
  const { user } = useAuth();

  const [conversation, setConversation] = useState<Contacts>();

  const [messages, setMessages] = useState<Array<Messages>>();

  const [newMessage, setNewMessage] = useState("");

  const [contacts, setContacts] = useState<Object>();

  const [photos, setPhotos] = useState<
    Array<{ file: File; url: string | ArrayBuffer }>
  >([]);

  const [listLastPhotos, setListLastPhotos] = useState<Messages[]>([]);

  const [viewFullPhoto, setViewFullPhoto] = useState<Messages>();

  const [contactUpdated, setContactUpdated] = useState(false);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      if (e.code === "Escape" && conversation) {
        setConversation(undefined);
        setNewMessage("");
        setPhotos([]);
        setListLastPhotos([]);
        setViewFullPhoto(undefined);
      }
    };

    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [conversation]);

  useEffect(() => {
    const updateContact = async (uidContacts: string[]) => {
      for (let i = 0; i < uidContacts.length; i++) {
        const qry = query(
          collection(db, "users"),
          where("uid", "==", uidContacts[i])
        );

        const docUser = (await getDocs(qry)).docs[0].data();

        const obj = {
          displayName: docUser.name,
          photoURL: docUser.photoURL,
          uid: docUser.uid,
        };

        await updateDoc(doc(db, "userChats", user!.uid), {
          [combinedIdss(user!.uid, obj.uid) + ".userInfo"]: {
            ...obj,
          },
        });

        setContactUpdated(true);
      }
    };

    if (!contactUpdated && contacts) {
      const uidContacts = Object.values(contacts).map(
        (contact) => contact.userInfo.uid
      );

      updateContact(uidContacts);
    }
  }, [contactUpdated, contacts, user]);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "userChats", user!.uid), (doc) => {
        const data = doc.data();

        if (data) {
          const cntts = Object.entries(data);

          cntts.sort(function (a, b) {
            const dateA = a[1].date;
            const dateB = b[1].date;

            if (dateA.seconds > dateB.seconds) {
              return -1;
            } else if (dateA.seconds < dateB.seconds) {
              return 1;
            } else {
              if (dateA.nanoseconds > dateB.nanoseconds) {
                return -1;
              } else if (dateA.nanoseconds < dateB.nanoseconds) {
                return 1;
              } else {
                return 0;
              }
            }
          });

          const cnttsOrdered = Object.fromEntries(cntts);

          setContacts(cnttsOrdered);
        }
      });

      return () => unsub();
    }
  }, [user]);

  useEffect(() => {
    if (conversation?.chatId) {
      const unsub = onSnapshot(doc(db, "chats", conversation.chatId), (doc) => {
        setMessages(doc.data()?.messages);
        setListLastPhotos([]);
      });

      return () => unsub();
    }
  }, [conversation?.chatId]);

  return (
    <ConversationContext.Provider
      value={{
        setConversation,
        conversation,
        setNewMessage,
        newMessage,
        messages,
        contacts,
        setPhotos,
        photos,
        viewFullPhoto,
        setViewFullPhoto,
        listLastPhotos,
        setListLastPhotos,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
