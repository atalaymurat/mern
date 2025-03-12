import useSWR from 'swr'
import axios from 'axios'
import { useAuth } from '../context/Auth'

const fetcher = (url) =>
    axios
        .get(url, { withCredentials: true }) // Include cookies in the request
        .then((res) => res.data)
        .catch((error) => {
            throw error.response?.data || error.message // Propagate the error
        })

export const useAuthSWR = () => {
    const { login, logout, isAuthenticated } = useAuth()

    const { data, error, mutate } = useSWR('/auth/validate', fetcher, {
        onSuccess: (data) => {
            if (data.message === 'Authenticated') {
                console.log('SWR DATA FOR LOGIN', data)
                login(data.user) // Update authentication state
            }
        },
        onError: (err) => {
            console.log('DATA SWR ERROR', data)
            logout()
            mutate(null, false) // Clear cached data without triggering a revalidation
        },
        revalidateOnFocus: true, // Disable revalidation on focus
        shouldRetryOnError: false, // Disable retries on error
    })

    return {
        isLoading: !error && !data, // Loading state (no error and no data yet)
        isError: !!error && !error?.message === "Unauthorized" , // Error state
        errorMessage: error?.message, // Expose the error message
        mutate, // Expose the mutate function for manual revalidation
    }
}
