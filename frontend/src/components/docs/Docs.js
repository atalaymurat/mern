import axios from "axios";
import { useEffect, useState } from "react";
import IsLoading from "../home/IsLoading";
import { Link } from "react-router-dom";
import { formPrice, localeDate } from "../../lib/helpers";
import { EditIcon, DeleteIcon } from "./Icons";

function Docs() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [reFreshTrigger, setReFreshTrigger] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("Kaydı Silmek Üzeresiniz, onaylıyormusunuz ?")) {
      await axios.delete(`/doc/${id}`, { withCredentials: true });
      setReFreshTrigger((prev) => !prev);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/doc", { withCredentials: true });
      setDocuments(data.doc);
      setIsloading(false);
    };
    getData();
  }, [reFreshTrigger]);

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <>
      <div className="mx-2 my-4 lg:w-4/6 w-full mx-auto flex flex-col overflow-hidden">
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
        <div className="font-semibold text-xl my-4 px-2">Belgeler</div>

        <div className="grid grid-cols-4 bg-black text-white font-bold mb-1">
          <div className="border-x px-1">Kod</div>
          <div className="border-x px-1 col-span-2">Müşteri / Adres</div>
          <div className="border-x px-1"></div>
        </div>
        {documents.map((doc, i) => {
          const lastVersion =
            doc.versions.length > 0
              ? doc.versions[doc.versions.length - 1]
              : [];
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
                    {localeDate(lastVersion.docDate)} {doc.user?.displayName}
                  </div>
                </div>
              </Link>
              <div className="text-sm px-1 col-span-2">
                <div className="font-semibold">
                  {lastVersion.customer.slice(0, 29)}
                </div>
                <div className="text-xs">
                  {lastVersion.address.slice(0, 39)}
                </div>
              </div>
              <div className="px-1">
                <div className="py-1 w-full flex flex-row space-x-1">
                  <button
                    type="button"
                    className="btn-small"
                    onClick={() => handleDelete(doc._id)}
                  >
                    <DeleteIcon size={20} />
                  </button>
                  <Link to={`/doc/edit/${doc._id}`}>
                    <button type="button" className="btn-small">
                      <EditIcon size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Docs;
