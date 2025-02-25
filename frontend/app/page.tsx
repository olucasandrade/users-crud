"use client"

import { useUser } from "@stackframe/stack";
import Header from "./components/Header";
import Users from "./components/Users";

export default function Home() {
  useUser({ or: "redirect" });
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8">
        <Users />
      </main>
    </div>
  );
}
