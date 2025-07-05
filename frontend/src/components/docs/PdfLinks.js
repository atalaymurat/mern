import { BlobProvider } from "@react-pdf/renderer";
import PDFdoc from "../../components/docs/PDFdoc";
import { Link } from "react-router-dom";

function PdfLinks({ doc, version, versionNumber }) {
  const fileName = `${doc.docCode}_${doc.docType}_${
    version?.customer?.replace(/\s/g, "") || "XXX"
  }`;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-2 mb-4 w-full">
        <BlobProvider
          key={`pdf-${versionNumber}`} // << Bu en önemli satır
          document={<PDFdoc doc={doc} versionNumber={versionNumber} />}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <div className="btn-green">PDF Yükleniyor...</div>
            ) : error ? (
              "Bir Hata Oluştu"
            ) : (
              <a
                href={url}
                className="btn-green w-full"
                download={encodeURIComponent(fileName)
                  .slice(0, 21)
                  .toUpperCase()}
              >
                PDF İndir
              </a>
            )
          }
        </BlobProvider>

        <Link
          to={`/doc/pdf/${doc._id}?v=${versionNumber}`}
          target="_blank"
          className="w-full"
          rel="noopener noreferrer"
        >
          <button className="btn-purple w-full">PDF Göster</button>
        </Link>

        <Link to={`/doc/edit/${doc._id}`} className="w-full">
          <button className="btn-submit w-full">Edit</button>
        </Link>
      </div>
    </div>
  );
}

export default PdfLinks;