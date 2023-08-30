import { Contacts, User } from "@/contexts/AuthContext/types";
import initialLetters from "@/utils/initialLetters";
import Image from "next/image";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface ImageHeaderProps {
  conversation: User;
  width?: number;
  height?: number;
}

export default function ImageHeader({
  conversation,
  width = 49,
  height = 49,
}: ImageHeaderProps) {
  return (
    <figure
      className={clsx(
        styles.imageHeader,
        conversation.photoURL && styles.figureWithoutBgColor
      )}
      style={{ width: width, height: height }}
    >
      {conversation.photoURL ? (
        <Image
          src={conversation.photoURL}
          alt={conversation.name}
          width={width * 2}
          height={height * 2}
        />
      ) : (
        <p
          style={
            width == 40
              ? { fontSize: "1.6rem", paddingTop: "0.2rem" }
              : { fontSize: "2rem" }
          }
        >
          {initialLetters(conversation.name)}
        </p>
      )}
    </figure>
  );
}
