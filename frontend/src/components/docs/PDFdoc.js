import React from "react";
import IsLoading from "../home/IsLoading";
import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import UbuntuRegular from "../../styles/Ubuntu/Ubuntu-Regular.ttf";
import UbuntuBold from "../../styles/Ubuntu/Ubuntu-Bold.ttf";
import UbuntuLight from "../../styles/Ubuntu/Ubuntu-Light.ttf";
import { localeDate, formPrice } from "../../lib/helpers";
import Terms from "./Terms";
import { styles } from "./Styles";
import { logoBase64 } from "../../lib/logoBase64";

Font.register({
  family: "Ubuntu",
  fonts: [
    { src: UbuntuRegular, fontWeight: "normal", fontStyle: "normal" },
    { src: UbuntuBold, fontWeight: "bold", fontStyle: "normal" },
    { src: UbuntuLight, fontWeight: "light", fontStyle: "normal" },
  ],
});

const capitalize = (str) =>
  str
    ? str
        .split("\n") // önce satır satır ayır
        .map((line) =>
          line
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")
        )
        .join("\n")
    : "";

const PDFdoc = ({ doc, versionNumber }) => {
  if (!doc) return null;

  let selectedVersion;

  if (versionNumber && Array.isArray(doc.versions) && doc.versions.length > 0) {
    selectedVersion = doc.versions.find((v) => v.version === versionNumber);
  }

  if (!selectedVersion) {
    selectedVersion = doc.versions[doc.versions.length - 1]; // fallback son versiyon
  }

  const { docType } = doc;

  return (
    <Document author="varol" producer="varol" creator="varol">
      <Page size="A4" dpi="72" style={styles.page}>
        <View style={{ margin: "15px 20px" }}>
          <Header doc={doc} version={selectedVersion} />
          <Customer doc={selectedVersion} />
          <PriceTable doc={selectedVersion} />
          {selectedVersion.showTotals && <TotalsTable doc={selectedVersion} />}
          <Terms doc={selectedVersion} />
          {(docType === "PRO" || docType === "SOZ") && (
            <BankInfo doc={selectedVersion} />
          )}
        </View>
      </Page>
    </Document>
  );
};

export default PDFdoc;

// Styles for PDF content

const Customer = ({ doc }) => (
  <View style={styles.container}>
    <View style={styles.flexCol}>
      {/* Full-width: Firma */}
      <View style={styles.fullWidthRow}>
        <Text style={{ ...styles.label, flexBasis: "9%" }}>Firma</Text>

        <Text
          style={{
            flexBasis: "91%", // Take remaining space
            whiteSpace: "nowrap", // Prevent wrapping
            overflow: "hidden", // Hide overflow
            textOverflow: "ellipsis", // May not work visually in all renderers
          }}
        >
          {capitalize(doc.customer)}
        </Text>
      </View>

      {/* Full-width: Adres */}
      <View style={styles.fullWidthRow}>
        <Text style={{ ...styles.label, flexBasis: "9%" }}>Adres</Text>
        <Text
          style={{
            flexBasis: "91%", // Take remaining space
            whiteSpace: "nowrap", // Prevent wrapping
            overflow: "hidden", // Hide overflow
            textOverflow: "ellipsis", // May not work visually in all renderers
          }}
        >
          {capitalize(doc.address)}
        </Text>
      </View>

      {/* Two-column layout */}
      <View style={styles.flexRow}>
        {/* Left Column (60%) */}
        <View style={{ width: "60%" }}>
          <View style={styles.flexRow}>
            {doc.person && (
              <>
                <Text style={{ ...styles.label, flexBasis: "14.4%" }}>
                  İlgili
                </Text>
                <Text>Sn. {capitalize(doc.person)}</Text>
              </>
            )}
          </View>
          <View style={styles.flexRow}>
            {doc.phone && (
              <>
                <Text style={{ ...styles.label, flexBasis: "14.4%" }}>
                  Telefon
                </Text>
                <Text>{doc.phone}</Text>
              </>
            )}
          </View>
        </View>

        {/* Right Column (40%) */}
        <View style={{ width: "40%" }}>
          <View style={styles.flexRow}>
            {doc.vd && (
              <>
                <Text style={{ ...styles.label, flexBasis: "25%" }}>
                  Vergi No
                </Text>
                <Text>{capitalize(doc.vd)}</Text>
                <Text>{doc.vatNo}</Text>
              </>
            )}
          </View>
          <View style={styles.flexRow}>
            {doc.email && (
              <>
                <Text style={{ ...styles.label, flexBasis: "25%" }}>
                  Eposta
                </Text>
                <Text>{doc.email}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  </View>
);

const Header = ({ doc, version }) => {
  const headerTitles = {
    TEK: "Fiyat Teklifi",
    PRO: "Proforma Fatura",
    SOZ: "Satış Sözleşmesi",
    SIP: "Satın Alma Formu",
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "25%", alignItems: "flex-start" }}>
        <Image
          src={logoBase64}
          cache={false}
          style={{
            height: "auto",
            width: "auto",
          }}
        />
      </View>
      <Text style={styles.heading}>{headerTitles[doc.docType]}</Text>
      <View style={{ ...styles.flexCol, flexBasis: "25%" }}>
        <View style={{ ...styles.flexRow }}>
          <Text
            style={{
              ...styles.item,
              ...styles.label,
              flexBasis: "50%",
            }}
          >
            Tarih
          </Text>
          <Text style={{ ...styles.item, flexBasis: "50%" }}>
            {localeDate(version.docDate)}
          </Text>
        </View>
        {doc.docType !== "SOZ" && (
          <>
            <View style={{ ...styles.flexRow }}>
              <Text
                style={{
                  ...styles.item,
                  ...styles.label,
                  flexBasis: "50%",
                }}
              >
                Geçerli
              </Text>
              <Text style={{ ...styles.item, flexBasis: "50%" }}>
                {localeDate(version.validDate)}
              </Text>
            </View>
          </>
        )}
        <View style={{ ...styles.flexRow }}>
          <Text
            style={{
              ...styles.item,
              ...styles.label,
              flexBasis: "50%",
            }}
          >
            Belge No
          </Text>
          <Text style={{ ...styles.item, flexBasis: "50%" }}>
            {doc.docCode}
          </Text>
        </View>
        <View style={{ ...styles.flexRow }}>
          <Text
            style={{ width: "100%", padding: "2px 0px", color: "grey" }}
          ></Text>
        </View>
      </View>
    </View>
  );
};

const PriceTable = ({ doc }) => {
  const { lineItems } = doc;
  return (
    <View style={{ ...styles.container, margin: "0px 0px" }}>
      <View
        style={{
          ...styles.flexCol,
          margin: "0px 0px",
          borderBottom: "1px solid black",
        }}
      >
        <View
          style={{
            ...styles.flexRow,
            gap: 0,
            alignItems: "center",
            border: "1px solid black",
          }}
        >
          <Text style={{ flexBasis: "5%", ...styles.head }}>No</Text>
          <Text style={{ flexBasis: "62%", ...styles.head }}>Açıklama</Text>
          <Text style={{ flexBasis: "5%", ...styles.head }}>Ad.</Text>
          <Text style={{ flexBasis: "14%", ...styles.head }}>Birim Fiyat</Text>
          <Text
            style={{
              flexBasis: "14%",
              ...styles.head,
              borderRight: "0px solid black",
            }}
          >
            Toplam Fiyat
          </Text>
        </View>
        {lineItems?.map((item, i) => (
          <View
            key={i}
            style={{
              ...styles.flexRow,
              gap: 0,
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
          >
            <Text
              style={{
                flexBasis: "5%",
                ...styles.cell,
                textAlign: "center",
              }}
            >
              {String(item.position).padStart(2, "0")}
            </Text>
            <View
              style={{
                ...styles.flexCol,
                flexBasis: "62%",
                ...styles.cell,
                margin: "0px 0px",
                padding: "2px 2px",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {item.desc.toUpperCase()}
              </Text>
              {item.caption && (
                <Text style={{ color: "grey" }}>
                  {capitalize(item.caption)}
                </Text>
              )}
              {item.origin && (
                <View style={{ ...styles.flexRow }}>
                  <>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      Menşei
                    </Text>
                    <Text style={{}}>{item.origin}</Text>
                  </>
                </View>
              )}

              {/* GTIP No ve Durumu aynı satırda, arada 20px boşluk */}
              {(item.gtipNo || item.condition) && (
                <View style={{ ...styles.flexRow, marginBottom: 2 }}>
                  {item.gtipNo && (
                    <View style={{ flexDirection: "row", marginRight: 20 }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "grey",
                          marginRight: 4,
                        }}
                      >
                        GTİP
                      </Text>
                      <Text>{item.gtipNo}</Text>
                    </View>
                  )}

                  {item.condition && (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "grey",
                          marginRight: 4,
                        }}
                      >
                        Durumu
                      </Text>
                      <Text>{item.condition}</Text>
                    </View>
                  )}
                </View>
              )}
              {/* GTIP No ve Durumu aynı satırda, arada 20px boşluk */}
            </View>

            <Text
              style={{
                flexBasis: "5%",
                ...styles.cell,
                textAlign: "center",
              }}
            >
              {item.quantity}
            </Text>
            <Text
              style={{
                flexBasis: "14%",
                ...styles.cell,
                textAlign: "right",
              }}
            >
              {formPrice(item.price)} {doc.currency}
            </Text>
            <Text
              style={{
                flexBasis: "14%",
                ...styles.cell,
                borderRight: "0px solid black",
                textAlign: "right",
              }}
            >
              {formPrice(item.totalPrice)} {doc.currency}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const TotalsTable = ({ doc }) => {
  const hasDiscount = doc.discount && doc.discountPrice !== 0;
  const hasTax = doc.kdvPrice && doc.kdvPrice !== 0;
  const showSubtotals = hasDiscount && hasTax;

  const items = [
    ...(showSubtotals
      ? [{ label: "Toplam", value: formPrice(doc.totalPrice) }]
      : []),
    ...(hasDiscount && hasTax
      ? [
          { label: "i̇ndirim", value: formPrice(doc.discount) },
          { label: "net toplam", value: formPrice(doc.netPrice) },
        ]
      : []),
    ...(hasDiscount && !hasTax
      ? [{ label: "i̇ndirim", value: formPrice(doc.discount) }]
      : []),
    ...(hasTax
      ? [
          {
            label: `KDV (${doc.kdv || 20}%)`,
            value: formPrice(doc.kdvPrice),
          },
        ]
      : []),
    {
      label: "Genel Toplam",
      value: formPrice(doc.grandTotal),
      isTotal: true,
    },
  ];

  return (
    <View
      style={{
        margin: "0px 0px",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          marginLeft: "auto",
          flexBasis: "33%",
        }}
      >
        {items.map((item, i) => (
          <View
            key={i}
            style={{
              ...styles.flexRow,
              borderBottom: "1px solid black",
              borderColor: "gray",
              padding: "2px 4px",
              margin: "0px 0px",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={
                item.label === "Genel Toplam" && {
                  fontWeight: "bold",
                }
              }
            >
              {item.label}
            </Text>
            <Text
              style={
                item.label === "Genel Toplam" && {
                  fontWeight: "bold",
                }
              }
            >
              {item.label === "İndirim" && "- "}
              {item.value} {doc.currency}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const BankInfo = ({ doc }) => (
  <View style={{ flexGrow: "1", margin: "4px 0px" }}>
    <Text
      style={{
        padding: "2px 4px",
        color: "#162a42",
        borderBottom: "1px solid gray",
        fontWeight: "bold",
      }}
    >
      BANKA HESAP BİLGİLERİ
    </Text>
    <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
      <Text style={{ flexBasis: "20%", ...styles.label }}>SATICI FİRMA</Text>
      <Text>VAROL TEKNİK MAKİNE SANAYİ ve TİCARET LTD. ŞTİ.</Text>
    </View>
    <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
      <Text style={{ flexBasis: "20%", ...styles.label }}>ADRES</Text>
      <Text>
        Şerifali Mah. Turgut Özal Bulvarı, Royal Plaza B Blok No:120/A
        Ümraniye/İSTANBUL
      </Text>
    </View>
    <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
      <Text style={{ flexBasis: "20%", ...styles.label }}>BANKA</Text>
      <Text>T.C. ZİRAAT BANKASI A.Ş</Text>
    </View>
    <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
      <Text style={{ flexBasis: "20%", ...styles.label }}>
        ŞUBE / ŞUBE KODU
      </Text>
      <Text>0845-RAMİ/İSTANBUL ŞUBESİ</Text>
    </View>
    <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
      <Text style={{ flexBasis: "20%", ...styles.label }}>SWIFT NO</Text>
      <Text>TCZBTR2A</Text>
    </View>
    {doc.currency === "TL" && (
      <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
        <Text style={{ flexBasis: "20%", ...styles.label }}>TL IBAN</Text>
        <Text>TR40 0001 0008 4597 5960 3550 05</Text>
      </View>
    )}
    {doc.currency === "EUR" && (
      <>
        <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
          <Text style={{ flexBasis: "20%", ...styles.label }}>TL IBAN</Text>
          <Text>TR40 0001 0008 4597 5960 3550 05</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
          <Text style={{ flexBasis: "20%", ...styles.label }}>EURO IBAN</Text>
          <Text>TR83 0001 0008 4597 5960 3550 07</Text>
        </View>
      </>
    )}
    {doc.currency === "USD" && (
      <>
        <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
          <Text style={{ flexBasis: "20%", ...styles.label }}>TL IBAN</Text>
          <Text>TR40 0001 0008 4597 5960 3550 05</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: "2px 4px" }}>
          <Text style={{ flexBasis: "20%", ...styles.label }}>USD IBAN</Text>
          <Text>TR13 0001 0008 4597 5960 3550 06</Text>
        </View>
      </>
    )}
  </View>
);
