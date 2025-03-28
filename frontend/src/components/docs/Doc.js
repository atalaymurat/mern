import React from 'react'
import PdfLinks from './PdfLinks'

const Doc = ({ doc }) => {
    return (
        <>
            <div className="flex flex-col px-2">
                <div className="text-xl font-semibold px-2 py-4 mb-2">
                    {doc.docCode}
                </div>
                < PdfLinks doc={doc} />
            </div>


            {/* TABLE  */}
            <div className="grid grid-cols-2 px-2 py-4 border border-red-200">
                <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">
                    Müşteri
                </div>
                <div className="px-2 py-1 border-b">{doc.customer}</div>
                <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">
                    Yetkili
                </div>
                <div className="px-2 py-1 border-b">{doc.person}</div>
                <div className="px-2 py-1 bg-zinc-200 font-semibold border-b border-black">
                    Adres
                </div>
                <div className="px-2 py-1 border-b">{doc.address}</div>
            </div>

            {/* DEBUGGING   */}
            <pre>{/* JSON.stringify(doc, null, 2) */}</pre>
        </>
    )
}

export default Doc
