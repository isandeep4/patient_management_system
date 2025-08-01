import router from "next/router";
import { FormState, SignupFormSchema } from "../lib/definitions";

export async function signup(state: FormState, formData: FormData) {
  const rawRoles = formData.getAll("roles"); // returns an array of all checked values

  const formRoles = rawRoles.filter((value) =>
    ["user", "admin"].includes(value as string)
  );
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    userName: formData.get("userName"),
    userId: formData.get("userId"),
    password: formData.get("password"),
    roles: formRoles,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { userName, userId, password, roles } = validatedFields.data;

  // Call the create user API
  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userName, password, roles }),
    });
    if (response.ok) {
      const userData = await response.json();
      return {
        success: true,
        user: userData,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      user: [],
    };
  }
}
