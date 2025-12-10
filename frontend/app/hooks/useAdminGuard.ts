"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAdminGuard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.token || user.role !== "admin") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  return loading;
};
