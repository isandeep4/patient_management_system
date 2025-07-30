"use client";
import { useActionState, useState } from "react";
import { signup } from "../actions/auth";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [user, setUser] = useState({});

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Username</label>
        <input id="userName" name="userName" placeholder="Name" />
      </div>
      {state?.errors?.userName && <p>{state.errors.userName}</p>}

      <div>
        <label htmlFor="userId">User id</label>
        <input id="userId" name="userId" placeholder="userid" />
      </div>
      {state?.errors?.userId && <p>{state.errors.userId}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  );
}
