// components/Navbar.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import Navbar from "./Navbar";

export default async function Header() {
  const session = await getServerSession(authOptions);
  
  const userData = session?.user;
  const userName = (userData as any)?.name;
  const userEmail = (userData as any)?.email;


  return (
    <Navbar userName={userName} userEmail={userEmail}/>
  );
}