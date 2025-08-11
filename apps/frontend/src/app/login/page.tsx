"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../contextApi/userContext";
import { login } from "../actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  // Initial state
  const initialState = {
    success: false,
    errors: undefined,
    messages: "",
    user: undefined,
  };

  const [state, action, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state?.success) {
      setUser(state.user);
      // localStorage.setItem("accessToken", state.accessToken);
      router.push(`/dashboard`);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white rounded-md p-6 shadow" action={action}>
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
          {state?.errors?.userId && (
            <p className="mt-1 text-sm text-red-600">{state.errors.userId}</p>
          )}
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
          {state?.errors?.password && (
            <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          {isPending ? "Logging in..." : "Log In"}
        </button>
        {state.messages && !state.success && (
          <p className="mt-1 text-sm text-red-600">{state?.messages}</p>
        )}
      </form>
      <p style={{ marginTop: 20, fontSize: "0.9rem" }}>
        {"Don't have an account? "}
        <Link href="/signup" className="underline text-blue-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
