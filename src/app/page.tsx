"use client";
import { useSession, signIn, signOut } from "next-auth/react";

type session = {
  data: Object,
  status: String
}

export default function Home() {

  const { status, data } = useSession();

  if (status == 'loading') {
    return <h1>Loading...</h1>
  }

  if (status == 'authenticated') {
    return (
      <div>
        <h1> hi {data?.user?.name}</h1>
        <button onClick={(e: any) => signOut()}>sign out</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => signIn()}>sign in</button>
    </div>
  );
}
