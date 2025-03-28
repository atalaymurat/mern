import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import IsLoading from '../../components/home/IsLoading'
import { BlobProvider } from "@react-pdf/renderer"
import PDFdoc from '../../components/docs/PDFdoc'
import Doc from '../../components/docs/Doc'

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
      <>
      < Doc doc={doc}/>
      </>
    )
}

export default Show
