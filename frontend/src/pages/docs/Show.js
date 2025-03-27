import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IsLoading from '../../components/home/IsLoading'
import { BlobProvider } from "@react-pdf/renderer"
import PDFdoc from '../../components/docs/PDFdoc'

const Show = () => {
    const [doc, setDoc] = useState(null)
    const { id } = useParams()
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        try {
            const getData = async () => {
                const { data } = await axios.get(`/doc/${id}`, {
                    withCredentials: true,
                })
                setDoc(data.doc)
                setIsloading(false)
            }
            getData()
        } catch (err) {
            setIsloading(false)
        }
    }, [id])

    if (isLoading) {
        return <IsLoading />
    }

    return (
        <div className="flex flex-col px-2">
            <div className='text-xl font-semibold px-2 py-4 mb-2'>Show Doc</div>
            <BlobProvider document={<PDFdoc doc={doc} />}>
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading PDF..."
              ) : error ? (
                "Error occurred"
              ) : (
                <a
                  href={url}
                  className="text-sm font-medium border border-purple-600 rounded-md p-2 h-full flex items-center justify-center"
                  download={encodeURIComponent(
                    `${doc._id.slice(
                      2
                    )}_${doc?.customer?.replace(/\s/g, "")}`
                  )
                    .slice(0, 5)
                    .toUpperCase()}
                >
                PDF
                </a>
              )
            }
          </BlobProvider>
            <div className="grid grid-cols-2 px-2 py-4 border ">
              <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">Müşteri</div>
              <div className='px-2 py-1 border-b'>{doc.customer}</div>
              <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">Yetkili</div>
              <div className='px-2 py-1 border-b'>{doc.person}</div>
              <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">Adres</div>
              <div className='px-2 py-1 border-b'>{doc.address}</div>

            </div>
            <pre>{/* JSON.stringify(doc, null, 2) */}</pre>
        </div>
    )
}

export default Show
