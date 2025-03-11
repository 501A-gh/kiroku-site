"use client";
import React, { use } from "react";
import Profile from "./Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import FullScreenLoader from "@/components/FullScreenLoader";
import Link from "next/link";
import { Lock } from "react-feather";
import Input from "./Input";
import ItemList from "./ItemList";
import Settings from "./Settings";
import Support from "./Support";
import Image from "next/image";

export default function Fridge({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <FullScreenLoader />;
  if (error) return <div>Error: {error.message}</div>;

  return !user ? (
    <div className="flex items-center justify-center flex-col gap-6 min-h-screen">
      <Lock />
      <div className="flex items-center flex-col gap-2">
        <h5>You do not have access to this fridge.</h5>
        <Link href="/" className="text-blue-500 underline">
          Go back to home
        </Link>
      </div>
    </div>
  ) : (
    <div className="min-h-screen">
      <header className="flex items-center p-6 w-full bg-white border-b border-zinc-200">
        <div className="flex items-center max-w-[750px] w-full mx-auto justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 no-underline text-black transition-transform active:scale-95"
          >
            <Image
              src="/logo.png"
              alt="Kiroku Logo"
              width={26}
              height={26}
              quality={100}
            />
            <h1 className="text-xl font-bold">Kiroku</h1>
          </Link>
          {userId === user.uid ? (
            <>
              <div className="flex flex-row items-center gap-5">
                <Support />
                <Settings user={user} userId={userId} />
                <Profile user={user} />
              </div>
            </>
          ) : (
            <h5>Viewing</h5>
          )}
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-[750px] w-full mx-auto flex flex-col gap-10">
          <Input user={user} userId={userId} />
          <ItemList user={user} userId={userId} />
        </div>
      </main>
    </div>
  );
}
