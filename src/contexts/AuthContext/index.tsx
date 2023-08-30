"use client";

import { usePathname, useRouter } from "next/navigation";

import { createContext, useEffect, useState } from "react";

import { AuthContextProps, AuthProviderProps, User } from "./types";
import { LoginPageForm } from "@/app/login/validate";
import { RegisterPageForm } from "@/app/register/validates";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { setCookie, parseCookies, destroyCookie } from "nookies";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<undefined | User>(undefined);

  useEffect(() => {
    const cookies = parseCookies();

    const uuidUser = cookies.CHAT_ACCESS;

    if (!uuidUser && pathname === "/") {
      router.push("/login");
    } else if (uuidUser) {
      const getUser = async () => {
        const result = await getDoc(doc(db, "users", uuidUser));

        const retrieveUser: any = result.data();

        if (!retrieveUser) {
          router.push("/login");
        }

        setUser(retrieveUser);

        router.push("/");
      };

      getUser();
    }
  }, [router, pathname]);

  const login = async (data: LoginPageForm) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      setCookie(null, "CHAT_ACCESS", res.user.uid, {
        maxAge: 60 * 60 * 24,
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      console.error(error);
      return "error";
    }
  };

  const register = async (data: RegisterPageForm) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(res.user, {
        displayName: data.name,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

      setCookie(null, "CHAT_ACCESS", res.user.uid, {
        maxAge: 60 * 60 * 24,
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      return "error";
    }
  };

  const loggout = () => {
    router.push("/login");
    destroyCookie(null, "CHAT_ACCESS");
  };

  return (
    <AuthContext.Provider value={{ login, register, user, setUser, loggout }}>
      {children}
    </AuthContext.Provider>
  );
}
