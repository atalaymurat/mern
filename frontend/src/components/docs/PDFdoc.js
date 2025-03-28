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
import { localeDate, formPrice } from '../../lib/helpers'

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
        alignItems: 'top',
        margin: '5px 2px',
    },
    flexCol: {
        width: '100%',
        flexDirection: 'column',
        margin: '0px 1px',
    },
    flexRow: {
        flexDirection: 'row',
        gap: '3px',
        padding: '0px 0px',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 12,
        textDecoration: 'underline',
        flexBasis: '50%',
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: 'grey',
    },
    item: {
        flexGrow: 0,
    },
    head: {
        backgroundColor: '#e30713',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 9,
        textAlign: 'center',
        alignSelf: 'center',
        padding: '5px 0px',
        borderRight: '1px solid black',
    },
    cell: {
        fontSize: 9,
        borderRight: '1px solid black',
        padding: '4px 4px',
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
                    <View style={{ margin: '10px 10px' }}>
                        <Header doc={doc} />
                        <Customer doc={doc} />
                        <PriceTable doc={doc} />
                        {doc.showTotals && <TotalsTable doc={doc} />}
                        <Descriptions doc={doc} />
                        <Terms doc={doc} />
                        <BankInfo />
                    </View>
                </Page>
            </Document>
        )
    }
}

export default PDFdoc

// Styles for PDF content

const Customer = ({ doc }) => (
    <View style={{ ...styles.container }}>
        <View style={{ ...styles.flexRow }}>
            <View style={{ flexBasis: '60%' }}>
                <View style={{ ...styles.flexRow }}>
                    <Text style={{ flexBasis: '14%', ...styles.label }}>
                        Firma :
                    </Text>
                    <Text>{doc.customer}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={{ flexBasis: '14%', ...styles.label }}>
                        İlgili Kişi :
                    </Text>
                    <Text>{doc.person}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={{ flexBasis: '14%', ...styles.label }}>
                        Adres :
                    </Text>
                    <Text>{doc.address}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={{ flexBasis: '14%', ...styles.label }}>
                        Telefon :
                    </Text>
                    <Text>{doc.phone}</Text>
                </View>
            </View>

            <View style={{ flexBasis: '40%' }}>
                <View style={{ ...styles.flexRow }}>
                    <Text style={{ flexBasis: '24%', ...styles.label }}>
                        V. Dairesi :
                    </Text>
                    <Text>{doc.vd}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={{ flexBasis: '24%', ...styles.label }}>
                        Vergi No :
                    </Text>
                    <Text>{doc.vatNo}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={{ flexBasis: '24%', ...styles.label }}>
                        Eposta :
                    </Text>
                    <Text>{doc.email}</Text>
                </View>
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
                <Text
                    style={{
                        ...styles.item,
                        ...styles.label,
                        flexBasis: '50%',
                    }}
                >
                    Tarih :
                </Text>
                <Text style={{ ...styles.item, flexBasis: '50%' }}>
                    {localeDate(doc.docDate)}
                </Text>
            </View>
            <View style={{ ...styles.flexRow }}>
                <Text
                    style={{
                        ...styles.item,
                        ...styles.label,
                        flexBasis: '50%',
                    }}
                >
                    Geçerli :
                </Text>
                <Text style={{ ...styles.item, flexBasis: '50%' }}>
                    {localeDate(doc.validDate)}
                </Text>
            </View>
            <View style={{ ...styles.flexRow }}>
                <Text
                    style={{
                        ...styles.item,
                        ...styles.label,
                        flexBasis: '50%',
                    }}
                >
                    Belge No :
                </Text>
                <Text style={{ ...styles.item, flexBasis: '50%' }}>
                    {doc.docCode}
                </Text>
            </View>
            <View style={{ ...styles.flexRow }}>
                <Text
                    style={{ width: '100%', padding: '2px 0px', color: 'grey' }}
                >
                    www.varolmakina.com
                </Text>
            </View>
        </View>
    </View>
)

const PriceTable = ({ doc }) => {
    const { lineItems } = doc
    return (
        <View style={{ ...styles.container, margin: '0px 0px' }}>
            <View
                style={{
                    ...styles.flexCol,
                    margin: '0px 0px',
                    borderBottom: '1px solid black',
                }}
            >
                <View
                    style={{
                        ...styles.flexRow,
                        gap: 0,
                        alignItems: 'center',
                        border: '1px solid black',
                    }}
                >
                    <Text style={{ flexBasis: '5%', ...styles.head }}>No</Text>
                    <Text
                        style={{
                            flexBasis: '7%',
                            ...styles.head,
                        }}
                    >
                        Durum
                    </Text>
                    <Text style={{ flexBasis: '8%', ...styles.head }}>
                        Menşei
                    </Text>
                    <Text style={{ flexBasis: '12%', ...styles.head }}>
                        GTIP
                    </Text>
                    <Text style={{ flexBasis: '35%', ...styles.head }}>
                        Açıklama
                    </Text>
                    <Text style={{ flexBasis: '5%', ...styles.head }}>Ad.</Text>
                    <Text style={{ flexBasis: '14%', ...styles.head }}>
                        Birim Fiyat
                    </Text>
                    <Text
                        style={{
                            flexBasis: '14%',
                            ...styles.head,
                            borderRight: '0px solid black',
                        }}
                    >
                        Toplam Fiyat
                    </Text>
                </View>
                {lineItems.map((item, i) => (
                    <View
                        style={{
                            ...styles.flexRow,
                            gap: 0,
                            borderLeft: '1px solid black',
                            borderRight: '1px solid black',
                        }}
                    >
                        <Text
                            style={{
                                flexBasis: '5%',
                                ...styles.cell,
                                textAlign: 'center',
                            }}
                        >
                            {item.position}
                        </Text>
                        <Text style={{ flexBasis: '7%', ...styles.cell }}>
                            {item.condition}
                        </Text>
                        <Text style={{ flexBasis: '8%', ...styles.cell }}>
                            {item.origin}
                        </Text>
                        <Text
                            style={{
                                flexBasis: '12%',
                                ...styles.cell,
                                fontSize: 7,
                            }}
                        >
                            {item.gtipNo}
                        </Text>
                        <View
                            style={{
                                ...styles.flexCol,
                                flexBasis: '35%',
                                ...styles.cell,
                                margin: '0px 0px',
                                padding: '2px 2px',
                            }}
                        >
                            <Text style={{}}>{item.desc}</Text>
                            <Text style={{}}>{item.caption}</Text>
                        </View>
                        <Text
                            style={{
                                flexBasis: '5%',
                                ...styles.cell,
                                textAlign: 'center',
                            }}
                        >
                            {item.quantity}
                        </Text>
                        <Text style={{ flexBasis: '14%', ...styles.cell }}>
                            {formPrice(item.price)} {doc.currency}
                        </Text>
                        <Text
                            style={{
                                flexBasis: '14%',
                                ...styles.cell,
                                borderRight: '0px solid black',
                            }}
                        >
                            {formPrice(item.totalPrice)} {doc.currency}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const TotalsTable = ({ doc }) => {
    const hasDiscount = doc.discountPrice && doc.discountPrice !== 0
    const hasTax = doc.kdvPrice && doc.kdvPrice !== 0
    const showSubtotals = hasDiscount || hasTax

    const items = [
        ...(showSubtotals
            ? [{ label: 'Toplam', value: formPrice(doc.totalPrice) }]
            : []),
        ...(hasDiscount
            ? [
                  { label: 'İndirim', value: formPrice(doc.discount) },
                  { label: 'Net Toplam', value: formPrice(doc.netPrice) },
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
            label: 'Genel Toplam',
            value: formPrice(doc.grandTotal),
            isTotal: true,
        },
    ]

    return (
        <View
            style={{
                margin: '0px 0px',
                width: '100%',
                flexDirection: 'row',
            }}
        >
            <View style={{ margin: '4px 0px', overflow: 'hidden', color: "grey" }}>
                <Text>
                    - Özellikle belirtilmedikçe fiyatlarımıza KDV dahil değildir.
                </Text>
                <Text>- Seri Numaralar faturada belirtilecektir.</Text>
                <Text>- CE belgesine haizdir.</Text>
                <Text>
                    - G.T.I.P kod uyuşmazlıklarından, satıcı sorumlu tutulamaz.
                </Text>
                <Text>
                    - Kurulum için gerekli elektrik ,basınçlı hava, toz emici ve diğer
                </Text>
                <Text>
                    altyapı gereksinimleri müşteri tarandan
                    hazırlanacaktır.
                </Text>
                <Text>
                    - Mucbir nedenler veya üretici kaynaklı gecikmelerden satıcı sorumlu değildir.
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    marginLeft: 'auto',
                    flexBasis: '33%',
                }}
            >
                {items.map((item, i) => (
                    <View
                        key={i}
                        style={{
                            ...styles.flexRow,
                            borderBottom: '1px solid black',
                            borderColor: 'gray',
                            padding: '2px 4px',
                            margin: '0px 0px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={
                                item.label === 'Genel Toplam' && {
                                    fontWeight: 'bold',
                                }
                            }
                        >
                            {item.label}
                        </Text>
                        <Text
                            style={
                                item.label === 'Genel Toplam' && {
                                    fontWeight: 'bold',
                                }
                            }
                        >
                            {item.label === 'İndirim' && '- '}
                            {item.value} {doc.currency}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const Terms = ({ doc }) => (
    <View
        style={{ border: '1px solid black', flexGrow: '1', margin: '4px 0px' }}
    >
        <Text
            style={{
                fontSize: 10,
                fontWeight: 'bold',
                padding: '2px 4px',
                borderBottom: '1px solid black',
                color: '#e30713',
            }}
        >
            TESLİM ŞARTLARI
        </Text>
        <View style={{ ...styles.flexRow, padding: '2px 2px' }}>
            <Text style={{ flexBasis: '15%', ...styles.label }}>
                TESLİM SÜRESİ :
            </Text>
            <Text>{doc.deliveryDate}</Text>
            <Text style={{ color: "grey"}}>(Sipariş avansının, tamamının alınmasından sonra)</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 2px' }}>
            <Text style={{ flexBasis: '15%', ...styles.label }}>
                TESLİM YERİ :
            </Text>
            <Text>{doc.deliveryTerms}</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 2px' }}>
            <Text style={{ flexBasis: '15%', ...styles.label }}>GARANTİ :</Text>
            <Text>{doc.warranty}</Text>
            <Text style={{color: "grey"}}>
                (Kullanıcı kaynaklı hatalar ve sarf malzemeleri garanti
                kapsamında değerlendirilmez)
            </Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 2px' }}>
            <Text style={{ flexBasis: '15%', ...styles.label }}>
                ÖDEME ŞEKLİ :
            </Text>
            <Text>{doc.paymentTerms}</Text>
        </View>
    </View>
)

const Descriptions = ({ doc }) => (
    <View style={{ margin: '4px 0px' }}>
        {doc.isNewSign && (
            <Text style={{ fontWeight: 'bold' }}>
                - Makineler Yeni ve Kullanılmamıştır.
            </Text>
        )}
        {doc.extraLine && (
            <Text style={{ fontWeight: 'normal' }}>
                {doc.extraLine}
            </Text>

        )}
    </View>
)
const BankInfo = () => (
    <View
        style={{ border: '1px solid black', flexGrow: '1', margin: '4px 0px' }}
    >
        <Text
            style={{
                padding: '2px 4px',
                color: '#e30713',
                borderBottom: '1px solid black',
                fontWeight: 'bold',
            }}
        >
            BANKA HESAP BİLGİLERİ
        </Text>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>
                SATICI FİRMA :
            </Text>
            <Text>VMM VAROL MAKINA SAN. ve TİC. LTD. ŞTİ.</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>ADRES :</Text>
            <Text>
                Esenkent Mah. Dudullu OSB, Yücesoy Sokak No: 16/1 Ümraniye / İstanbul
            </Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>BANKA : </Text>
            <Text>T.C. ZİRAAT BANKASI A.Ş</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>
                ŞUBE / ŞUBE KODU :{' '}
            </Text>
            <Text>2248-ALTUNİZADE TİCARİ ŞUBESİ</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>
                SWIFT NO :
            </Text>
            <Text>TCZBTR2A</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>TL IBAN :</Text>
            <Text>TR31 0001 0022 4850 9109 2950 29</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>
                EURO IBAN :
            </Text>
            <Text>TR26 0001 0022 4850 9109 2950 22</Text>
        </View>
        <View style={{ ...styles.flexRow, padding: '2px 4px' }}>
            <Text style={{ flexBasis: '20%', ...styles.label }}>
                USD IBAN :
            </Text>
            <Text>TR69 0001 0022 4850 9109 2950 24</Text>
        </View>
    </View>
)
