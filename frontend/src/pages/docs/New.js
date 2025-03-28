import React from 'react'
import DocForm from '../../components/docs/DocForm'
import { useAuth } from '../../context/Auth'

const New = () => {
    const { user } = useAuth()
    return (
        <div>
            <DocForm user={user} />
        </div>
    )
}

export default New
