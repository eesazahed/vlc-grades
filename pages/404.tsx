import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Custom404: NextPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        <Link href="/">Go back</Link>
      </p>
    </main>
  );
};

export default Custom404;
