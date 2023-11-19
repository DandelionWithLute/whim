"use client";
import "./logButton.scss";
import { useSession, signIn, signOut } from "next-auth/react";

export const LogButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className="io">
          Signed in as {session.user.email} <br />
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className="io">Not signed in </button>
    </>
  );
};
