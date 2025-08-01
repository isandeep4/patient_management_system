"use client";
import { useUser } from "../contextApi/userContext";

export default function Profile() {
  const { user } = useUser();
  if (!user) {
    return <div>You are not logged in.</div>;
  }
  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Profile</h1>
      <div className="space-y-4">
        <div>
          <span className="text-gray-500 font-medium">User Name:&nbsp;</span>
          <span className="text-gray-800">{user.userName}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">User ID:&nbsp;</span>
          <span className="text-gray-800">{user.userId}</span>
        </div>
      </div>
    </div>
  );
}
