import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            setLoading(false)
            const { data } = await axios.get('/companies')
            setData(data)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setData(null)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
                <div className="my-2 border p-4 bg-slate-900">
                    <h1 className="text-5xl text-center font-extrabold text-white">
                        <span className="text-xs mx-4 font-light">[home]</span>
                        OFF TECH
                    </h1>
                </div>
                <div className="flex flex-col w-full items-center justify-center mt-10">
                    <div>Loading...</div>
                    <div>{JSON.stringify(loading)}</div>
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
                <div className="my-2 border p-4 bg-slate-900">
                    <h1 className="text-5xl text-center font-extrabold text-white">
                        <span className="text-xs mx-4 font-light">[home]</span>
                        OFF TECH
                    </h1>
                </div>
                <div className="flex flex-col w-full items-center justify-center mt-10">
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

                {JSON.stringify(data)}
                {JSON.stringify(error)}
            </div>
        )
    }
}

export default Home
