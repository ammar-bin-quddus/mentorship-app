"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (role && session?.user.role !== role) {
      router.push("/");
    }
  }, [session, status, router, role]);

  if (status === "loading") return <p className="p-4">Loading...</p>;

  return <>{children}</>;
}
