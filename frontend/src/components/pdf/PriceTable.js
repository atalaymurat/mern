import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { styles } from "../docs/Styles";
import { capitalize } from "./Capitalize";
import {  formPrice } from "../../lib/helpers";

const PriceTable = ({ doc }) => {
  return (
    <View style={{ marginTop: 20 }}>

      {/* TABLE HEADER */}
      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "black",
          paddingVertical: 5,
        }}
      >
        <Text style={{ width: "5%" }}>No</Text>
        <Text style={{ width: "55%" }}>Açıklama</Text>
        <Text style={{ width: "10%" }}>Ad.</Text>
        <Text style={{ width: "15%", textAlign: "right" }}>Birim</Text>
        <Text style={{ width: "15%", textAlign: "right" }}>Toplam</Text>
      </View>

      {/* LINE ITEMS */}
      {doc.lineItems?.map((item, i) => (
        <View
          key={i}
          wrap={false}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingVertical: 6,
            borderBottomWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <Text style={{ width: "5%" }}>
            {String(i + 1).padStart(2, "0")}
          </Text>

          {/* DESCRIPTION COLUMN */}
          <View style={{ width: "55%", flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.desc?.toUpperCase()}
            </Text>

            {item.caption && (
              <Text style={{ fontSize: 9, color: "grey" }}>
                {capitalize(item.caption)}
              </Text>
            )}

            {item.origin && (
              <Text style={{ fontSize: 9 }}>
                <Text style={{ fontWeight: "bold", color: "grey" }}>
                  Menşei:{" "}
                </Text>
                {item.origin}
              </Text>
            )}
            {item.gtipNo && (
              <Text style={{ fontSize: 9 }}>
                <Text style={{ fontWeight: "bold", color: "grey" }}>
                  Gtip:{" "}
                </Text>
                {item.gtipNo}
              </Text>
            )}
          </View>

          <Text style={{ width: "10%" }}>
            {item.quantity}
          </Text>

          <Text style={{ width: "15%", textAlign: "right" }}>
            {formPrice(item.price)} {doc.currency}
          </Text>

          <Text style={{ width: "15%", textAlign: "right" }}>
            {formPrice(item.totalPrice)} {doc.currency}
          </Text>
        </View>
      ))}

    </View>
  );
};

export default PriceTable;

