"use client";

import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

import useConversation from "@/hook/useConversation";

import Button from "@/components/Button";
import styles from "./styles.module.scss";
import ImageHeader from "@/components/ImageHeader";

export default function HeaderConversation() {
  const { conversation } = useConversation();

  return (
    conversation && (
      <header className={styles.headerConversation}>
        {conversation && (
          <>
            <div>
              <ImageHeader
                conversation={conversation.user}
                width={40}
                height={40}
              />

              <div>
                <p>{conversation.user.name}</p>
              </div>
            </div>

            <nav className={styles.headerConversationNav}>
              <AiOutlineSearch
                size={24}
                className={styles.headerConversationIcon}
              />

              <Button type="button">
                <BsThreeDotsVertical size={24} />
              </Button>
            </nav>
          </>
        )}
      </header>
    )
  );
}
