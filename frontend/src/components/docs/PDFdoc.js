import React from "react";
import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import UbuntuRegular from "../../styles/Ubuntu/Ubuntu-Regular.ttf";
import UbuntuBold from "../../styles/Ubuntu/Ubuntu-Bold.ttf";
import UbuntuLight from "../../styles/Ubuntu/Ubuntu-Light.ttf";
import { localeDate, formPrice } from "../../lib/helpers";
import { styles } from "./Styles";
import { logoBase64 } from "../../lib/logoBase64";
import Header from "../pdf/Header";
import Customer from "../pdf/Customer";
import PriceTable from "../pdf/PriceTable";
import TotalsTable from "../pdf/TotalsTable";
import Terms from "../pdf/Terms";
import BankInfo from "../pdf/BankInfo";

Font.register({
  family: "Ubuntu",
  fonts: [
    { src: UbuntuRegular, fontWeight: "normal", fontStyle: "normal" },
    { src: UbuntuBold, fontWeight: "bold", fontStyle: "normal" },
    { src: UbuntuLight, fontWeight: "light", fontStyle: "normal" },
  ],
});

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
      <Page size="A4" dpi={72} style={styles.page}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
        >
          <View>
            <Header doc={doc} version={selectedVersion} />
            <Customer doc={selectedVersion} />
            <PriceTable doc={selectedVersion} />
            {selectedVersion.showTotals && (
              <TotalsTable doc={selectedVersion} />
            )}
            <Terms doc={selectedVersion} />
          </View>

          <View style={{ marginTop: 20 }}>
            {(docType === "PRO" || docType === "SOZ") && (
              <BankInfo doc={selectedVersion} />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFdoc;
