import axios from 'axios'
import React, { useEffect, useState } from 'react'
import IsLoading from '../home/IsLoading'
import { Link } from 'react-router-dom'
import { formPrice, localeDate } from '../../lib/helpers'

function Docs() {
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsloading] = useState(true)
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/doc', { withCredentials: true })
            setDocuments(data.doc)
            setIsloading(false)
        }
        getData()
    }, [])

    if (isLoading) {
        return <IsLoading />
    }

    return (
        <>
            <div className="mx-2 my-4 lg:w-4/6 w-full mx-auto flex flex-col">
                <div className="font-semibold text-lg my-4 px-2">Belgeler</div>

                <div className="grid grid-cols-4 bg-black text-white font-bold mb-1">
                    <div className="border-x px-1">Kod</div>
                    <div className="border-x px-1 col-span-2">Müşteri</div>
                    <div className="border-x px-1">Tutar</div>
                </div>
                {documents.map((doc, i) => {
                    return (
                        <div
                            key={i}
                            className="grid grid-cols-4 border px-1 mb-1 bg-zinc-200 items-center text-sm"
                        >
                            <Link to={`/doc/${doc._id}`}>
                                <div className="font-semibold hover:text-red-500 px-0 text-xs">
                                    <div>
                                        {doc.docType} {doc.docCode}
                                    </div>
                                    <div>
                                        {localeDate(doc.docDate)}
                                    </div>
                                </div>
                            </Link>
                            <div className="text-sm px-1 col-span-2">
                                {doc.customer}
                            </div>
                            <div className="px-1">
                                {formPrice(doc.grandTotal)} {doc.currency}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Docs
