import SignInWithGoogle from "@/app/SignInWithGoogle";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center p-24 min-h-screen">
      <hgroup className="flex items-center flex-col gap-4">
        <h1>Kiroku</h1>
        <h4 className="text-zinc-500">An app to help organized your fridge</h4>
      </hgroup>
      <SignInWithGoogle />
    </main>
  );
}
