"use client";
import { useActionState, useEffect } from "react";
import { signup } from "../actions/auth";
import { useRouter } from "next/navigation";
import { useUser } from "../contextApi/userContext";

export default function SignupForm() {
  const router = useRouter();
  const { setUser } = useUser();

  const [state, action, pending] = useActionState(signup, undefined);
  useEffect(() => {
    if (state?.success) {
      setUser(state.user);
      router.push(`/dashboard`);
    }
  }, [state, router]);

  return (
    <form
      action={action}
      method="post"
      className="max-w-md mx-auto p-6 bg-white rounded shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="userName"
          className="block text-gray-700 font-medium mb-1"
        >
          Username
        </label>
        <input
          id="userName"
          name="userName"
          placeholder="Name"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {state?.errors?.userName && (
          <p className="mt-1 text-sm text-red-600">{state.errors.userName}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="userId"
          className="block text-gray-700 font-medium mb-1"
        >
          Email
        </label>
        <input
          id="userId"
          name="userId"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {state?.errors?.userId && (
          <p className="mt-1 text-sm text-red-600">{state.errors.userId}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {state?.errors?.password && (
          <div className="mt-1 text-sm text-red-600">
            <p>Password must:</p>
            <ul className="list-disc list-inside ml-4">
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="roles" className="block text-gray-700 font-medium mb-1">
          Role
        </label>
        <select
          id="roles"
          name="roles"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          defaultValue="user"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 rounded font-semibold text-white transition ${
          pending
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
}
