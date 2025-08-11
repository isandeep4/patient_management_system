"use client";

import PatientsListPage from "../components/patientListPage";

import { useUser } from "../contextApi/userContext";

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  return <PatientsListPage roles={user?.roles ?? []} />;
}
