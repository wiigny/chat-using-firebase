import { LoginPageForm } from "@/app/login/validate";
import { RegisterPageForm } from "@/app/register/validates";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  login: (data: LoginPageForm) => Promise<number | any>;
  register: (data: RegisterPageForm) => Promise<number | any>;
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  loggout: () => void;
}

export interface User {
  uid: string;
  photoURL: string | null;
  name: string;
  email: string;
}

export interface Contacts {
  user: User;
  chatId: string;
}

export interface TokenDecode {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;
}
