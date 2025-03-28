import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlobProvider } from '@react-pdf/renderer'
import PDFdoc from '../../components/docs/PDFdoc'

function PdfLinks({ doc }) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row mb-4">
                <BlobProvider document={<PDFdoc doc={doc} />}>
                    {({ blob, url, loading, error }) =>
                        loading ? (
                            'Loading PDF...'
                        ) : error ? (
                            'Error occurred'
                        ) : (
                            <a
                                href={url}
                                className="btn-green flex-1"
                                download={encodeURIComponent(
                                    `${doc.docCode}_${doc?.customer?.replace(
                                        /\s/g,
                                        ''
                                    )}`
                                )
                                    .slice(0, 17)
                                    .toUpperCase()}
                            >
                                PDF İNDİR
                            </a>
                        )
                    }
                </BlobProvider>
                <Link to={`/doc/pdf/${doc._id}`} className="flex-1 w-full">
                    <button className="btn-purple w-full">PDF Göster</button>
                </Link>
            </div>
        </div>
    )
}

export default PdfLinks
