import {
  useState,
  useEffect,
  useActionState,
  Dispatch,
  SetStateAction,
} from "react";
import { Patient } from "./patientListPage";
import { savePatient } from "../actions/savePateint";
import { InputField } from "./InputField";
import { PatientFormState } from "../lib/definitions";

interface EditPatientModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  setSelectedPatient: Dispatch<SetStateAction<Patient>>;
}
export interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}
const initialState: PatientFormState = {
  errors: undefined,
  message: undefined,
  success: false,
};

export default function PatientModal({
  patient,
  isOpen,
  onClose,
  setSelectedPatient,
}: EditPatientModalProps) {
  const [state, action, error] = useActionState(
    async (prevState: PatientFormState, payload: FormData | null) => {
      if (payload === null) {
        return initialState;
      }
      return await savePatient(prevState, payload);
    },
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state]);

  if (!isOpen) return null; // Do not render modal if closed

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setSelectedPatient((prev) => ({ ...prev, [name]: value }));
  }
  const modalTitle = patient ? "Edit Patient" : "Add Patient";

  return (
    <div
      aria-hidden={!isOpen}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <form
          action={action}
          className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"
        >
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b dark:border-gray-600 border-gray-200 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {modalTitle}
            </h3>
            <button
              type="button"
              onClick={() => {
                onClose(), action(null);
              }}
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
                value={patient?.firstName ?? ""}
                onChange={handleChange}
                placeholder="Bonnie"
                required
                errors={state?.errors?.firstName}
              />

              <InputField
                label="Last Name"
                id="lastName"
                name="lastName"
                value={patient?.lastName ?? ""}
                onChange={handleChange}
                placeholder="Green"
                required
                errors={state?.errors?.lastName}
              />
              <InputField
                label="Email"
                type="email"
                id="email"
                name="email"
                value={patient?.email ?? ""}
                onChange={handleChange}
                placeholder="example@company.com"
                required
                errors={state?.errors?.email}
              />
              <InputField
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={patient?.phoneNumber ?? ""}
                onChange={handleChange}
                placeholder="+(12)3456 789"
                required
                errors={state?.errors?.phoneNumber}
              />

              <InputField
                label="Date of birth"
                id="dob"
                name="dob"
                value={patient?.dob.split("T")[0] ?? ""}
                onChange={handleChange}
                placeholder="Date of birth"
                required
                errors={state?.errors?.dob}
              />
              <input type="hidden" name="id" defaultValue={patient?.id || ""} />
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
