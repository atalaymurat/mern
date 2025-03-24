import React from 'react'
import IsLoading from '../home/IsLoading'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
} from '@react-pdf/renderer'
import UbuntuRegular from '../../styles/Ubuntu/Ubuntu-Regular.ttf'
import UbuntuBold from '../../styles/Ubuntu/Ubuntu-Bold.ttf'
import UbuntuLight from '../../styles/Ubuntu/Ubuntu-Light.ttf'
import { localeDate } from '../../lib/helpers'

Font.register({
    family: 'Ubuntu',
    fonts: [
        { src: UbuntuRegular, fontWeight: 'normal', fontStyle: 'normal' },
        { src: UbuntuBold, fontWeight: 'bold', fontStyle: 'normal' },
        { src: UbuntuLight, fontWeight: 'light', fontStyle: 'normal' },
    ],
})

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Ubuntu',
        width: '100%',
        fontSize: 10,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '5px 10px',
    },
    flexCol: {
        width: "100%",
        flexDirection: 'column',
        margin: "0px 5px"
    },
    flexRow: {
        flexDirection: 'row',
        gap: '3px',
        padding: "1px 0px"
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 14,
        textDecoration: 'underline',
        flexBasis: '50%',
        textAlign: 'center',
    },
    label: {
      fontWeight: "bold",
      color: "grey"

    },
    item: {
        flexGrow: 0,
    },
})

const PDFdoc = ({ doc }) => {
    if (!doc) {
        return <IsLoading />
    }

    if (doc) {
        return (
            <Document author="VMM" producer="VMM" creator="VMM">
                <Page size="A4" dpi="72" style={styles.page}>
                    <Header doc={doc} />
                    <Customer doc={doc} />
                </Page>
            </Document>
        )
    }
}

export default PDFdoc

// Styles for PDF content

const Customer = ({ doc }) => (
    <View style={styles.container}>
        <View style={{ ...styles.flexCol}}>
            <View style={styles.flexRow}>
              <Text style={{ flexBasis:"12%", ...styles.label}}>Firma :</Text>
              <Text>{doc.customer}</Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={{ flexBasis:"12%", ...styles.label}}>İlgili Kişi :</Text>
              <Text>{doc.person}</Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={{ flexBasis:"12%", ...styles.label}}>Adres :</Text>
              <Text>{doc.address}</Text>
            </View>
        </View>
    </View>
)

const Header = ({ doc }) => (
    <View style={styles.container}>
        <Image
            src="/vmmLogo.jpg"
            style={{
                height: '70px',
                width: '150px',
                flexBasis: '25%',
            }}
        />
        <Text style={styles.heading}>PROFORMA FATURA</Text>
        <View style={{ ...styles.flexCol, flexBasis: '25%' }}>
            <View style={{ ...styles.flexRow }}>
                <Text style={{ ...styles.item, ...styles.label, flexBasis: "50%" }}>Tarih :</Text>
                <Text style={{ ...styles.item, flexBasis: "50%"}}>{localeDate(doc.createdAt)}</Text>
            </View>
            <View style={{ ...styles.flexRow }}>
                <Text style={{ ...styles.item, ...styles.label, flexBasis: "50%" }}>Belge No :</Text>
                <Text style={{ ...styles.item, flexBasis: "50%" }}>2025-200-01</Text>
            </View>
            <View style={{ ...styles.flexRow }}>
                <Text style={{ width: '100%', padding: '2px 0px' }}>
                    www.varolmakina.com
                </Text>
            </View>
        </View>
    </View>
)
