"use client";

import { useEffect, useState } from "react";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/patients", {
      credentials: "include", // Send cookies with cross-origin request
    })
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Patients List</h1>
      <ul>
        {patients?.map(
          (patient: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
          }) => (
            <li key={patient.id}>
              {patient.firstName}-{patient.lastName}
            </li>
          )
        )}
      </ul>
    </main>
  );
}
