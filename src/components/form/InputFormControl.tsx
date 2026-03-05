import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  type?: string;
};

export const InputFormControl = ({ label, placeholder, type = "text", register, error }: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        style={{ borderColor: error ? "red" : "" }}
      />

      {error && (
        <ul className="text-xs text-red-600 mt-1">
          {error.message?.split("\n").map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
