import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import styles from "../styles.module.scss";
import GroupInput from "@/components/InputGroup/groupInput";
import useConversation from "@/hook/useConversation";
import handlePhotos from "@/utils/handlePhotos";
import useOutClick from "@/hook/useOutClick";
import { IoMdAdd } from "react-icons/io";
import { MdPhotoLibrary } from "react-icons/md";

export default function SendImagesInConversation() {
  const [open, setOpen] = useState(false);

  const { setPhotos, photos } = useConversation();

  const ulRef = useRef<HTMLUListElement>(null);

  useOutClick(ulRef, () => setOpen(false));

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  return (
    <div className={styles.sendImageInConversation}>
      <Button
        onMouseDown={() => setOpen(!open)}
        className={styles.buttonOptions}
      >
        <IoMdAdd
          size={30}
          className={open ? styles.animateButton : styles.animateReverseButton}
        />
      </Button>

      {open && (
        <ul ref={ulRef}>
          <li>
            <div>
              <MdPhotoLibrary color="#007bfc" size={24} />
            </div>
            <GroupInput
              type="file"
              name="photos"
              id="photos"
              hidden
              multiple
              onChange={(e) => handlePhotos(e.target.files, setPhotos)}
            />
            <label htmlFor="photos">Photos</label>
          </li>
        </ul>
      )}
    </div>
  );
}
