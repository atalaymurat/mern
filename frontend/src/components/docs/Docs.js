import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Docs() {
    const [documents, setDocuments] = useState([])
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/doc', { withCredentials: true })
            setDocuments(data.doc)
        }
        getData()
    }, [])
    return (
        <>
          <div className="mx-2 my-4 lg:w-2/3 w-full mx-auto flex flex-col bg-gray-100 ">

            <div className="font-semibold text-lg my-4 px-2">Belgeler</div>
            <div className="grid grid-cols-4 bg-black text-white font-bold">
              <div className="border-x px-2">No</div>
              <div className="border-x px-2">Müşteri</div>
              <div className="border-x px-2">Yetkili</div>
              <div className="border-x px-2">Adres</div>
            </div>
            {documents.map((doc, i) => {
                return (
                    <div key={i} className="grid grid-cols-4 border px-2">
                        <div className='text-xs truncate'>{i+1}</div>
                        <div>{doc.customer}</div>
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
