import type { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Register.module.css";

const Register: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    password: "",
    error: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
    event.preventDefault();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("/api/v1/user/add", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, "error")) {
          setUser((prevUser) => ({ ...prevUser, error: data.error }));
          router.push("/");
        }
        if (Object.prototype.hasOwnProperty.call(data, "success")) {
          localStorage.setItem("token", data.token);
          router.push("/stops");
        }
      });
  }

  return (
    <div>
      <h1 className={styles.registerTitle}>Delivery Notes</h1>
      <p className={styles.error}>{user.error}</p>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <input
          required
          name="userName"
          type="text"
          placeholder="User Name"
          value={user.userName}
          onChange={handleChange}
        />

        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Register;
