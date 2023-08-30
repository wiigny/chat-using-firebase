"use client";

import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterPageForm, registerSchema } from "./validates";
import InputGroup from "@/components/InputGroup";
import Button from "@/components/Button";
import Link from "next/link";
import useAuth from "@/hook/useAuth";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Register() {
  const { register: registerUser } = useAuth();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPageForm>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const submit: SubmitHandler<RegisterPageForm> = async (data) => {
    setButtonDisable(true);
    const result = await registerUser(data);

    if (result === "error") {
      setRegisterError(true);

      setTimeout(() => {
        setRegisterError(false);
      }, 3000);
    }

    setButtonDisable(false);
  };

  return (
    <div className={styles.registerPage}>
      <Form onSubmit={handleSubmit(submit)}>
        <h1>Register</h1>

        <InputGroup.fieldset>
          {errors.name && <p>{errors.name.message}</p>}

          <InputGroup.input
            register={register("name")}
            name="name"
            id="name"
            required
          />

          <InputGroup.label htmlFor="name">Name</InputGroup.label>
        </InputGroup.fieldset>

        <InputGroup.fieldset>
          {errors.email && <p>{errors.email.message}</p>}

          <InputGroup.input
            register={register("email")}
            name="email"
            id="email"
            required
          />

          <InputGroup.label htmlFor="email">Email</InputGroup.label>
        </InputGroup.fieldset>

        <InputGroup.fieldset>
          {errors.password && <p>{errors.password.message}</p>}

          <InputGroup.input
            type="password"
            register={register("password")}
            name="password"
            id="password"
            required
          />

          <InputGroup.label htmlFor="password">Password</InputGroup.label>
        </InputGroup.fieldset>

        {registerError && <p>Email already in use</p>}

        <div>
          <Button type="submit" disabled={buttonDisable}>
            Sign Up
          </Button>

          <div>
            <span>Have an account ?</span>
            <Link as="login" href={"/login"}>
              Sign in
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
