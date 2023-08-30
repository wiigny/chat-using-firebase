import { InferType, object, string } from "yup";

export const registerSchema = object({
  name: string().min(3).required(),
  email: string().email().required(),
  password: string().required().min(8),
});

export type RegisterPageForm = InferType<typeof registerSchema>;
