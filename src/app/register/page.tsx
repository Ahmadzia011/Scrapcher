import Header from "@/src/components/ui/Header/Header";
import RegisterCard from "./registerCard";
import { registerUser } from "../actions/registerUser.actions";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-(--primary-color) from-0% via-[#DAE3ED] via-74% to-[#B7CAE0] to-100% px-5 py-10">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full" />

        <RegisterCard registerAction={registerUser} />
      </main>
    </>
  );
}
