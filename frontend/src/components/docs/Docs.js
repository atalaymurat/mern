import axios from 'axios'
import React, { useEffect, useState } from 'react'
import IsLoading from '../home/IsLoading'
import { Link } from 'react-router-dom'

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
            <div className="mx-2 my-4 lg:w-4/5 w-full mx-auto flex flex-col">
                <div className="font-semibold text-lg my-4 px-2">Belgeler</div>
                <div className="grid grid-cols-4 bg-black text-white font-bold mb-1">
                    <div className="grid grid-cols-3">
                        <div className="border-x px-2">Kod</div>
                        <div className="border-x px-2 col-span-2">Müşteri</div>
                    </div>
                    <div className="border-x px-2">Yetkili</div>
                    <div className="border-x px-2">Adres</div>
                </div>
                {documents.map((doc, i) => {
                    return (
                        <div key={i} className="grid grid-cols-4 border px-2 mb-1 bg-zinc-200 items-center">
                            <div className="grid grid-cols-3 items-center">
                                <Link to={`/doc/${doc._id}`}>
                                    <div className="font-semibold hover:text-red-500 px-2">
                                        {i + 1}
                                    </div>
                                </Link>
                                <div className="col-span-2">{doc.customer}</div>
                            </div>
                            <div>{doc.person}</div>
                            <div>{doc.address}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Docs
