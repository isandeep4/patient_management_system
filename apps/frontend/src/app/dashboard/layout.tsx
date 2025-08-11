"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/profile") return "Profile";
    return "";
  };

  const handleLogout = async () => {
    // localStorage.removeItem("accessToken");
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <>
      <header className="sm:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <button
          className="text-gray-500 text-2xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <h1 className="text-xl font-bold">{getTitle()}</h1>
      </header>
      {/* Overlay screen */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 py-4 px-3 overflow-y-auto
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
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
              href="/dashboard/profile"
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
      <main className="p-4 sm:ml-64">{children}</main>
    </>
  );
}
