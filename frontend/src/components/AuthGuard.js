import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/Auth' // Adjust the import path as needed
import IsLoading from './home/IsLoading'

const AuthGuard = () => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return <IsLoading />
    }

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        console.log('AUTH GUARD PREVENT THIS OPERATION')
        console.log('isAthenticated : ', isAuthenticated)
        return <Navigate to="/" state={{ from: location.pathname }} replace />
    }

    // If authenticated, render the child routes
    return <Outlet />
}

export default AuthGuard
