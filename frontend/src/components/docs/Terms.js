import { Text, View } from '@react-pdf/renderer'
import { styles } from './Styles'



const capitalize = (str) =>
  str
    ? str
        .split("\n") // önce satır satır ayır
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
            title: 'TESLİM SÜRESİ',
            content: capitalize(doc.deliveryDate),
            footer: 'Sipariş Avansının Tamamının Alınmasından Sonra Gecerli Olmak Uzere',
        },
        {
            title: 'TESLİM YERİ',
            content: capitalize(doc.deliveryTerms),
            footer: '',
        },
        {
            title: 'GARANTİ',
            content: capitalize(doc.warranty),
            footer: 'Sarf malzemeleri garanti kapsamında değerlendirilmez. Sebeke Elektrik Sorunlari Kaynakli Elektriksel Arizalar Garanti Kapsami Disindadir.',
        },
        {
            title: 'ÖDEME ŞEKLİ',
            content: capitalize(doc.paymentTerms),
            footer: '',
        },
        {
            title: 'AÇIKLAMALAR',
            content: `${capitalize(doc.extraLine)}
            ${doc.isNewSign ? 'Makineler yeni ve kullanılmamıştır.' : ""}`,
            footer: `- Özellikle belirtilmedikçe fiyatlarımıza KDV dahil değildir. - Seri Numaralar faturada belirtilecektir. - CE belgesine haizdir.
            - G.T.I.P kod uyuşmazlıklarından, satıcı sorumlu tutulamaz.- Mücbir nedenler veya üretici kaynaklı gecikmelerden satıcı sorumlu değildir.
            - Makinenin çalışması için zorunlu olan parça ve aksesuarlar dışında İlave parça ve aksesuar bulunmamaktadır.`,
        },
    ]

    const renderDeliverySections = () => {
        const rows = []

        // 2'li gruplar halinde satırları oluştur
        for (let i = 0; i < fieldValues.length; i += 2) {
            const rowItems = fieldValues.slice(i, i + 2)

            rows.push(
                <View
                    key={`row-${i}`}
                    style={{
                        ...styles.flexRow,
                        borderBottom:
                            i < fieldValues.length - 2
                                ? '1px solid black'
                                : 'none',
                        width: '100%',
                    }}
                >
                    {rowItems.map((item, idx) => (
                        <View
                            key={`item-${i}-${idx}`}
                            style={{
                                ...styles.flexCol,
                                padding: '2px 2px',
                                borderRight:
                                    idx === 0 ? '1px solid black' : 'none',
                                width: rowItems.length === 1 ? '100%' : '50%',
                                borderRight: rowItems.length === 1 && '',
                            }}
                        >
                            <Text style={{ ...styles.label }}>
                                {item.title}
                            </Text>
                            <View
                                style={{
                                    marginVertical: 'auto',
                                }}
                            >
                                <Text>{item.content}</Text>
                                {item.footer && (
                                    <Text
                                        style={{ color: 'grey', fontSize: 8 }}
                                    >
                                        {item.footer}
                                    </Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            )
        }

        return rows
    }

    return (
        <View
            style={{
                border: '1px solid black',
                flexGrow: '1',
                margin: '4px 0px',
            }}
        >
            <Text
                style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    padding: '2px 4px',
                    borderBottom: '1px solid black',
                    color: '#162a42',
                }}
            >
                TESLİM ŞARTLARI
            </Text>
            {renderDeliverySections()}
        </View>
    )
}

export default Terms
