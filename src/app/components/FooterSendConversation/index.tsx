"use client";

import FormConversation from "./FormConversation";
import styles from "./styles.module.scss";

import useConversation from "@/hook/useConversation";

export default function FooterSendConversation() {
  const { conversation } = useConversation();

  return (
    conversation && (
      <footer className={styles.footerSendConversation}>
        {true ? (
          <div>
            <FormConversation />
          </div>
        ) : (
          <div className={styles.footerSendConversationDivAlert}>
            <p>
              Only <span>admins</span> can send messages
            </p>
          </div>
        )}
      </footer>
    )
  );
}
