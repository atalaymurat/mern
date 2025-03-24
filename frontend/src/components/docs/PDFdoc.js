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
        margin: '5px 5px',
        borderBottom: '2px solid blue',
    },
    flexCol: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
        gap: '3px',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 14,
        textDecoration: 'underline',
        flexBasis: '50%',
        textAlign: 'center',
    },
    item: {
        flexGrow: 0,
        flexBasis: '50%',
        padding: '2px 4px',
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
                    <View style={styles.container}>
                        <Image
                            src="/vmmLogo.jpg"
                            style={{
                                height: '70px',
                                width: '150px',
                                flexBasis: '25%',
                            }}
                        />
                        <Text style={styles.heading}>PREFORMA FATURA</Text>
                        <View style={{ ...styles.flexCol, flexBasis: '25%' }}>
                            <View style={{ ...styles.flexRow }}>
                                <Text style={styles.item}>Tarih :</Text>
                                <Text style={styles.item}>01/02/2025</Text>
                            </View>
                            <View style={{ ...styles.flexRow }}>
                                <Text style={styles.item}>Belge No :</Text>
                                <Text style={styles.item}>2025-200-01</Text>
                            </View>
                            <View style={{ ...styles.flexRow }}>
                                <Text style={{width:"100%", padding:"2px 4px"}}>www.varolmakina.com</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        )
    }
}

export default PDFdoc

// Styles for PDF content
