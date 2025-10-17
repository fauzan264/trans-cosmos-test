"use client";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/ui/button";
import { loginSchema } from "@/features/auth/login/schemas/loginSchema";
import { login } from "@/service/auth";
import useAuthStore from "@/store/useAuthStore";
import { ErrorResponse } from "@/types/error";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await login({ email, password });
      setAuth({
        token: response.data.data.token,
        id: response.data.data.id,
        name: response.data.data.full_name,
        role: response.data.data.role,
      });

      toast.info(response.data.message);
      router.push(decodeURIComponent(callbackUrl));
    } catch (error: unknown) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => {
      onLogin({ email, password });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center mt-15">
      <div className="card w-4/5 md:w-2/5 card-border card-md bg-slate-50 shadow-sm p-5 rounded-xl">
        <div className="card-body">
          <div className="card-title justify-center text-slate-800">Login</div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap">
              <FormInput
                formik={formik}
                name="email"
                label="Email"
                type="email"
              />
              <FormInput
                formik={formik}
                name="password"
                label="Password"
                type="password"
              />
              <Button type="submit" name="Login" />
            </div>
          </form>
          <p className="mt-3 text-slate-800 mb-5">
            You have an account?{" "}
            <Link href="/register" className="text-emerald-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
