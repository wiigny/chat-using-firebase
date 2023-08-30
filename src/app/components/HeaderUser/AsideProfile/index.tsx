"use client";

import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiPencilFill } from "react-icons/ri";
import styles from "./styles.module.scss";
import Aside from "@/components/Aside";
import ImageHeader from "@/components/ImageHeader";
import useAuth from "@/hook/useAuth";
import Button from "@/components/Button";
import GroupInput from "@/components/InputGroup/groupInput";
import { HiCheck } from "react-icons/hi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import ModalEditPhoto from "./ModalEditPhoto";

interface SearchContactProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function AsideProfile({ isOpen, onClose }: SearchContactProps) {
  const { user, setUser } = useAuth();

  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [userName, setUserName] = useState<string>(user ? user.name : "");
  const [position, setPosition] = useState({ pageX: 0, pageY: 0 });

  const handleUsername = async () => {
    if (
      userName!.length > 25 ||
      userName!.length < 3 ||
      userName === user?.name
    ) {
      setEditName(false);

      return;
    } else {
      await updateDoc(doc(db, "users", user!.uid), {
        name: userName,
      });

      setUser((prev) => {
        return { ...prev!, name: userName };
      });

      setEditName(false);
    }
  };

  return (
    <Aside isOpen={isOpen} onClose={onClose} title="Profile">
      <div className={styles.divProfile}>
        <Button
          onClick={(e) => {
            setPosition((prev) => {
              return { ...prev, pageX: e.pageX, pageY: e.pageY };
            });
            setEditPhoto(!editPhoto);
          }}
        >
          <ImageHeader conversation={user!} width={200} height={200} />
        </Button>

        <section>
          <h3>Your Name</h3>

          <div>
            {!editName ? (
              <p>{user?.name}</p>
            ) : (
              <div>
                <GroupInput
                  value={userName}
                  maxLength={25}
                  autoFocus
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="">{25 - userName!.length}</label>
              </div>
            )}

            <Button>
              {editName ? (
                <HiCheck size={20} onClick={handleUsername} />
              ) : (
                <RiPencilFill size={20} onClick={() => setEditName(true)} />
              )}
            </Button>
          </div>
        </section>
        <span>This name will be displayed to your contacts</span>
      </div>

      {editPhoto && (
        <ModalEditPhoto
          pageX={position.pageX}
          pageY={position.pageY}
          onClose={setEditPhoto}
        />
      )}
    </Aside>
  );
}
