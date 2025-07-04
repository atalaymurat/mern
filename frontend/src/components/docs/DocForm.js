import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import FormikControl from "../formik/FormikControl";
import axios from "axios";
import { GTIP_NUMBERS, CUR_TYPES } from "./helpers";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const DocForm = ({ user, docType, doc }) => {
  const lastVersion =
    doc && Array.isArray(doc.versions) && doc.versions.length > 0
      ? doc.versions[doc.versions.length - 1]
      : null;

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (doc) setEditMode(true);
  }, [doc]);

  const EDIT_VALUES = lastVersion
    ? {
        ...lastVersion,
        docType: docType,
        user: user?._id,
      }
    : null;
  const EMPTY_LINE_ITEM = {
    position: 0,
    condition: "",
    origin: "",
    gtipNo: "",
    desc: "",
    caption: "",
    quantity: "",
    price: "",
    totalPrice: 0,
  };

  const INITIAL_VALUES = editMode
    ? EDIT_VALUES
    : {
        docType: docType,
        customer: "",
        person: "",
        address: "",
        email: "",
        phone: "",
        vd: "",
        vatNo: "",
        currency: "",
        lineItems: [
          {
            position: 1,
            condition: "",
            origin: "",
            gtipNo: "",
            desc: "",
            caption: "",
            quantity: "",
            price: "",
          },
        ],
        user: user?._id || null,
        paymentTerms: "",
        deliveryDate: "",
        warranty: "__ Ay",
        kdv: 20,
        discount: "",
        deliveryTerms: "İstanbul Depodan",
        isNewSign: false,
        showTotals: true,
        extraLine: "",
      };

  const headerTitles = {
    PRO: "Proforma Fatura Oluştur",
    TEK: "Teklif Oluştur",
    SOZ: "Sözleşme Oluştur",
    SIP: "Sipariş Oluştur",
  };

  const WorkButtonGroup = ({ values, i, remove, push }) => {
    return (
      <>
        <div className="grid grid-cols-2 mt-4">
          <button
            type="button"
            className="btn-submit"
            onClick={() => {
              const maxPosition = Math.max(
                0,
                ...values.lineItems.map((item) => item.position || 0)
              );
              push({
                ...EMPTY_LINE_ITEM,
                position: maxPosition + 1,
              });
            }}
          >
            Ekle
          </button>
          {values.lineItems.length > 1 && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                if (window.confirm("Silme Islemini Onayliyormusun")) remove(i);
              }}
            >
              İptal
            </button>
          )}
        </div>
      </>
    );
  };

  const validation = Yup.object({
    customer: Yup.string().required("Gerekli"),
    currency: Yup.string().required("Para Birimini Belirleyin"),
    lineItems: Yup.array().of(
      Yup.object().shape({
        desc: Yup.string().required("Gerekli"),
        price: Yup.number().required("Gerekli").typeError("Rakam Giriniz"),
        quantity: Yup.number()
          .required("Gerekli")
          .min(1, "En az bir adet olabilir"),
      })
    ),
  });

  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={validation}
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (!editMode) {
            const { data } = await axios.post("/doc", values, {
              withCredentials: true,
            });

            setSubmitting(false);
            resetForm();
            navigate(`/doc`);
          }
          if (editMode) {
            try {
              await axios.patch(`/doc/${doc._id}`, values, {
                withCredentials: true,
              });
            } catch (err) {
              console.error("Error updating document:", err);
              setSubmitting(false);
              return;
            }

            setSubmitting(false);
            resetForm();
            navigate(`/doc/${doc._id}`);
          } else return;
        }}
      >
        {({ values, isSubmitting }) => {
          return (
            <React.Fragment>
              <div className="w-full flex justify-center items-center">
                <div className="lg:w-2/3 w-full border px-2 py-4">
                  <div className="font-semibold text-xl py-2 text-center">
                    {headerTitles[docType] || "Belge Oluştur"}
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
                        <FieldArray name="lineItems" key={i}>
                          {({ insert, remove, push }) => (
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
                                        label: "Seçiniz...",
                                        value: "",
                                      },
                                      {
                                        value: "Yeni",
                                        label: "Yeni",
                                      },
                                      {
                                        value: "2.El",
                                        label: "2.El",
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
                                    options={GTIP_NUMBERS}
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
                                control="textArea"
                                type="text"
                                name={`lineItems.${i}.caption`}
                                label="Alt Açıklama"
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
                    <div className="grid grid-cols-2 gap-1 justify-items-start">
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
                    <FormikControl
                      control="textArea"
                      type="text"
                      name="extraLine"
                      label="İlave Açıklamalar"
                    />

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn-submit mt-6 mb-2 w-full"
                    >
                      {isSubmitting ? "Kaydediyor..." : "Kaydet"}
                    </button>
                  </Form>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
};

export default DocForm;
