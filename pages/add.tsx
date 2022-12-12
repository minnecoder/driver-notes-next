import type { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import styles from "../styles/Add.module.css";

const Add: NextPage = () => {
  const router = useRouter();
  const [stop, setStop] = useState({
    custName: "",
    address: "",
    suite: "",
    city: "",
    deliveryLocation: "",
    notes: "",
    signers: [],
    error: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setStop((prevStop) => ({
      ...prevStop,
      [event.target.name]: event.target.value,
    }));
  };

  //TODO: Fix handleSubmit

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.persist();
    const token = localStorage.getItem("token");
    fetch("/api/v1/notes", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        custName: stop.custName,
        address: stop.address,
        suite: stop.suite,
        city: stop.city,
        deliveryLocation: stop.deliveryLocation,
        notes: stop.notes,
        signers: stop.signers,
      }),
    });
    setStop({
      custName: "",
      address: "",
      suite: "",
      city: "",
      deliveryLocation: "",
      notes: "",
      signers: [],
      error: "",
    });
    router.push("/stops");
  };

  return (
    <div className={styles.main}>
      <NavBar />
      <h1 className={styles.addTitle}>Add Stop</h1>
      <p>{stop.error}</p>
      <form className={styles.addForm} onSubmit={handleSubmit}>
        <input
          name="custName"
          type="text"
          placeholder="Customer Name"
          value={stop.custName}
          onChange={handleChange}
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={stop.address}
          onChange={handleChange}
        />
        <input
          name="suite"
          type="text"
          placeholder="Suite"
          value={stop.suite}
          onChange={handleChange}
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          value={stop.city}
          onChange={handleChange}
        />
        <input
          name="deliveryLocation"
          type="text"
          placeholder="Delivery Location"
          value={stop.deliveryLocation}
          onChange={handleChange}
        />
        <input
          name="notes"
          type="text"
          placeholder="Notes"
          value={stop.notes}
          onChange={handleChange}
        />
        <input
          name="signers"
          type="text"
          placeholder="Signers"
          value={stop.signers}
          onChange={handleChange}
        />
        <input type="submit" value="Add Note" />
      </form>
    </div>
  );
};

export default Add;
