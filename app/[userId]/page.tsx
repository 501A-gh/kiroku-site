"use client";
import React, { use } from "react";
import Profile from "./Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import FullScreenLoader from "@/components/FullScreenLoader";
import Link from "next/link";
import { Lock } from "react-feather";

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
    <div className="min-h-screen ">
      <header className="flex items-center p-6 w-full bg-white border-b border-zinc-200">
        <div className="flex items-center justify-between max-w-[900px] w-full mx-auto">
          <h3>Kiroku</h3>
          <Profile user={user} />
        </div>
      </header>
      <main className="flex flex-col p-6">
        <div className="max-w-[900px] w-full mx-auto flex flex-col gap-4">
          <h4>All Items</h4>
        </div>
      </main>
    </div>
  );
}
