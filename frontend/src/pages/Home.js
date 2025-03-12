import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginFrom from '../components/home/LoginForm';
import { useAuthSWR } from '../hooks/useAuth';

function Home() {
  const [data, setData] = useState([]); // Data state
  const [dataLoading, setDataLoading] = useState(true); // Data loading state
  const [dataError, setDataError] = useState(null); // Data error state
  const { isAuthenticated, user, isLoading, isError, errorMessage } = useAuthSWR(); // Auth state

  // Function to fetch data
  const getData = async () => {
    try {
      const { data } = await axios.get('/');
      setData(data);
    } catch (err) {
      setDataError(err.message); // Set error message
      setData(null); // Clear data on error
    } finally {
      setDataLoading(false); // Set loading to false
    }
  };

  // Fetch data when the component mounts (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      getData(); // Fetch data only if authenticated
    } else {
      setDataLoading(false); // Stop loading if not authenticated
    }
  }, [isAuthenticated]);

  // Loading state (authentication or data)
  if (isLoading || dataLoading) {
    return (
      <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
        <div className="flex flex-col w-full items-center justify-center mt-10">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Error state (authentication or data)
  if (isError) {
    return (
      <div className="min-h-screen w-full bg-zinc-900 py-4 text-white">
        <div className="flex flex-col w-full items-center justify-center mt-10">
          <div>Error On Page Load</div>
          <div className="flex flex-col">
            <pre>{JSON.stringify(errorMessage, null, 2)}</pre>
          </div>
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

      {/* Show login form if not authenticated */}
      {!isAuthenticated ? (
        <LoginFrom />
      ) : (
        <>
          {/* Show data if authenticated */}
          <pre className="bg-zinc-700">
            {JSON.stringify(data, null, 2)}
            {JSON.stringify(user, null, 2)}
            <div className="px-4">isAuthenticated: {JSON.stringify(isAuthenticated)}</div>
          </pre>
        </>
      )}
    </div>
  );
}

export default Home;