import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/main.scss";

import AuthProvider from "@/contexts/AuthContext";
import ConversationProvider from "@/contexts/ConversationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat app",
  description: "This is my first chat app, using NextJs and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConversationProvider>{children}</ConversationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
