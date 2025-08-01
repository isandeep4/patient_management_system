"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../contextApi/userContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userId = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    if (response.status === 200) {
      const { user } = await response.json();
      setUser(user);
      router.push("/dashboard");
    } else {
      // Handle errors
    }
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white rounded-md p-6 shadow" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="username"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
