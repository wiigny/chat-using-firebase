"use client";

import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "@/components/InputGroup";
import Button from "@/components/Button";
import Link from "next/link";
import { LoginPageForm, loginSchema } from "./validate";
import useAuth from "@/hook/useAuth";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPageForm>({
    resolver: yupResolver(loginSchema),
  });

  const submit: SubmitHandler<LoginPageForm> = async (data) => {
    setButtonDisable(true);

    const result = await login(data);

    if (result === "error") {
      setLoginError(true);

      setTimeout(() => {
        setLoginError(false);
      }, 3000);
    }

    setButtonDisable(false);
  };

  return (
    <div className={styles.loginPage}>
      <Form onSubmit={handleSubmit(submit)}>
        <h1>Login</h1>

        <InputGroup.fieldset>
          {errors.email && <p>{errors.email.message}</p>}
          <InputGroup.input
            register={register("email")}
            required
            name="email"
            id="email"
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

        {loginError && <p>Invalid email or password</p>}

        <div>
          <Button type="submit" disabled={buttonDisable}>
            Sign In
          </Button>
          <div>
            <span>Not registered ?</span>
            <Link as="register" href={"/register"}>
              Create an account
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
