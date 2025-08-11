import {
  SignupFormState,
  SignupFormSchema,
  SigninFormState,
  SigninFormSchema,
} from "../lib/definitions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function signup(state: SignupFormState, formData: FormData) {
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
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userName, password, roles }),
      credentials: "include",
    });
    if (response.ok) {
      const userData = await response.json();
      return {
        success: true,
        user: userData.user,
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

export async function login(state: SigninFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    userId: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { userId, password } = validatedFields.data;
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      return {
        success: true,
        user: data.user,
      };
    } else {
      return {
        success: false,
        messages: data.message || "Login Failed.",
      };
    }
  } catch (error) {
    console.log("Login error:", error);
    return {
      success: false,
      messages: "Unable to connect to server. Please try again.",
    };
  }
}
