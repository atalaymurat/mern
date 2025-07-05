import axios from "axios";
import React, { useEffect, useState } from "react";
import IsLoading from "../../components/home/IsLoading";
import Doc from "../../components/docs/Doc";
import { useParams } from "react-router-dom";

const Show = () => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/doc/${id}`, {
          withCredentials: true,
        });
        setDoc(data.doc);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Veri yüklenirken hata oluştu");
      } finally {
        setIsloading(false);
      }
    };
    getData();
  }, [id]);

  if (isLoading) {
    return <IsLoading />;
  }
  if (error) return <div className="text-red-600">{error}</div>;

  return <Doc doc={doc} />;
};

export default Show;
