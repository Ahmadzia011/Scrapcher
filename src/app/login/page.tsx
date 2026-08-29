import Header from "@/src/components/ui/Header/Header";
import LoginCard from "./loginCard";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 bg-linear-to-b from-(--primary-color) from-0% via-[#DAE3ED] via-74% to-[#B7CAE0] to-100%">
        {/* Sky blue gradient */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-110 -translate-x-1/2 rounded-full" />

        <LoginCard />
      </main>
    </>
  );
}
