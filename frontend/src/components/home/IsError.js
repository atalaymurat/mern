import React from 'react'

const IsError = ({errorMessage}) => {
    return (
        <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
            <div className="flex flex-col w-full items-center justify-center mt-10">
                <div>Error On Page Load</div>
                <div className="flex flex-col">
                    <pre>{JSON.stringify(errorMessage, null, 2)}</pre>
                </div>
            </div>
        </div>
    )
}

export default IsError
