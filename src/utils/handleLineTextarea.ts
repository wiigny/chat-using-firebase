import { RefObject } from "react";

const handleLineTextarea = (ref: RefObject<HTMLTextAreaElement>) => {
  const textarea = ref.current;
  const lineHeight = ref.current?.value;
  const numLine = lineHeight!.split("\n").length;

  textarea!.style.height = "auto";

  if (numLine === 1) {
    textarea!.style.height = `${22}px`;
  } else {
    textarea!.style.height = `${21 * numLine}px`;
  }
};
export default handleLineTextarea;
