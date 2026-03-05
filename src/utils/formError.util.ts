import { HttpError } from "@/api/http.types";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { showError } from "./toast.util";

export const showFormatErrors = <T extends FieldValues>(
  error: unknown,
  setError?: UseFormSetError<T>,
  fallbackMessage = "Something went wrong",
) => {
  if (!(error instanceof HttpError)) {
    showError(fallbackMessage);
    return;
  }

  if (!error.errors?.length) {
    showError(error.message || fallbackMessage);
    return;
  }

  // Nếu không có setError → show tất cả error bằng toast
  if (!setError) {
    const message = error.errors.map((e) => e.message).join("\n");
    showError(message);
    return;
  }

  const fieldMap: Record<string, string[]> = {};

  error.errors.forEach((e) => {
    if (!e.field) return;

    if (!fieldMap[e.field]) fieldMap[e.field] = [];

    fieldMap[e.field].push(e.message);
  });

  Object.entries(fieldMap).forEach(([field, messages]) => {
    setError(field as Path<T>, {
      type: "server",
      message: messages.join("\n"),
    });
  });
};
