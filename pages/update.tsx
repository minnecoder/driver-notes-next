import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Stop } from "../types";
import styles from "../styles/Update.module.css";
import NavBar from "../components/NavBar";

const Update: NextPage = (stop) => {
  const router = useRouter();
  let data = {};

  const [dataLoaded, setDataLoaded] = useState(false);
  const [stopData, setStopData] = useState<Stop>({
    _id: "",
    custName: "",
    address: "",
    suite: "",
    city: "",
    deliveryLocation: "",
    notes: "",
    signers: [""],
  });

  //TODO: fix ts-ignore

  // if data is empty, get data from local storage
  useEffect(() => {
    if (router.query.stop !== undefined) {
      data = JSON.parse(router.query.stop as string);
      localStorage.setItem("data", JSON.stringify(data));
      // @ts-ignore
      setStopData(data.stop);
      setDataLoaded(true);
    }
    // if data is not empty, set data to stopData
    if (router.query.stop === undefined) {
      data = JSON.parse(localStorage.getItem("data") as string);
      // @ts-ignore
      setStopData(data.stop);
      setDataLoaded(true);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setStopData((stopData) => ({
      ...stopData,
      [event.target.name]: event.target.value,
    }));
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    fetch(`/api/v1/notes/${stopData._id}`, {
      method: "PUT",
      mode: "cors",

      body: JSON.stringify({
        custName: stopData.custName,
        address: stopData.address,
        suite: stopData.suite,
        city: stopData.city,
        deliveryLocation: stopData.deliveryLocation,
        notes: stopData.notes,
        signers: stopData.signers,
      }),
    });
    localStorage.removeItem("data");
    router.push("/stops");
  };

  return (
    <div className={styles.main}>
      <NavBar />
      <h3 className={styles.updateTitle}>Update Stop</h3>
      {/* <p>{stopData.error}</p> */}
      <form className={styles.updateForm} onSubmit={handleSubmit}>
        <input
          name="custName"
          type="text"
          placeholder="Customer Name"
          value={stopData.custName || ""}
          onChange={handleChange}
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={stopData.address || ""}
          onChange={handleChange}
        />
        <input
          name="suite"
          type="text"
          placeholder="Suite"
          value={stopData.suite}
          onChange={handleChange}
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          value={stopData.city}
          onChange={handleChange}
        />
        <input
          name="deliveryLocation"
          type="text"
          placeholder="Delivery Location"
          value={stopData.deliveryLocation}
          onChange={handleChange}
        />
        <input
          name="notes"
          type="text"
          placeholder="Notes"
          value={stopData.notes}
          onChange={handleChange}
        />
        <input
          name="signers"
          type="text"
          placeholder="Signers"
          value={stopData.signers}
          onChange={handleChange}
        />
        <input type="submit" value="Update Note" />
      </form>
    </div>
  );
};

export default Update;
