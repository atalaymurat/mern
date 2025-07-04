import axios from "axios";
import { useState, useEffect } from "react";
import IsLoading from "../../components/home/IsLoading";
import { useParams } from "react-router-dom";
import DocForm from "../../components/docs/DocForm";
import { useAuth } from "../../context/Auth";

function Edit() {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/doc/${id}`, {
        withCredentials: true,
      });
      setDoc(data.doc);
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) {
    return <IsLoading />;
  }

  return (
    <>
      <DocForm user={user} doc={doc} docType={doc.docType} />
      <pre>{JSON.stringify(doc, null, 2)}</pre>
    </>
  );
}

export default Edit;
