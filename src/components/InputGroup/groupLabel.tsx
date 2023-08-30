import { LabelHTMLAttributes, ReactNode } from "react";

interface groupLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export default function GroupLabel({ children, ...props }: groupLabelProps) {
  return (
    <label {...props}>
      <span>{children}</span>
    </label>
  );
}
