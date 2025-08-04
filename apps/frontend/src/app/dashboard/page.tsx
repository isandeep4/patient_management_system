"use client";

import PatientsListPage from "../components/patientListPage";

import Link from "next/link";
import { useUser } from "../contextApi/userContext";

export default function Dashboard() {
  const { user } = useUser();
  const handleLogout = async () => {
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 py-4 px-3 overflow-y-auto  sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              href="/profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={handleLogout}
              href={"/login"}
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <PatientsListPage roles={user!.roles} />
      </div>
    </>
  );
}
