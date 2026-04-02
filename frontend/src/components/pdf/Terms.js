import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { styles } from "../docs/Styles";
import { capitalize } from "./Capitalize";
import { TERMS_CONFIG } from "../../lib/termsConfig";

const Terms = ({ doc }) => {
  const fieldValues = [
    {
      title: TERMS_CONFIG.TITLES.DELIVERY_TIME,
      content: capitalize(doc.deliveryDate),
      footer: TERMS_CONFIG.FOOTERS.DELIVERY_TIME,
    },
    {
      title: TERMS_CONFIG.TITLES.DELIVERY_PLACE,
      content: capitalize(doc.deliveryTerms),
    },
    {
      title: TERMS_CONFIG.TITLES.WARRANTY,
      content: capitalize(doc.warranty),
      footer: TERMS_CONFIG.FOOTERS.WARRANTY,
    },
    {
      title: TERMS_CONFIG.TITLES.PAYMENT,
      content: capitalize(doc.paymentTerms),
    },
  ];

  const explanation = {
    title: TERMS_CONFIG.TITLES.EXPLANATION,
    content: capitalize(doc.extraLine),
    footer: TERMS_CONFIG.FOOTERS.EXPLANATION,
    extra: doc.isNewSign ? TERMS_CONFIG.EXTRA.NEW_MACHINE : "",
  };

  const nonEmptyFields = fieldValues.filter((item) => item.content?.trim());

  const renderFieldRows = () => {
    const rows = [];

    for (let i = 0; i < nonEmptyFields.length; i += 2) {
      const rowItems = nonEmptyFields.slice(i, i + 2);

      rows.push(
        <View
          key={`row-${i}`}
          wrap={false} // 2’li blok bölünmesin
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#ccc",
            width: "100%",
          }}
        >
          {rowItems.map((item, idx) => (
            <View
              key={`item-${i}-${idx}`}
              style={{
                padding: 6,
                width: rowItems.length === 1 ? "100%" : "50%",
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 2 }}>
                {item.title}
              </Text>

              <Text>{item.content}</Text>

              {item.footer?.trim() && (
                <Text
                  style={{
                    fontSize: 8,
                    color: "grey",
                    marginTop: 2,
                  }}
                >
                  {item.footer}
                </Text>
              )}
            </View>
          ))}
        </View>,
      );
    }

    return rows;
  };

  const renderExplanation = () => {
    const { title, content, footer, extra } = explanation;
    const hasAny = content?.trim() || footer?.trim() || extra;

    if (!hasAny) return null;

    return (
      <View
        style={{
          width: "100%",
          padding: 6,
          marginTop: 2,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          {title}
        </Text>

        {content && <Text style={{ marginBottom: 3 }}>{content}</Text>}

        {extra && <Text style={{ marginBottom: 3 }}>{extra}</Text>}

        {footer && (
          <Text
            style={{
              fontSize: 8,
              color: "grey",
              lineHeight: 1.3,
            }}
          >
            {footer}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        marginTop: 4,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: "bold",
          paddingVertical: 4,
          borderBottomWidth: 1,
          borderColor: "#999",
          color: "#162a42",
        }}
      >
        TESLİM ŞARTLARI
      </Text>

      {renderFieldRows()}
      {renderExplanation()}
    </View>
  );
};

export default Terms;
