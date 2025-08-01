"use client";
import { useUser } from "../contextApi/userContext";

export default function Profile() {
  const { user } = useUser();
  console.log("user", user);
  return (
    <>
      <h3>Welocme User: {user?.userName}</h3>
    </>
  );
}
