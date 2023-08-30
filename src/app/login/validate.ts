import { InferType, object, string } from "yup";

export const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export type LoginPageForm = InferType<typeof loginSchema>;
