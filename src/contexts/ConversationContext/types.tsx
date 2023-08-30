import { Dispatch, ReactNode, SetStateAction } from "react";
import { Contacts } from "../AuthContext/types";

export interface ConversationProviderProps {
  children: ReactNode;
}

export interface ConversationContextValues {
  setConversation: Dispatch<SetStateAction<Contacts | undefined>>;
  conversation: Contacts | undefined;
  setNewMessage: Dispatch<SetStateAction<string>>;
  newMessage: string;
  contacts: Object | undefined;
  messages: Array<Messages> | undefined;
  setPhotos: Dispatch<
    SetStateAction<
      {
        file: File;
        url: string | ArrayBuffer;
      }[]
    >
  >;
  photos: {
    file: File;
    url: string | ArrayBuffer;
  }[];
  viewFullPhoto: Messages | undefined;
  setViewFullPhoto: Dispatch<SetStateAction<Messages | undefined>>;
  listLastPhotos: Messages[];
  setListLastPhotos: Dispatch<SetStateAction<Messages[]>>;
}

export interface Messages {
  audioDuration: number;
  id: string;
  newMessage: string;
  photoUrl: string;
  senderId: string;
  senderName: string;
  senderPhoto: null | string;
  date: Date;
}

export interface Date {
  seconds: number;
  nanoseconds: number;
}
