import React from "react";
import styles from "./NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className={styles.main}>
      <Link href="/add">
        <a className={styles.navLink}>Add</a>
      </Link>
      <Link href="/stoplist">
        <a className={styles.navLink}>Stops</a>
      </Link>
      <Link href="">
        <a className={styles.navLink} onClick={logout}>
          Log Out
        </a>
      </Link>
    </div>
  );
}

// export default withRouter(NavBar);
export default NavBar;
