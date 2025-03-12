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
    const { login, logout } = useAuth()

    const { data, error, mutate } = useSWR('/auth/validate', fetcher, {
        onSuccess: (data) => {
            if (data.message === 'Authenticated') {
                login(data.user) // Update authentication state
            }
        },
        onError: (err) => {
            console.log('SWR VALIDATE ON ERROR', err)
            if (err.message !== 'Unauthorized') {
                logout() // Log out if validation fails
            }
        },
        revalidateOnFocus: true, // Disable revalidation on focus
        shouldRetryOnError: false, // Disable retries on error
    })

    return {
        user: data?.user,
        isAuthenticated: !!data?.user,
        isLoading: !error && !data, // Loading state
        isError: !!error && error?.message !== 'Unauthorized', // Error state (exclude "Unauthorized")
        errorMessage: error, // Expose the error message
        mutate, // Expose the mutate function
    }
}
