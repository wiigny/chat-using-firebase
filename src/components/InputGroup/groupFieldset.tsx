import { FieldsetHTMLAttributes, ReactNode } from "react";

interface groupFieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: ReactNode;
}

export default function GroupFieldset({
  children,
  ...props
}: groupFieldsetProps) {
  return <fieldset {...props}>{children}</fieldset>;
}
