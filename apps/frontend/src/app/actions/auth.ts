import router from "next/router";
import { FormState, SignupFormSchema } from "../lib/definitions";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("userName"),
    email: formData.get("userId"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { userName, userId, password } = validatedFields.data;

  // Call the create user API
  const response = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, userName, password }),
  });

  if (response.status === 200) {
    const userData = await response.json();
    router.push({
      pathname: "/profile",
      query: { user: JSON.stringify(userData) },
    });
  } else {
    // Handle errors
  }
}
