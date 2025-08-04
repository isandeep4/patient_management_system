"use client";

import PatientsListPage from "../components/patientListPage";

import { useUser } from "../contextApi/userContext";

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>; // Fallback if user is null initially
  }

  return <PatientsListPage roles={user?.roles ?? []} />;
}
