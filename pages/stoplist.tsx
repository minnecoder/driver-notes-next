import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/StopList.module.css";

const StopList: NextPage = () => {
  const [stops, setStops] = useState([]);
  const [search, setSearch] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
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
          <AddLink to="/add">Add</AddLink>
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
        {filteredStops.map((stop) => (
          <SingleStop key={stop._id} stop={stop} />
        ))}
      </div>
    </div>
  );
};

export default StopList;
