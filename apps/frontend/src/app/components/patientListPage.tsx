"use client";

import { useEffect, useState } from "react";
import { PatientFormData } from "./patientModal";
import PatientModal from "./patientModal";
export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}
export const initialPatient: Patient = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
};
enum Roles {
  Admin = "Admin",
  User = "User",
}

export default function PatientsListPage({ roles }: { roles: string[] }) {
  const [patients, setPatients] = useState<Patient[] | []>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    initialPatient
  );
  const [modalOpen, setModalOpen] = useState(false);

  function openModal(patient: Patient) {
    setSelectedPatient(patient);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedPatient(initialPatient);
  }

  function handleSave(updatedData: PatientFormData) {
    if (selectedPatient) {
      console.log("Save updated user data", updatedData);
      // TODO: call API or update state here
      fetch(`http://localhost:4000/patients/${selectedPatient!.id}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    } else {
      fetch(`http://localhost:4000/patients`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    }

    closeModal();
  }

  useEffect(() => {
    fetch("http://localhost:4000/patients", {
      credentials: "include", // Send cookies with cross-origin request
    })
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch(console.error);
  }, []);

  async function handleAddPatient() {
    setSelectedPatient(null);
    setModalOpen(true);
  }
  const deleteRow = (patient: Patient) => {
    fetch(`http://localhost:4000/patients/${patient.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <main>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Patients</h1>
        {roles.includes(Roles.Admin) && (
          <button
            onClick={handleAddPatient}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Patient
          </button>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient name
              </th>
              <th scope="col" className="px-6 py-3">
                Email id
              </th>
              <th scope="col" className="px-6 py-3">
                Date of birth
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              {roles.includes(Roles.Admin) && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {patients.length &&
              patients?.map((patient, index) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {patient.firstName + " " + patient.lastName}
                  </th>
                  <td className="px-6 py-4">{patient.email}</td>
                  <td className="px-6 py-4">{patient.dob}</td>
                  <td className="px-6 py-4">{patient.phoneNumber}</td>
                  {roles.includes(Roles.Admin) && (
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-1"
                        onClick={() => openModal(patient)}
                      >
                        Edit
                      </a>
                      |
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline pl-1"
                        onClick={() => deleteRow(patient)}
                      >
                        delete
                      </a>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        <PatientModal
          patient={selectedPatient}
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={handleSave}
        />
      </div>
    </main>
  );
}
