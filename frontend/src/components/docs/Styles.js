import { StyleSheet } from '@react-pdf/renderer'


export const styles = StyleSheet.create({
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
