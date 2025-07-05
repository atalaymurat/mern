import React, { useState, useEffect } from "react";
import PdfLinks from "./PdfLinks";
import { formPrice, localeDate } from "../../lib/helpers";
import { Link } from "react-router-dom";
import VersionSelector from "./VersionSelector";

const Doc = ({ doc }) => {
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(undefined);

  useEffect(() => {
    if (doc?.versions?.length) {
      setSelectedVersionIndex(doc.versions.length - 1);
    }
  }, [doc]);

  if (!doc?.versions?.length) {
    return <div>Versiyon bulunamadı.</div>;
  }

  const selectedVersion =
    typeof selectedVersionIndex === "number" &&
    doc?.versions?.[selectedVersionIndex]
      ? doc.versions[selectedVersionIndex]
      : null;

  if (!selectedVersion) return <div>Versiyon bulunamadı.</div>;

  const docFields = [
    { label: "Müşteri", value: selectedVersion.customer },
    { label: "Yetkili", value: selectedVersion.person },
    { label: "Adres", value: selectedVersion.address },
    { label: "Telefon", value: selectedVersion.phone },
    { label: "Email", value: selectedVersion.email },
    { label: "Vergi Dairesi", value: selectedVersion.vd },
    { label: "Vergi No", value: selectedVersion.vatNo },
    { label: "Oluşturan", value: doc?.user?.displayName },
    { label: "Versiyon", value: selectedVersion.version },
    { label: "Ödeme Şekli", value: selectedVersion.paymentTerms },
    { label: "Teslim süresi", value: selectedVersion.deliveryDate },
    { label: "Teslim Yeri", value: selectedVersion.deliveryTerms },
    { label: "Garanti", value: selectedVersion.warranty },
    { label: "Tarih", value: localeDate(selectedVersion.docDate) },
  ];

  const handleVersionChange = (index) => {
    if (!isNaN(index) && index >= 0 && index < doc.versions.length) {
      setSelectedVersionIndex(index);
    }
  };

  return (
    <>
      <div className="flex flex-col px-2 mx-2">
        <div className="text-xl font-semibold px-2 py-4 mb-2">
          {doc.docCode}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/doc">
            <button className="btn-link mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>

          <PdfLinks
            doc={doc}
            version={selectedVersion}
            versionNumber={selectedVersion.version}
          />

          {/* Version Selector */}
        </div>
        <VersionSelector
          versions={doc.versions}
          selectedIndex={selectedVersionIndex ?? 0} // fallback 0
          onChange={handleVersionChange}
        />
      </div>

      {/* TABLE */}
      <div className="grid grid-cols-3 lg:grid-cols-8 gap-1 px-2 py-4 border mx-2">
        {docFields.map((item, i) => (
          <React.Fragment key={i}>
            <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">
              {item.label}
            </div>
            <div className="px-2 py-1 border-b col-span-2 lg:col-span-3">
              {item.value}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mx-2">
        {selectedVersion?.lineItems?.map((item, i) => (
          <div key={item._id || i}>
            <div className="border grid grid-flow-row grid-cols-4 grid-rows-4 text-sm items-center gap-1 my-2 px-2">
              <div className="border col-span-4 self-end">{item.desc}</div>
              <div className="border col-span-4 row-span-2 whitespace-pre-line">
                {item.caption}
              </div>
              <div className="border">{item.condition}</div>
              <div className="border">{item.origin}</div>
              <div className="col-span-2">{item.gtipNo}</div>
              <div className="justify-self-center row-span-2">
                {item.quantity} adet
              </div>
              <div className="border col-span-3">
                {formPrice(item.price)} {selectedVersion.currency}
              </div>
              <div className="border col-span-3">
                {formPrice(item.totalPrice)} {selectedVersion.currency}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Doc;
