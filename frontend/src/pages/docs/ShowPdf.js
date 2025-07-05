import React, { useEffect, useState } from 'react'
import PDFdoc from '../../components/docs/PDFdoc'
import { PDFViewer } from '@react-pdf/renderer'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const ShowPdf = () => {
  const [doc, setDoc] = useState(null)
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const versionParam = searchParams.get('v')
  const versionNumber = versionParam ? Number(versionParam) : undefined

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/doc/${id}`, {
        withCredentials: true,
      })
      setDoc(data.doc)
    }
    getData()
  }, [id])

  if (!doc) return null

  return (
    <div>
      <PDFViewer className="w-full min-h-screen">
        <PDFdoc doc={doc} versionNumber={versionNumber} />
      </PDFViewer>
    </div>
  )
}

export default ShowPdf