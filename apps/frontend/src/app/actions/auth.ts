import {
  SignupFormState,
  SignupFormSchema,
  SigninFormState,
  SigninFormSchema,
} from "../lib/definitions";

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
    const response = await fetch(
      "http://eb-rds-nest-backend-server-env.eba-ku7j8aa9.us-east-1.elasticbeanstalk.com/auth/signup",
      //"http://localhost:4000/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName, password, roles }),
      }
    );
    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem("accessToken", userData.accessToken);
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

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, password }),
  });

  if (response.status === 200) {
    const { user, accessToken } = await response.json();
    localStorage.setItem("accessToken", accessToken);

    return {
      success: true,
      user: user,
    };
  } else {
    return {
      success: false,
      messages: "You don't have an account.",
    };
  }
}
