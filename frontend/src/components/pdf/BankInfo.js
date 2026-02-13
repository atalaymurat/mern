import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";

const BankInfo = ({ doc }) => {
  const rows = [
    {
      label: "SATICI FİRMA",
      value: "VAROL TEKNİK MAKİNE SANAYİ ve TİCARET LTD. ŞTİ.",
    },
    {
      label: "ADRES",
      value:
        "Şerifali Mah. Turgut Özal Bulvarı, Royal Plaza B Blok No:120/A Ümraniye/İSTANBUL",
    },
    {
      label: "BANKA",
      value: "T.C. ZİRAAT BANKASI A.Ş",
    },
    {
      label: "ŞUBE / ŞUBE KODU",
      value: "0845-RAMİ/İSTANBUL ŞUBESİ",
    },
    {
      label: "SWIFT NO",
      value: "TCZBTR2A",
    },
  ];

  const ibanRows = [];

  if (doc.currency === "TL") {
    ibanRows.push({
      label: "TL IBAN",
      value: "TR40 0001 0008 4597 5960 3550 05",
    });
  }

  if (doc.currency === "EUR") {
    ibanRows.push(
      {
        label: "TL IBAN",
        value: "TR40 0001 0008 4597 5960 3550 05",
      },
      {
        label: "EURO IBAN",
        value: "TR83 0001 0008 4597 5960 3550 07",
      }
    );
  }

  if (doc.currency === "USD") {
    ibanRows.push(
      {
        label: "TL IBAN",
        value: "TR40 0001 0008 4597 5960 3550 05",
      },
      {
        label: "USD IBAN",
        value: "TR13 0001 0008 4597 5960 3550 06",
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
        marginTop: 20,
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
