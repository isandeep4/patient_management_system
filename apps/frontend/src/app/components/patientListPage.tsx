"use client";

import { useEffect, useState } from "react";
import PatientModal from "./patientModal";
export interface Patient {
  id?: number;
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PatientsListPage({ roles }: { roles: string[] }) {
  const [patients, setPatients] = useState<Patient[] | []>([]);
  const [selectedPatient, setSelectedPatient] =
    useState<Patient>(initialPatient);
  const [modalOpen, setModalOpen] = useState(false);
  // const [token, setToken] = useState<string | null>(null);
  const isAdmin = roles.includes("admin");

  // useEffect(() => {
  //   setToken(localStorage.getItem("accessToken"));
  // }, []);

  useEffect(() => {
    //if (token)
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const openModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchPatients();
    setSelectedPatient(initialPatient);
  };

  const handleAddPatient = async () => {
    setSelectedPatient(initialPatient);
    setModalOpen(true);
  };
  const handleDelete = async (patient: Patient) => {
    try {
      await fetch(`${API_BASE_URL}/patients/${patient.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Patients</h1>
        {isAdmin && (
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
              {isAdmin && (
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
                  <td className="px-6 py-4">{patient.dob.split("T")[0]}</td>
                  <td className="px-6 py-4">{patient.phoneNumber}</td>
                  {isAdmin && (
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
                        onClick={() => handleDelete(patient)}
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
          setSelectedPatient={setSelectedPatient}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      </div>
    </main>
  );
}
