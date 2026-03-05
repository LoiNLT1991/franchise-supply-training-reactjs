import { InputFormControl } from "@/components";
import type { Role } from "@/models";
import { ROUTER_URL } from "@/routes/router.const";
import { useAdminAuthStore, useLoadingStore } from "@/stores";
import { showFormatErrors, showSuccess, showWarning } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFieldName, LoginFieldTitle } from "./models";
import { ContextSelector } from "./partials/ContextSelector.partial";
import { adminLoginSchema, type AdminLoginFormValues } from "./schema/adminLogin.schema";
import { loginUseCase, switchContextUseCase } from "./usecases";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((s) => s.setLoading);
  const userProfile = useAdminAuthStore((state) => state.user);

  const [roles, setRoles] = useState<Role[]>([]);
  const [showContextSelector, setShowContextSelector] = useState(false);

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    defaultValues: {
      email: "loinguyenlamthanh@gmail.com",
      password: "12345678",
    },
    resolver: zodResolver(adminLoginSchema),
  });

  useEffect(() => {
    if (userProfile && !userProfile.active_context) {
      setRoles(userProfile.roles);
      setShowContextSelector(true);
    }
  }, []);

  const onLogin = async (formData: AdminLoginFormValues) => {
    setLoading(true);

    try {
      const result = await loginUseCase(formData);

      // 1: If context is not already provided
      if (result.type === "REQUIRE_CONTEXT") {
        showWarning("Please select role context!");
        setRoles(result.roles);
        setShowContextSelector(true);
        return;
      }
      showSuccess("Login successful!");

      // 2: If context is already provided
      handleRedirectAdminPage();
    } catch (err) {
      showFormatErrors(err, setError, "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = async (franchise_id: string) => {
    setLoading(true);
    try {
      // 1: Switch context
      await switchContextUseCase({ franchise_id });
      showSuccess("Login successful!");

      // 2: Redirect
      handleRedirectAdminPage();
    } catch (err) {
      showFormatErrors(err, setError, "Select context failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectAdminPage = () => {
    navigate(ROUTER_URL.ADMIN, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {!showContextSelector ? (
          <>
            <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>

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
        ) : (
          <ContextSelector roles={roles} onSelect={handleRoleSelect} />
        )}

        <div className="mt-4 text-center text-xs text-gray-500">© 2026 Your Company</div>
      </div>
    </div>
  );
}
