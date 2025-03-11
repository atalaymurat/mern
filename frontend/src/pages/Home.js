import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoginFrom from "../components/home/LoginForm"

function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/')
            setData(data)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setData(null)
        }
    }

    useEffect(() => {
    const validateAuth = async () => {
      try {
        const response = await axios.get('/auth/validate', {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validateAuth();
  }, []);

    useEffect(() => {
        getData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
                <div className="flex flex-col w-full items-center justify-center mt-10">
                    <div>Loading...</div>
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
                <div className="flex flex-col w-full items-center justify-center mt-10">
                    <div>Error On Page Load</div>
                    <div>{JSON.stringify(error)}</div>
                </div>
            </div>
        )
    }

    if (!error && !loading) {
        return (
            <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
                <div className="my-2 border p-4 bg-slate-900">
                    <h1 className="text-5xl text-center font-extrabold text-white">
                        <span className="text-xs mx-4 font-light">[home]</span>
                        OFF TECH
                    </h1>
                </div>

                <div>{error && JSON.stringify(error)}</div>
                <pre className="bg-zinc-700">{JSON.stringify(data, null, 2)}</pre>
                {isAuthenticated ? <LoginFrom />  : null }
            </div>
        )
    }
}

export default Home
