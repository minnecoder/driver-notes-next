import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    error: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className={styles.container}>
      <h1 className={styles.LoginTitle}>Delivery Notes</h1>
      <p className={styles.error}>{user.error}</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="userName"
          type="text"
          placeholder="User Name"
          value={user.userName}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
        <div>
          <p>
            Don&apos;t have an account?
            <Link href="/register"> Register User</Link>
          </p>
          <p>
            Login as a Demo User <Link href="/demo"> Click Here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Home;
