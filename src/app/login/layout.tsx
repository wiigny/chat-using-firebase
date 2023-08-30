import { Metadata } from "next";
import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <main>{children}</main>;
}
