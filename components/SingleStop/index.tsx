import React, { useState } from "react";
import { Stop } from "../../types";
import Link from "next/link";
import styles from "./SingleStop.module.css";
import { useRouter } from "next/router";

interface Props {
  stop: Stop;
}

const SingleStop: React.FC<Props> = (stop) => {
  const [signerName, setSignerName] = useState("");
  const router = useRouter();
  function refreshPage() {
    window.location.reload();
  }

  function onSignerChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    // setSignerName(prevSigner => ({ ...prevSigner, [event.target.name]: event.target.value }))
    setSignerName(event.target.value);
  }

  const handleSubmit = async (id: string) => {
    const token = localStorage.getItem("token");
    const data = { signerName, id };
    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };
    await fetch("/api/Notes/")
      .then((response) => response.json())
      .then((res) => console.log(res));

    await refreshPage();
  };

  return (
    <div className={styles.main}>
      <h3 className={styles.stopTitle}>{stop.stop.custName}</h3>
      <div className={styles.stopData}>
        <div className={styles.left}>
          <p>
            Address: <span>{stop.stop.address}</span>
          </p>
          {stop.stop.suite !== "" && (
            <p>
              Suite: <span>{stop.stop.suite}</span>
            </p>
          )}
          <p>
            City:<span> {stop.stop.city}</span>
          </p>
          <p>
            Delivery Location: <span>{stop.stop.deliveryLocation}</span>
          </p>

          {stop.stop.notes !== "" && (
            <p>
              Notes: <span>{stop.stop.notes}</span>
            </p>
          )}
        </div>
        <div className={styles.right}>
          {stop.stop.signers.length > 0 && (
            <div className={styles.signerList}>
              <p>Past Signers</p>
              <ul>
                {stop.stop.signers.map((signer) => {
                  return <li key={signer}>{signer}</li>;
                })}
              </ul>
            </div>
          )}
          <div>
            <input
              className={styles.addSignerText}
              placeholder="Signer Name"
              type="text"
              value={signerName}
              onChange={onSignerChange}
            />
            <button
              className={styles.addSignerBtn}
              onClick={() => {
                handleSubmit(stop.stop._id);
                setSignerName("");
              }}
            >
              Add Signer
            </button>
          </div>
        </div>
      </div>
      <div className={styles.linkArea}>
        <Link
          href={{ pathname: "/update", query: { stop: JSON.stringify(stop) } }}
        >
          <a className={styles.updateLink}>Update Note</a>
        </Link>
      </div>
    </div>
  );
};

export default SingleStop;
