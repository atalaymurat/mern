import { useState, useEffect } from "react";
import { localeDate, formPrice } from "../../lib/helpers";
import VersionSelector from "./VersionSelector";
import Links from "./Links";
import DocTable from "./DocTable";

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
  const handleVersionChange = (index) => {
    if (!isNaN(index) && index >= 0 && index < doc.versions.length) {
      setSelectedVersionIndex(index);
    }
  };

  const docFields = [
    { label: "Müşteri", value: selectedVersion.customer },
    { label: "Tarih", value: localeDate(selectedVersion.docDate) },
    { label: "Yetkili", value: selectedVersion.person },
    { label: "Adres", value: selectedVersion.address },
    { label: "Telefon", value: selectedVersion.phone },
    { label: "Email", value: selectedVersion.email },
    { label: "Vergi Dairesi", value: selectedVersion.vd },
    { label: "Vergi No", value: selectedVersion.vatNo },
    { label: "Ödeme Şekli", value: selectedVersion.paymentTerms },
    { label: "Teslim süresi", value: selectedVersion.deliveryDate },
    { label: "Teslim Yeri", value: selectedVersion.deliveryTerms },
    { label: "Garanti", value: selectedVersion.warranty },
    { label: "Aciklamalar", value: selectedVersion.extraLine },
    { label: "KDV Orani", value: selectedVersion.kdv },
    {
      label: "Net Fiyat",
      value: `${formPrice(selectedVersion.netPrice)} ${
        selectedVersion.currency
      }`,
    },
    {
      label: "Indirimli Fiyat",
      value: `${formPrice(selectedVersion.discountPrice)} ${
        selectedVersion.currency
      }`,
    },
    {
      label: "KDV",
      value: selectedVersion.kdvPrice
        ? `${formPrice(selectedVersion.kdvPrice)} ${selectedVersion.currency}`
        : "",
    },
    {
      label: "Toplam Fiyat",
      value: `${formPrice(selectedVersion.totalPrice)} ${
        selectedVersion.currency
      }`,
    },
    { label: "Versiyon", value: selectedVersion.version },
    { label: "Oluşturan", value: doc?.user?.displayName },
  ];

  return (
    <div className="lg:w-4/6 mx-auto">
      <div className="flex flex-col px-2 mx-2">
        <div className="text-xl font-semibold px-2 py-4 mb-2">
          {doc.docCode}
        </div>
        <Links
          doc={doc}
          selectedVersion={selectedVersion}
          versionNumber={selectedVersion.version}
        />
        <VersionSelector
          versions={doc.versions}
          selectedIndex={selectedVersionIndex ?? 0} // fallback 0
          onChange={handleVersionChange}
        />
      </div>

      <DocTable docFields={docFields} selectedVersion={selectedVersion} />
    </div>
  );
};

export default Doc;
