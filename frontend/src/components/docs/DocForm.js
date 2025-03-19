import React from 'react'
import { Formik, Form, FieldArray } from 'formik'
import FormikControl from '../formik/FormikControl'
import axios from "axios"

const DocForm = () => {
    const editMode = false
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ customer: '', person: '', address:"" }}
                onSubmit={async (values, { resetForm }) => {
                    if (!editMode) {
                        alert(JSON.stringify(values))
                        const {data} = await axios.post('/doc', values, {"withCredentials": true})
                        alert(JSON.stringify(data))
                        resetForm()

                    }
                }}
            >
                {({ values }) => {
                    return (
                        <React.Fragment>
                            <div className="w-full flex justify-center items-center">
                                <div className="lg:w-2/3 w-full border px-2 py-4">
                                <div className="font-semibold text-xl py-2 text-center">Belge Oluşturma Formu</div>
                                    <Form>
                                        <FormikControl
                                            control="input"
                                            type="text"
                                            name="customer"
                                            label="Müşteri"
                                        />
                                        <FormikControl
                                            control="input"
                                            type="text"
                                            name="person"
                                            label="İlgili Kişi"
                                        />
                                        <FormikControl
                                            control="input"
                                            type="text"
                                            name="address"
                                            label="Adres"
                                        />
                                        <button
                                            type="submit"
                                            className="btn-submit mt-6 mb-2 w-full"
                                        >
                                            Kaydet
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }}
            </Formik>
        </div>
    )
}

export default DocForm
