
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginFrom from '../components/home/LoginForm';
import { useAuth } from '../context/Auth';

function Home() {
  const [loading, setLoading] = useState(true); // Single loading state
  const [error, setError] = useState(null); // Error state
  const [data, setData] = useState([]); // Data state
  const { isAuthenticated, login, logout } = useAuth(); // Auth context

  // Function to validate the access_token cookie
  const validateAuth = async () => {
    try {
      const res = await axios.get('/auth/validate', {
        withCredentials: true, // Include cookies in the request
      });

      if (res.status === 200) {
        login(); // Set isAuthenticated to true
      }
    } catch (error) {
      console.log('User is not authenticated:', error.response?.data);
      logout(); // Set isAuthenticated to false
    }
  };

  // Function to fetch data
  const getData = async () => {
    try {
      const { data } = await axios.get('/');
      setData(data);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Validate authentication and fetch data when the component mounts
  useEffect(() => {
    const initialize = async () => {
      await validateAuth(); // Validate authentication first
      await getData(); // Fetch data after authentication is validated
    };

    initialize();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
        <div className="flex flex-col w-full items-center justify-center mt-10">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
        <div className="flex flex-col w-full items-center justify-center mt-10">
          <div>Error On Page Load</div>
          <div>{JSON.stringify(error)}</div>
        </div>
      </div>
    );
  }

  // Default render
  return (
    <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
      <div className="my-2 border p-4 bg-slate-900">
        <h1 className="text-5xl text-center font-extrabold text-white">
          <span className="text-xs mx-4 font-light">[home]</span>
          OFF TECH
        </h1>
      </div>

      <div>{error && JSON.stringify(error)}</div>

      <pre className="bg-zinc-700">
        {JSON.stringify(data, null, 2)}
        <div className='px-4'>isAuthenticated: {JSON.stringify(isAuthenticated)}</div>
      </pre>

      {!isAuthenticated && <LoginFrom />}
    </div>
  );
}

export default Home;