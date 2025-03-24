import React, { useEffect, useState } from 'react'
import PDFdoc from '../../components/docs/PDFdoc'
import { PDFViewer } from '@react-pdf/renderer'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ShowPdf = () => {
    const [doc, setDoc] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`/doc/${id}`, {
                withCredentials: true,
            })
            setDoc(data.doc)
        }
        getData()
    }, [id])

    if (doc) {

    return (
        <div>
            <PDFViewer className="w-full min-h-screen">
                <PDFdoc doc={doc} />
            </PDFViewer>
        </div>
    )
    }

}

export default ShowPdf
