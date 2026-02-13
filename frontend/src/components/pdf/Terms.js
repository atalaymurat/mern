


import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { styles } from "../docs/Styles";
import { capitalize } from "./Capitalize";


const Terms = ({ doc }) => {
  const fieldValues = [
    {
      title: "TESLİM SÜRESİ",
      content: capitalize(doc.deliveryDate),
      footer:
        "Sipariş Avansının Tamamının Alınmasından Sonra Geçerli Olmak Üzere",
    },
    {
      title: "TESLİM YERİ",
      content: capitalize(doc.deliveryTerms),
    },
    {
      title: "GARANTİ",
      content: capitalize(doc.warranty),
      footer:
        "Sarf malzemeleri garanti kapsamında değerlendirilmez. Şebeke Elektrik Sorunları Kaynaklı Elektriksel Arızalar Garanti Kapsamı Dışındadır.",
    },
    {
      title: "ÖDEME ŞEKLİ",
      content: capitalize(doc.paymentTerms),
    },
  ];

  const explanation = {
    title: "AÇIKLAMALAR",
    content: capitalize(doc.extraLine),
    footer: `- Özellikle belirtilmedikçe fiyatlarımıza KDV dahil değildir.
- Seri Numaralar faturada belirtilecektir.
- CE belgesine haizdir.
- G.T.I.P kod uyuşmazlıklarından satıcı sorumlu tutulamaz.
- Mücbir nedenler veya üretici kaynaklı gecikmelerden satıcı sorumlu değildir.
- Makinenin çalışması için zorunlu olan parça ve aksesuarlar dışında ilave parça ve aksesuar bulunmamaktadır.`,
    extra: doc.isNewSign
      ? "Makineler Yeni ve Kullanılmamıştır."
      : "",
  };

  const nonEmptyFields = fieldValues.filter((item) =>
    item.content?.trim()
  );

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
                width:
                  rowItems.length === 1
                    ? "100%"
                    : "50%",
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
        </View>
      );
    }

    return rows;
  };

  const renderExplanation = () => {
    const { title, content, footer, extra } = explanation;
    const hasAny =
      content?.trim() || footer?.trim() || extra;

    if (!hasAny) return null;

    return (
      <View
        style={{
          width: "100%",
          padding: 6,
          marginTop: 6,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          {title}
        </Text>

        {content && (
          <Text style={{ marginBottom: 3 }}>
            {content}
          </Text>
        )}

        {extra && (
          <Text style={{ marginBottom: 3 }}>
            {extra}
          </Text>
        )}

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
        marginTop: 10,
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
