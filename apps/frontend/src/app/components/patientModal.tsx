import { useState, useEffect } from "react";
import { initialPatient, Patient } from "./patientListPage";

interface EditPatientModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (formdata: PatientFormData) => void;
}
export interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
  required: boolean;
}

export default function PatientModal({
  patient,
  isOpen,
  onClose,
  onSave,
}: EditPatientModalProps) {
  // Local state for form fields, initialized from `user` prop
  const [formData, setFormData] = useState<PatientFormData>(initialPatient);

  // When `user` prop changes (e.g. opening modal with different user), update form fields
  useEffect(() => {
    if (patient) {
      setFormData({
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        email: patient.email || "",
        phoneNumber: patient.phoneNumber || "",
        dob: patient.dob || "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dob: "",
      });
    }
  }, [patient]);

  if (!isOpen) return null; // Do not render modal if closed

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave(formData!); // Call parent handler with form data
  }
  const modalTitle = patient ? "Edit Patient" : "Add Patient";

  return (
    <div
      aria-hidden={!isOpen}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"
        >
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b dark:border-gray-600 border-gray-200 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {modalTitle}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <InputField
                label="First Name"
                id="firstName"
                name="firstName"
                value={formData!.firstName}
                onChange={handleChange}
                placeholder="Bonnie"
                required
              />
              <InputField
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formData!.lastName}
                onChange={handleChange}
                placeholder="Green"
                required
              />
              <InputField
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData!.email}
                onChange={handleChange}
                placeholder="example@company.com"
                required
              />
              <InputField
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData!.phoneNumber}
                onChange={handleChange}
                placeholder="+(12)3456 789"
                required
              />
              <InputField
                label="Date of birth"
                id="dob"
                name="dob"
                value={formData!.dob}
                onChange={handleChange}
                placeholder="Date of birth"
                required
              />
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: InputFieldProps) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
