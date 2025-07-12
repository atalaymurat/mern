import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoginFrom from '../components/home/LoginForm'
import { useAuthSWR } from '../hooks/useAuthSWR'
import { useAuth } from '../context/Auth'
import IsLoading from '../components/home/IsLoading'
import IsError from '../components/home/IsError'
import Header from '../components/home/Header'
import DebugViewer from '../components/home/DebugViewer'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([]) // Data state
    const [dataLoading, setDataLoading] = useState(true) // Data loading state
    const { isLoading, isError, errorMessage } = useAuthSWR()
    const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

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

    // Redirect to protected routes if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from || '/'
            navigate(from, { replace: true }) // Redirect to original route
        }
    }, [isAuthenticated, navigate])

    // Loading state (authentication or data)
    if (isLoading || authLoading) {
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
                <>
                    <div className="border flex flex-col items-center justify-center px-2 py-4 bg-zinc-300">
                        <Link className="w-1/2" to="/doc">
                            <button className="btn-purple my-2 w-full">
                                Belgeler
                            </button>
                        </Link>
                        <Link className="w-1/2" to="/doc/new">
                            <button className="btn-purple my-2 w-full">
                                Proforma Oluştur
                            </button>
                        </Link>
                        <Link className="w-1/2" to="/doc/new/tek">
                            <button className="btn-purple my-2 w-full">
                                Fiyat Teklifi Oluştur
                            </button>
                        </Link>
                        <Link className="w-1/2" to="/doc/new/soz">
                            <button className="btn-purple my-2 w-full">
                                Sozlesme Oluştur
                            </button>
                        </Link>
                        <Link className="w-1/2" to="/doc/new/sip">
                            <button className="btn-purple my-2 w-full">
                                Satin Alma Formu Oluştur
                            </button>
                        </Link>
                    </div>
                    {/* 
                    
                    <DebugViewer
                        data={data}
                        user={user}
                        isAuthenticated={isAuthenticated}
                    />
                    
                    */}
                </>
            )}
        </div>
    )
}

export default Home
