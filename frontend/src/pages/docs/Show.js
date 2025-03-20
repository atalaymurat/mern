import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IsLoading from '../../components/home/IsLoading'

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
            <pre>{JSON.stringify(doc, null, 2)}</pre>
            <div className="grid grid-cols-2 px-2 py-4 border ">
              <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">Müşteri</div>
              <div className='px-2 py-1 border-b'>{doc.customer}</div>
              <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">Yetkili</div>
              <div className='px-2 py-1 border-b'>{doc.person}</div>
              <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">Adres</div>
              <div className='px-2 py-1 border-b'>{doc.address}</div>

            </div>
        </div>
    )
}

export default Show
