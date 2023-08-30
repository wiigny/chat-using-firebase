import { ButtonHTMLAttributes, LegacyRef, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ref?: LegacyRef<HTMLButtonElement>;
}

export default function Button({ children, ref, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
