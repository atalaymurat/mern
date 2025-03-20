// context/AuthContext.js
// this controls the authentication logic and values
import React, { createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    // Check authentication status on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Verify the access_token by making an API call
                const response = await axios.get('/auth/validate', {
                    withCredentials: true, // Include cookies in the request
                });

                if (response.data.message === 'Authenticated') {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false); // Set loading to false after the check
            }
        };

        checkAuth();
    }, []);


    const login = (userData) => {
        setIsAuthenticated(true)
        setUser(userData)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
