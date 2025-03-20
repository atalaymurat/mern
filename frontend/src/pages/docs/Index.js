import React from 'react'
import Docs from '../../components/docs/Docs'
import { useAuthSWR } from '../../hooks/useAuthSWR'
import IsLoading from '../../components/home/IsLoading'
import IsError from '../../components/home/IsError'

const Index = () => {
    const { isLoading, isError, errorMessage } = useAuthSWR

    if (isLoading) {
        return <IsLoading />
    }

    if (isError) {
        return <IsError errorMessage={errorMessage} />
    }

    return (
        <div className="w-full flex border justify-center">
            <Docs />
        </div>
    )
}

export default Index
