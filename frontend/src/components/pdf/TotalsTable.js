import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { styles } from "../docs/Styles";
import { formPrice } from "../../lib/helpers";

const TotalsTable = ({ doc }) => {
  const currency = doc.currency;

  const hasDiscount = doc.discount != null && doc.discountPrice !== 0;

  const hasTax = doc.kdvPrice != null && doc.kdvPrice !== 0;

  const showSubtotals = hasDiscount && hasTax;

  const items = [
    ...(showSubtotals
      ? [{ label: "Toplam", value: formPrice(doc.totalPrice) }]
      : []),

    ...(hasDiscount && hasTax
      ? [
          {
            label: "İndirim",
            value: `- ${formPrice(doc.discount)}`,
          },
          {
            label: "Net Toplam",
            value: formPrice(doc.netPrice),
          },
        ]
      : []),

    ...(hasDiscount && !hasTax
      ? [
          {
            label: "İndirim",
            value: `- ${formPrice(doc.discount)}`,
          },
        ]
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
      wrap={false}
      style={{
        marginTop: 15,
        flexDirection: "row",
      }}
    >
      {/* SOL BOŞ ALAN */}
      <View style={{ width: "67%" }} />

      {/* SAĞ BLOK */}
      <View style={{ width: "33%" }}>
        {items.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "grey",
              paddingVertical: 4,
              paddingHorizontal: 4,
            }}
          >
            <Text style={item.isTotal ? { fontWeight: "bold" } : {}}>
              {item.label}
            </Text>

            <Text style={item.isTotal ? { fontWeight: "bold" } : {}}>
              {item.value} {currency}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TotalsTable;
