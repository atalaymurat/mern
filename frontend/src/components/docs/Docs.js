import axios from 'axios'
import React, { useEffect, useState } from 'react'
import IsLoading from '../home/IsLoading'
import { Link } from 'react-router-dom'
import { formPrice, localeDate } from '../../lib/helpers'

function Docs() {
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [reFreshTrigger, setReFreshTrigger] = useState(false)
    const handleDelete = async (id) => {
        if (window.confirm('Kaydı Silmek Üzeresiniz, onaylıyormusunuz ?')) {
            await axios.delete(`/doc/${id}`, { withCredentials: true })
            setReFreshTrigger((prev) => !prev)
        }
    }
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/doc', { withCredentials: true })
            setDocuments(data.doc)
            setIsloading(false)
        }
        getData()
    }, [reFreshTrigger])

    if (isLoading) {
        return <IsLoading />
    }

    return (
        <>
            <div className="mx-2 my-4 lg:w-4/6 w-full mx-auto flex flex-col">
                <div className="flex flex-row">
                    <Link to="/">
                        <button className="btn-link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                        </button>
                    </Link>
                </div>
                <div className="font-semibold text-xl my-4 px-2">
                    Proformalar
                </div>

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
                                        {localeDate(doc.docDate)}{' '}
                                        {doc.user?.displayName}
                                    </div>
                                </div>
                            </Link>
                            <div className="text-sm px-1 col-span-2">
                                <div>{doc.customer}</div>
                                <div>{doc.address}</div>
                            </div>
                            <div className="px-1">
                                <div>
                                    {formPrice(doc.grandTotal)} {doc.currency}
                                </div>
                                <div className="py-1 w-full flex flex-row">
                                    <button
                                        type="button"
                                        className="btn-small"
                                        onClick={() => handleDelete(doc._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn-small">
                                        Düzenle
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Docs
