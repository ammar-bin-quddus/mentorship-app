"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b shadow p-4 flex justify-between">
      <Link href="/" className="font-bold text-xl text-blue-600">Mentorship</Link>

      <div className="flex gap-4 items-center">
        {!session ? (
          <>
            <Link href="/login" className="text-blue-600">Login</Link>
            <Link href="/register" className="text-blue-600">Register</Link>
          </>
        ) : (
          <>
            <span>{session.user?.email}</span>
            <button onClick={() => signOut()} className="text-red-500">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
