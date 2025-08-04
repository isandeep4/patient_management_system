"use client";

import PatientsListPage from "../components/patientListPage";

import { useUser } from "../contextApi/userContext";

export default function DashboardPage() {
  const { user } = useUser();

  return <PatientsListPage roles={user?.roles ?? []} />;
}
