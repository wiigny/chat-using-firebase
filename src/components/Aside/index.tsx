"use client";

import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./styles.module.scss";
import useConversation from "@/hook/useConversation";

interface AsideProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: (boolean: boolean) => void;
}

export default function Aside({
  children,
  title,
  isOpen,
  onClose,
  ...rest
}: AsideProps) {
  const asideRef = useRef<HTMLElement>(null);
  const { conversation } = useConversation();

  const handleAsideAnimate = useCallback(() => {
    asideRef.current?.classList.add(styles.asideExitingAnimation);

    setTimeout(() => {
      onClose(false);
    }, 400);
  }, [onClose]);

  const [conversationUserId] = useState(conversation?.user.uid);

  useEffect(() => {
    if (conversationUserId !== conversation?.user.uid) {
      handleAsideAnimate();
    }
  }, [conversation, conversationUserId, handleAsideAnimate]);

  return (
    isOpen && (
      <aside className={styles.aside} ref={asideRef} {...rest}>
        <header>
          <div>
            <FiArrowLeft size={23} onClick={handleAsideAnimate} />
            <h1>{title}</h1>
          </div>
        </header>
        {children}
      </aside>
    )
  );
}
