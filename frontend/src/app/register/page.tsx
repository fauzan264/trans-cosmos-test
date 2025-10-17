"use client";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/ui/button";
import { registerSchema } from "@/features/auth/register/schemas/registerSchema";
import { IAuth } from "@/features/auth/types";
import PublicOnlyGuard from "@/hoc/PublicOnlyGuard";
import { register } from "@/service/auth";
import { ErrorResponse } from "@/types/error";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function RegisterPage() {
  const router = useRouter();

  const onRegister = async ({ name, email, password }: IAuth) => {
    try {
      const response = await register({
        name,
        email,
        password,
        role: "user",
      });

      toast.info(response.data.message);
      router.push("/");
    } catch (error: unknown) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: ({ name, email, password }) => {
      onRegister({
        name,
        email,
        password,
      });
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center mt-15">
      <div className="card w-4/5 md:w-2/5 card-border card-md bg-slate-50 shadow-sm p-5 rounded-xl">
        <div className="card-body">
          <div className="card-title justify-center text-slate-800">
            Register
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap">
              <FormInput formik={formik} name="name" label="Name" />
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
              <Button type="submit" name="Register" />
            </div>
          </form>
          <p className="mt-3 text-slate-800">
            You have an account?{" "}
            <Link href="/login" className="text-emerald-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicOnlyGuard(RegisterPage);
