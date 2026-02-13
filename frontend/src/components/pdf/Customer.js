import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { styles } from "../docs/Styles";
import { capitalize } from "./Capitalize";

const Customer = ({ doc }) => {
  return (
    <View style={styles.section}>
      {/* Firma */}
      <View style={styles.row}>
        <Text style={{ width: 60, ...styles.label }}>Firma</Text>
        <Text style={{ flex: 1 }}>{capitalize(doc.customer)}</Text>
      </View>

      {/* Adres */}
      <View style={styles.row}>
        <Text style={{ width: 60, ...styles.label }}>Adres</Text>
        <Text style={{ flex: 1 }}>{capitalize(doc.address)}</Text>
      </View>

      {/* Alt 2 Kolon */}
      <View style={{ ...styles.row }}>
        {/* SOL KOLON */}
        <View style={{ width: "50%" }}>
          {doc.person && (
            <View style={styles.row}>
              <Text style={{ width: 60, ...styles.label }}>İlgili</Text>
              <Text>Sn. {capitalize(doc.person)}</Text>
            </View>
          )}

          {doc.phone && (
            <View style={styles.row}>
              <Text style={{ width: 60, ...styles.label }}>Telefon</Text>
              <Text>{doc.phone}</Text>
            </View>
          )}
        </View>

        {/* SAĞ KOLON */}
        <View style={{ width: "50%" }}>
          {doc.vd && (
            <View style={styles.row}>
              <Text style={{ width: 70, ...styles.label }}>Vergi No</Text>
              <Text>{doc.vatNo}</Text>
            </View>
          )}

          {doc.email && (
            <View style={styles.row}>
              <Text style={{ width: 70, ...styles.label }}>Eposta</Text>
              <Text>{doc.email}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Customer;
