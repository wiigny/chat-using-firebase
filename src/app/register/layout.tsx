import { Metadata } from "next";
import { ReactNode } from "react";

interface RegisterLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return <main>{children}</main>;
}
