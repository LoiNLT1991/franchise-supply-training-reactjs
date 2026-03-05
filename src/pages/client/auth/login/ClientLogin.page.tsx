import { InputFormControl } from "@/components";
import { ROUTER_URL } from "@/routes/router.const";
import { useLoadingStore } from "@/stores";
import { showFormatErrors, showSuccess } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFieldName, LoginFieldTitle } from "./model";
import { loginSchema, type LoginFormValues } from "./schema/customerLogin.schema";
import { loginUseCase } from "./usecases";

const ClientLoginPage = () => {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((s) => s.setLoading);

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "loinguyenlamthanh@gmail.com",
      password: "12345678",
    },
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (formData: LoginFormValues) => {
    setLoading(true);

    try {
      // 1: Check login api
      await loginUseCase(formData);

      showSuccess("Login successful!");

      // 2: Redirect
      navigate(ROUTER_URL.HOME, { replace: true });
    } catch (err) {
      showFormatErrors(err, setError, "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <>
          <h1 className="text-2xl font-semibold text-center mb-6">Customer Login</h1>

          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            {/* Email */}
            <InputFormControl
              label={LoginFieldTitle.Email}
              register={register(LoginFieldName.Email)}
              error={errors.email}
              type="email"
              placeholder="admin@example.com"
            />

            {/* Password */}
            <InputFormControl
              label={LoginFieldTitle.Password}
              register={register(LoginFieldName.Password)}
              error={errors.password}
              type="password"
              placeholder="••••••••"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </>
        <div className="mt-4 text-center text-xs text-gray-500">© 2026 Your Company</div>
      </div>
    </div>
  );
};

export default ClientLoginPage;
