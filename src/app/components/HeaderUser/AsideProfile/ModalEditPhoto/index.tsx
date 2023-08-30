"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import styles from "../styles.module.scss";
import GroupInput from "@/components/InputGroup/groupInput";
import GroupLabel from "@/components/InputGroup/groupLabel";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";
import useAuth from "@/hook/useAuth";
import { doc, updateDoc } from "firebase/firestore";

export default function ModalEditPhoto({
  pageX,
  pageY,
  onClose,
}: {
  pageX: number;
  pageY: number;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  const { user, setUser } = useAuth();

  useEffect(() => {
    const div = divRef.current;

    if (div) {
      const outClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (
          div !== e.currentTarget &&
          target.nodeName !== "BUTTON" &&
          target.nodeName !== "SPAN"
        ) {
          onClose(false);
        }
      };
      window.addEventListener("mouseup", outClick);
      return () => window.removeEventListener("mouseup", outClick);
    }
  }, [onClose]);

  const handleUpload = async (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    const file = input.files![0];

    const storageRef = ref(storage, `photos/${user?.uid}`);

    await uploadBytes(storageRef, file);

    const getUrl = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", user!.uid), {
      photoURL: getUrl,
    });

    setUser((prev) => {
      return { ...prev!, photoURL: getUrl };
    });
  };

  const configTranslate = {
    transform: `translate(${pageX}px, ${pageY}px)`,
  };

  return (
    <div
      id="modalPhoto"
      className={styles.modal}
      ref={divRef}
      style={configTranslate}
    >
      <ul>
        <li>
          <GroupInput
            type="file"
            id="uploadImg"
            name="uploadImg"
            onChange={(e) => handleUpload(e)}
          />
          <GroupLabel htmlFor="uploadImg">Update photo</GroupLabel>
        </li>
      </ul>
    </div>
  );
}
