import React from 'react'
import { Formik, Form, FieldArray } from 'formik'
import FormikControl from '../formik/FormikControl'
import axios from 'axios'
import { GTIP_NUMBERS, CUR_TYPES } from './helpers'

const DocForm = ({ user }) => {
    const INITIAL_VALUES = {
        customer: '',
        person: '',
        address: '',
        email: '',
        phone: '',
        vd: '',
        vatNo: '',
        currency: '',
        lineItems: [
            {
                position: 1,
                condition: '',
                origin: '',
                gtipNo: '',
                desc: '',
                caption: '',
                quantity: '',
                price: '',
            },
        ],
        user: user?._id || null,
        paymentTerms: '',
        deliveryDate: '',
        warranty: '',
        kdv: 20,
        discount: '',
        deliveryTerms: '',
        isNewSign: false,
        showTotals: true,
    }

    const WorkButtonGroup = ({ values, i, remove, push }) => {
        return (
            <>
                <div className="grid grid-cols-2 mt-4">
                    <button
                        type="button"
                        className="btn-submit"
                        onClick={() =>
                            push({
                                ...INITIAL_VALUES.lineItems[0],
                                position: i + 2,
                            })
                        }
                    >
                        Ekle
                    </button>
                    {values.lineItems.length > 1 && (
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Silme Islemini Onayliyormusun'
                                    )
                                )
                                    remove(i)
                            }}
                        >
                            İptal
                        </button>
                    )}
                </div>
            </>
        )
    }

    const editMode = false
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={INITIAL_VALUES}
                onSubmit={async (values, { resetForm }) => {
                    if (!editMode) {
                        alert(JSON.stringify(values, null, 2))

                        const { data } = await axios.post('/doc', values, {
                            withCredentials: true,
                        })
                        alert(JSON.stringify(data))
                        // resetForm()
                    }
                }}
            >
                {({ values }) => {
                    return (
                        <React.Fragment>
                            <div className="w-full flex justify-center items-center">
                                <div className="lg:w-2/3 w-full border px-2 py-4">
                                    <div className="font-semibold text-xl py-2 text-center">
                                        Belge Oluşturma Formu
                                    </div>
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
                                            type="email"
                                            name="email"
                                            label="E-Posta"
                                        />
                                        <FormikControl
                                            control="input"
                                            type="text"
                                            name="phone"
                                            label="Telefon"
                                        />
                                        <FormikControl
                                            control="input"
                                            type="text"
                                            name="address"
                                            label="Adres"
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="vd"
                                                label="Vergi Dairesi"
                                            />
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="vatNo"
                                                label="Vergi No"
                                            />
                                        </div>
                                        {/* FİYATLANDIRMA İLE İLGİLİ BÖLÜM */}
                                        <div className="mt-4 border py-4 px-2 rounded-lg bg-zinc-100">
                                            <FormikControl
                                                control="select"
                                                options={CUR_TYPES}
                                                type="text"
                                                name="currency"
                                                label="Belge Para Birimi"
                                            />
                                        </div>

                                        {/* LINE ITEMS */}

                                        <div className="mt-4 border py-4 px-2 rounded-lg bg-zinc-100">
                                            {values.lineItems.map((itm, i) => (
                                                <FieldArray
                                                    name="lineItems"
                                                    key={i}
                                                >
                                                    {({
                                                        insert,
                                                        remove,
                                                        push,
                                                    }) => (
                                                        <div className="border bg-gray-200 py-2 px-2 rounded-md mb-3 ">
                                                            <div className="grid grid-cols-12 gap-2">
                                                                <div>
                                                                    <FormikControl
                                                                        control="input"
                                                                        type="text"
                                                                        name={`lineItems.${i}.position`}
                                                                        label="No"
                                                                    />
                                                                </div>
                                                                <div className="col-span-11 grid grid-cols-3 gap-2">
                                                                    <FormikControl
                                                                        control="select"
                                                                        options={[
                                                                            {
                                                                                value: 'Yeni',
                                                                                label: 'Yeni',
                                                                            },
                                                                            {
                                                                                value: '2.El',
                                                                                label: '2.El',
                                                                            },
                                                                        ]}
                                                                        type="text"
                                                                        name={`lineItems.${i}.condition`}
                                                                        label="Durumu"
                                                                    />
                                                                    <FormikControl
                                                                        control="input"
                                                                        type="text"
                                                                        name={`lineItems.${i}.origin`}
                                                                        label="Menşei"
                                                                    />
                                                                    <FormikControl
                                                                        control="select"
                                                                        options={
                                                                            GTIP_NUMBERS
                                                                        }
                                                                        type="text"
                                                                        name={`lineItems.${i}.gtipNo`}
                                                                        label="GTIP No"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                name={`lineItems.${i}.desc`}
                                                                label="Ürün Tanımı"
                                                            />
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                name={`lineItems.${i}.caption`}
                                                                label="Alt Başlık"
                                                            />
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <FormikControl
                                                                    control="input"
                                                                    type="number"
                                                                    name={`lineItems.${i}.price`}
                                                                    label="Birim Fiyat"
                                                                />
                                                                <FormikControl
                                                                    control="input"
                                                                    type="number"
                                                                    name={`lineItems.${i}.quantity`}
                                                                    label="Adet"
                                                                />
                                                            </div>
                                                            <WorkButtonGroup
                                                                values={values}
                                                                i={i}
                                                                remove={remove}
                                                                push={push}
                                                            />
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            ))}
                                        </div>

                                        <div className="grid gap-1 grid-cols-2">
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="kdv"
                                                label="KDV Oranı"
                                            />
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="discount"
                                                label="İndirim Miktarı"
                                            />
                                        </div>
                                        <div className="grid gap-1 grid-cols-2">
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="deliveryTerms"
                                                label="Teslim Yeri"
                                            />
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="warranty"
                                                label="Garanti Süresi"
                                            />
                                        </div>
                                        <FormikControl
                                            control="textArea"
                                            type="text"
                                            name="deliveryDate"
                                            label="Teslim Süresi"
                                        />
                                        <FormikControl
                                            control="textArea"
                                            type="text"
                                            name="paymentTerms"
                                            label="Ödeme Şekli"
                                        />
                                        <div className='grid grid-cols-2 gap-1 justify-items-start'>
                                        <FormikControl
                                            control="checkbox"
                                            name={`isNewSign`}
                                            label="Yeni İbaresi Eklensin"
                                        />
                                        <FormikControl
                                            control="checkbox"
                                            name={`showTotals`}
                                            label="Toplamlar Gösterilsin"
                                        />

                                        </div>

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
