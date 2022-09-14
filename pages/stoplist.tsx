import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Stop } from "../types/index.d";
import { useState } from "react";
import NavBar from "../components/NavBar";
import SingleStop from "../components/singlestop";
import styles from "../styles/StopList.module.css";

const StopList: NextPage = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [search, setSearch] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/Notes")
      .then((res) => res.json())
      .then((data) => {
        setStops(data.data);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        router.push("/");
      });
  }, [dataLoaded]);
  console.log(stops);
  const filteredStops = stops.filter(
    (stop) => stop.custName.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  if (!filteredStops.length && dataLoaded === true) {
    return (
      <div className={styles.container}>
        <NavBar />
        <h1 className={styles.title}>Stops</h1>
        <div className={styles.noStopList}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <p>
            There were no matches for that search. Would you like to add one?
          </p>
          <Link href="/add">Add</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stops</h1>
      <div className={styles.stopList}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredStops.map((stop: Stop) => (
          <SingleStop stop={stop} />
        ))}
      </div>
    </div>
  );
};

export default StopList;
