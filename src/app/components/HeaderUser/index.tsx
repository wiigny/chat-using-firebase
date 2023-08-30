"use client";

import useAuth from "@/hook/useAuth";
import styles from "./styles.module.scss";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import Button from "@/components/Button";
import ImageHeader from "@/components/ImageHeader";
import { useEffect, useRef, useState } from "react";
import SearchContact from "./AsideSearchContact";
import AsideProfile from "./AsideProfile";

export default function HeaderUser() {
  const { user } = useAuth();

  const { loggout } = useAuth();

  const [menuLoggout, setMenuLoggout] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (menuLoggout) {
      const handleMenu = (e: MouseEvent) => {
        const target: any = e.target;

        if (target.id !== "menuHeader") {
          ulRef.current!.className = styles.menuHeaderExit;

          setTimeout(() => {
            setMenuLoggout(false);
          }, 200);
        }
      };

      window.addEventListener("mouseup", handleMenu);

      return () => window.removeEventListener("mouseup", handleMenu);
    }
  }, [menuLoggout]);

  return (
    user && (
      <>
        <header className={styles.header}>
          <div>
            <Button onClick={() => setOpenProfile(true)}>
              <ImageHeader conversation={user} width={80} height={80} />
            </Button>
            <div>
              <p>{user.name}</p>
            </div>
          </div>
          <div>
            <Button type="button" onClick={() => setOpenContact(true)}>
              <BsFillChatLeftTextFill size={20} />
            </Button>
            <Button type="button" onClick={() => setMenuLoggout(true)}>
              <BsThreeDotsVertical size={20} />
            </Button>

            {menuLoggout && (
              <ul ref={ulRef} id="menuHeader">
                <li onClick={loggout}>Disconnect</li>
              </ul>
            )}
          </div>
        </header>

        {openContact && (
          <SearchContact isOpen={openContact} onClose={setOpenContact} />
        )}
        {openProfile && (
          <AsideProfile isOpen={openProfile} onClose={setOpenProfile} />
        )}
      </>
    )
  );
}
