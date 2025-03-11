import SignInWithGoogle from "@/app/SignInWithGoogle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-12 items-center justify-center p-24 min-h-screen">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/logo.png"
          alt="Kiroku Logo"
          className="bg-radial-[at_50%_35%] from-white from-55% to-emerald-100 rounded-3xl border border-zinc-200 border-b-2 drop-shadow-xs"
          width={100}
          height={100}
          quality={100}
        />
        <hgroup className="flex items-center flex-col gap-2">
          <h1>Kiroku</h1>
          <h4 className="text-zinc-500">An app to help organize your fridge</h4>
        </hgroup>
      </div>
      <SignInWithGoogle />
    </main>
  );
}
