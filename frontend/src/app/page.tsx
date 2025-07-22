"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedExamId = localStorage.getItem("selectedExam");
      if (selectedExamId) {
        push("/home");
      } else {
        push("/settings");
      }
    }
  }, [push]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
}
