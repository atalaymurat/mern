import React from "react"
import {Formik, Form } from "formik"
import FormikControl from "../formik/FormikControl"
import * as Yup from "yup"
import axios from "axios"


const validationSchema = Yup.object({
    email: Yup.string().email("Geçersiz Email").required("Required"),
    password: Yup.string().max(7).required("Required")
})

const LoginForm = () => {
    return (
        <React.Fragment>
            <div className="px-1 py-2 my-4 bg-gray-200 text-blue-600 border rounded-lg max-w-md mx-auto flex">
                <div className="w-full px-4 py-2">
                <div className="text-xl font-bold py-1 text-center">Login</div> 
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const res = await axios.post('/auth/login', values, {withCredentials: true})
                        console.log("Submit Response:", res)
                    }}
                >
                    <Form>
                        <FormikControl 
                            control="input"
                            type="text"
                            label="Email"
                            name="email"
                        />
                        <FormikControl 
                            control="password"
                            type="password"
                            label="Password"
                            name="password"
                        />
                        <button type="submit" className="btn-submit mt-4 mb-2 w-full">
                        Login
                        </button>

                    </Form>

                </Formik>

                </div>
            </div>
        </React.Fragment>
    )
}

export default LoginForm