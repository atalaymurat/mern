import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { styles } from "../docs/Styles";
import { logoBase64 } from "../../lib/logoBase64";
import { localeDate } from "../../lib/helpers";

const Header = ({ doc, version }) => {
  const headerTitles = {
    TEK: "Fiyat Teklifi",
    PRO: "Proforma Fatura",
    SOZ: "Satış Sözleşmesi",
    SIP: "Satın Alma Formu",
  };

  return (
    <View style={styles.section}>
      <View style={styles.spaceBetween}>
        {/* LEFT - LOGO */}
        <View style={{ width: "25%" }}>
          <View
            style={{
              width: 120,
              height: 96,
              justifyContent: "center",
            }}
          >
            <Image
              src={logoBase64}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </View>
        </View>

        {/* CENTER - TITLE */}
        <View style={{ width: "50%", justifyContent: "center" }}>
          <Text style={styles.heading}>{headerTitles[doc.docType]}</Text>
        </View>

        {/* RIGHT - DOCUMENT INFO */}
        <View style={{ width: "25%" }}>
          <View style={styles.spaceBetween}>
            <Text style={styles.label}>Tarih</Text>
            <Text>{localeDate(version.docDate)}</Text>
          </View>

          {doc.docType !== "SOZ" && (
            <View style={styles.spaceBetween}>
              <Text style={styles.label}>Geçerli</Text>
              <Text>{localeDate(version.validDate)}</Text>
            </View>
          )}

          <View style={styles.spaceBetween}>
            <Text style={styles.label}>Belge No</Text>
            <Text>{doc.docCode}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
