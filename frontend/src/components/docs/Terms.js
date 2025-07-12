import { Text, View } from "@react-pdf/renderer";
import { styles } from "./Styles";

// Metinleri satır satır capitalize eden fonksiyon
const capitalize = (str) =>
  str
    ? str
        .split("\n")
        .map((line) =>
          line
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")
        )
        .join("\n")
    : "";

const Terms = ({ doc }) => {
  const fieldValues = [
    {
      title: "TESLİM SÜRESİ",
      content: capitalize(doc.deliveryDate),
      footer: "Sipariş Avansının Tamamının Alınmasından Sonra Geçerli Olmak Üzere",
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
    footer: `- Özellikle belirtilmedikçe fiyatlarımıza KDV dahil değildir.\n- Seri Numaralar faturada belirtilecektir.\n- CE belgesine haizdir.\n- G.T.I.P kod uyuşmazlıklarından satıcı sorumlu tutulamaz.\n- Mücbir nedenler veya üretici kaynaklı gecikmelerden satıcı sorumlu değildir.\n- Makinenin çalışması için zorunlu olan parça ve aksesuarlar dışında ilave parça ve aksesuar bulunmamaktadır.`,
    extra: doc.isNewSign ? "Makineler Yeni ve Kullanılmamıştır." : "",
  };

  // content olmayan field'ları hariç tut (AÇIKLAMALAR hariç)
  const nonEmptyFields = fieldValues.filter((item) => item.content?.trim());

  // 2’li gruplar halinde render et
  const renderFieldRows = () => {
    const rows = [];
    for (let i = 0; i < nonEmptyFields.length; i += 2) {
      const rowItems = nonEmptyFields.slice(i, i + 2);

      rows.push(
        <View
          key={`row-${i}`}
          wrap={false}
          style={{ ...styles.flexRow, borderBottom: "1px solid gray", width: "100%" }}
        >
          {rowItems.map((item, idx) => (
            <View
              key={`item-${i}-${idx}`}
              style={{
                ...styles.flexCol,
                padding: 4,
                width: rowItems.length === 1 ? "100%" : "50%",
              }}
            >
              <Text style={{ ...styles.label }}>{item.title}</Text>
              <Text>{item.content}</Text>
              {item.footer?.trim() && (
                <Text style={{ color: "grey", fontSize: 8 }}>{item.footer}</Text>
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
    const hasAny = content?.trim() || footer?.trim() || extra;

    if (!hasAny) return null;

    return (
      <View
        wrap={false}
        style={{
          width: "100%",
          padding: 4,
          marginTop: 4,
        }}
      >
        <Text style={{ ...styles.label }}>{title}</Text>
        {content && <Text>{content}</Text>}
        {extra && <Text>{extra}</Text>}
        {footer && (
          <Text style={{ color: "grey", fontSize: 8 }}>{footer}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ flexGrow: 1, margin: "4px 0px" }}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "bold",
          padding: "2px 4px",
          borderBottom: "1px solid gray",
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
