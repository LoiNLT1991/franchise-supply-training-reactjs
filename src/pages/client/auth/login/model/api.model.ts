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
