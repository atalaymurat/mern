import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useAuthSWR } from "../../hooks/useAuthSWR"; // Import useAuthSWR

const validationSchema = Yup.object({
  email: Yup.string().email("Geçersiz Email").required("Email zorunludur"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(20, "Şifre en fazla 20 karakter olabilir")
    .required("Şifre zorunludur"),
});

const LoginForm = () => {
  const { login } = useAuth(); // Get login from useAuth
  const { mutate } = useAuthSWR(); // Get mutate from useAuthSWR

  return (
    <React.Fragment>
      <div className="px-1 py-2 my-4 bg-gray-200 text-blue-600 border rounded-lg max-w-md mx-auto flex">
        <div className="w-full px-4 py-2">
          <div className="text-xl font-bold py-1 text-center">Kullanıcı Girişi</div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                const res = await axios.post("/auth/login", values, {
                  withCredentials: true,
                });

                if (res.status === 200) {
                  const user = res.data.user
                  login(user); // Update authentication state in context
                  await mutate(); // Revalidate SWR cache
                  console.log("Login Success");
                }
              } catch (error) {
                // Handle login errors
                if (error.response?.data?.message) {
                  setFieldError("password", error.response.data.message);
                } else {
                  setFieldError("password", "Login failed. Please try again.");
                }
              } finally {
                setSubmitting(false); // Reset form submission state
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Email adresinizi girin"
                />
                <FormikControl
                  control="input"
                  type="password"
                  label="Şifre"
                  name="password"
                  placeholder="Şifrenizi girin"
                />
                <button
                  type="submit"
                  className="btn-submit mt-4 mb-2 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;