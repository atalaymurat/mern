import React from 'react'

const DebugViewer = ({data, user, isAuthenticated}) => {
    return (
        <>
            <div className='text-xl font-bold bg-zinc-700 border-b px-1 py-2' >DebugViewer</div>
            {/* Show data if authenticated */}
            <pre className="bg-zinc-700 flex flex-col items-center justify-center ">
                {JSON.stringify(data, null, 2)}
                {JSON.stringify(user, null, 2)}
                <div className="px-4">
                    isAuthenticated: {JSON.stringify(isAuthenticated)}
                </div>
            </pre>
        </>
    )
}

export default DebugViewer
