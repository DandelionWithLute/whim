"use client"
import "./logButton.scss";
import { useSession, signIn, signOut } from "next-auth/react";

export const LogButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return (
    <>
      Not signed in 
      <button onClick={() => signIn()}>Login</button>
    </>
  );
};
