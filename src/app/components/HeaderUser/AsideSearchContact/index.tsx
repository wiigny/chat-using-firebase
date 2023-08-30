"use client";

import InputGroup from "@/components/InputGroup";
import useConversation from "@/hook/useConversation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FiArrowLeft } from "react-icons/fi";
import * as EmailValidator from "email-validator";
import { User } from "@/contexts/AuthContext/types";
import useAuth from "@/hook/useAuth";
import ImageHeader from "@/components/ImageHeader";
import styles from "./styles.module.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import combinedIds from "@/utils/combinedIds";
import Aside from "@/components/Aside";
import checkCollectionChatsExists from "@/utils/checkCollectionChatsExists";

interface SearchContactProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function SearchContact({ isOpen, onClose }: SearchContactProps) {
  const { setConversation } = useConversation();
  const { user } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [userFound, setUserFound] = useState<User>();

  const handleNewContact = useCallback(async () => {
    const contactObj = {
      user: userFound!,
      chatId: combinedIds(user!.uid, userFound!.uid),
    };

    setConversation(contactObj);

    await checkCollectionChatsExists(contactObj, user!);
  }, [setConversation, user, userFound]);

  useEffect(() => {
    const handleSearch = async () => {
      const qry = query(
        collection(db, "users"),
        where("email", "==", inputValue)
      );

      const response: any = (await getDocs(qry)).docs;

      if (response.length > 0) {
        setUserFound(response[0].data());
      }
    };

    if (EmailValidator.validate(inputValue)) {
      handleSearch();
    }
  }, [inputValue]);

  return (
    <Aside isOpen={isOpen} onClose={onClose} title="New Conversation">
      <div className={styles.divContainerSearch}>
        <section>
          <InputGroup.fieldset>
            <FiArrowLeft size={23} />
            <InputGroup.input
              placeholder="insert email"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </InputGroup.fieldset>

          {userFound && (
            <div
              onClick={() => {
                handleNewContact();
              }}
            >
              <ImageHeader conversation={userFound} />
              <p>{userFound.name}</p>
            </div>
          )}
        </section>
      </div>
    </Aside>
  );
}
