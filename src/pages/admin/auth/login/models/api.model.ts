import type { Role } from "@/models";

export const LoginFieldName = {
  Email: "email",
  Password: "password",
} as const;

export const LoginFieldTitle = {
  Email: "Email",
  Password: "Password",
} as const;

export interface LoginPayload {
  [LoginFieldName.Email]: string;
  [LoginFieldName.Password]: string;
}

export interface SwitchContextPayload {
  franchise_id: string;
}

export type LoginResult = { type: "SUCCESS" } | { type: "REQUIRE_CONTEXT"; roles: Role[] };
