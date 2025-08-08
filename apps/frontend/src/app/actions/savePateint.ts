import { Patient } from "../components/patientListPage";
import { PatientFormSchema, PatientFormState } from "../lib/definitions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function savePatient(state: PatientFormState, formData: FormData) {
  const id = formData.get("id");
  const token = formData.get("token");

  // Validate form fields
  const validatedFields = PatientFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    dob: formData.get("dob"),
    phoneNumber: formData.get("phoneNumber"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { firstName, lastName, email, dob, phoneNumber } = validatedFields.data;
  // convert date to dateTime format
  const dateTime = new Date(dob + "T00:00:00Z");

  const method = id ? "PUT" : "POST";
  const url = id
    ? `${API_BASE_URL}/patients/${id}`
    : `${API_BASE_URL}/patients`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        dob: dateTime,
        phoneNumber,
      }),
    });
    if (response.ok) {
      const patientData: Patient = await response.json();
      return {
        success: true,
        patient: patientData,
      };
    }
  } catch (error) {
    console.error("Error saving patient:", error);
    return {
      success: false,
      patient: undefined,
    };
  }
}
