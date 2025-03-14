import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoginFrom from '../components/home/LoginForm'
import { useAuthSWR } from '../hooks/useAuthSWR'
import { useAuth } from '../context/Auth'
import IsLoading from '../components/home/IsLoading'
import IsError from '../components/home/IsError'
import Header from '../components/home/Header'
import DebugViewer from '../components/home/DebugViewer'

function Home() {
    const [data, setData] = useState([]) // Data state
    const [dataLoading, setDataLoading] = useState(true) // Data loading state
    const { isLoading, isError, errorMessage } = useAuthSWR()
    const { user, isAuthenticated, logout } = useAuth()

    // Function to fetch data
    const getData = async () => {
        try {
            const { data } = await axios.get('/')
            setData(data)
        } catch (err) {
            setData(null) // Clear data on error
        } finally {
            setDataLoading(false) // Set loading to false
        }
    }

    // Fetch data when the component mounts (only if authenticated)
    useEffect(() => {
        if (isAuthenticated) {
            getData() // Fetch data only if authenticated
        } else {
            setDataLoading(false) // Stop loading if not authenticated
        }
    }, [isAuthenticated])

    // Loading state (authentication or data)
    if (isLoading) {
        return <IsLoading />
    }
    // Error state (authentication or data)
    if (isError) {
        return <IsError errorMessage={errorMessage} />
    }
    // Default render
    return (
        <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
            <Header />

            {/* Show login form if not authenticated */}
            {!isAuthenticated ? (
                <LoginFrom />
            ) : (
                <DebugViewer
                    data={data}
                    user={user}
                    isAuthenticated={isAuthenticated}
                />
            )}
        </div>
    )
}

export default Home
