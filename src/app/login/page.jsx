"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")} >
          Login with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
