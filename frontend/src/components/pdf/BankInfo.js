import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { firmaAdi , adres, bankaAdi, swiftNo, tlIban, usdIban, eurIban, subeKodu } from '../../lib/firmConfig'

const BankInfo = ({ doc }) => {
  const rows = [
    {
      label: "SATICI FİRMA",
      value: firmaAdi,
    },
    {
      label: "ADRES",
      value: adres,
    },
    {
      label: "BANKA",
      value: bankaAdi,
    },
    {
      label: "ŞUBE",
      value: subeKodu,
    },
    {
      label: "SWIFT NO",
      value: swiftNo,
    },
  ];

  const ibanRows = [];

  if (doc.currency === "TL") {
    ibanRows.push({
      label: "TL IBAN",
      value: tlIban,
    });
  }

  if (doc.currency === "EUR") {
    ibanRows.push(
      {
        label: "TL IBAN",
        value: tlIban,
      },
      {
        label: "EURO IBAN",
        value: eurIban,
      }
    );
  }

  if (doc.currency === "USD") {
    ibanRows.push(
      {
        label: "TL IBAN",
        value: tlIban,
      },
      {
        label: "USD IBAN",
        value: usdIban,
      }
    );
  }

  const renderRow = (item, i) => (
    <View
      key={i}
      style={{
        flexDirection: "row",
        paddingVertical: 3,
        paddingHorizontal: 4,
      }}
    >
      <Text
        style={{
          width: "22%",
          fontWeight: "bold",
        }}
      >
        {item.label}
      </Text>
      <Text style={{ width: "78%" }}>{item.value}</Text>
    </View>
  );

  return (
    <View
      wrap={false} // Komple bölünmesin
      style={{
        marginTop: 3,
      }}
    >
      <Text
        style={{
          paddingVertical: 4,
          borderBottomWidth: 1,
          borderColor: "#999",
          fontWeight: "bold",
          color: "#162a42",
        }}
      >
        BANKA HESAP BİLGİLERİ
      </Text>

      {rows.map(renderRow)}
      {ibanRows.map(renderRow)}
    </View>
  );
};

export default BankInfo;
