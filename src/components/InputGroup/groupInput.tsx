import { InputHTMLAttributes, RefObject, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface groupInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  ref?: RefObject<HTMLInputElement>;
}

export default function GroupInput({
  register,
  ref,
  ...props
}: groupInputProps) {
  return <input {...props} ref={ref} {...register} />;
}
