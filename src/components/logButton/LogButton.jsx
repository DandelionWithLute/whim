"use client";
import styles from "./logButton.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export const LogButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className={styles.io}>
          Signed in as {session.user.email} <br />
        </button>
      </>
    );
  }
  return (
    <div className={styles.text}>
      <button onClick={() => signIn()} className={styles.io}>Sign Here</button>
    </div>
  );
};
