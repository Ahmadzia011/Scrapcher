"use server";

import SupaBase from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {

  const supabase = SupaBase()
  const name = formData.get("name") as string
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Basic Validation
  if (!email || !password) {
    return { error: "All fields are required." };
  }

  try {

    // 2. Check if user already exists
    const { data: existingUserData } = await supabase.from('users').select('*').eq('email', email).limit(1)

    const existingUser = await existingUserData?.[0]

    if (existingUser) {
      return { error: "A user with this email already exists." };
    }

    // 3. Create the user in PostgreSQL
    // Note: In production, wrap 'password' in a hashing function like bcrypt!
    await supabase.from("users").insert({
      name,
      email,
      password,
    });


  } catch (err) {
    console.error("Signup Error:", err);
    return { error: "Something went wrong during registration." };
  }

  // 4. If successful, send them to the login page
  redirect("/login");
}