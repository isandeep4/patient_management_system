import { z } from "zod";

export const SignupFormSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  userId: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  roles: z.array(z.enum(["user", "admin"])).optional(),
});

export type SignupFormState =
  | {
      errors?: {
        userName?: string[];
        userId?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SigninFormSchema = z.object({
  userId: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string({ message: "Please enter a valid password" })
    .min(1, { message: "Password is required" }),
});

export type SigninFormState =
  | {
      errors?: {
        userId?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
export type PatientFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        dob?: string[];
        phoneNumber?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
export const PatientFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ message: "Please enter a valid email." }).trim(),
  phoneNumber: z
    .string()
    .min(8, { message: "phone number must be at least 8 digit long." }),
  dob: z.iso.date({ message: "Date should be in YYYY-MM-DD format" }),
});
