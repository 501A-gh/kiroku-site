import SignInWithGoogle from "@/app/SignInWithGoogle";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center p-24 min-h-screen">
      <div className="flex flex-row items-center">
        <img src="/Kiroku-Logo.png" alt="Kiroku Logo" className="w-32 h-auto" />
        <hgroup className="flex items-start flex-col gap-2">
          <h1>Kiroku</h1>
          <h4 className="text-zinc-500">
            An app to help
            <br /> organize your fridge
          </h4>
        </hgroup>
      </div>
      <SignInWithGoogle />
    </main>
  );
}
