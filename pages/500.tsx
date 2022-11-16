import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Custom500: NextPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>500 - Server-side error occurred</h1>
      <p className={styles.description}>
        <Link href="/">Go back</Link>
      </p>
    </main>
  );
};

export default Custom500;
