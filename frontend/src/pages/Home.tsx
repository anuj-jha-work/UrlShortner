import { useState } from 'react';
import { UrlShortener } from '../components';

const Home = () => {
  const [, setRefreshKey] = useState(0);

  const handleUrlCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
          Make your links shorter & smarter
        </h2>
        <p className="text-xl text-gray-600">
          Transform long URLs into clean, shareable links in seconds
        </p>
      </div>
      <UrlShortener onUrlCreated={handleUrlCreated} />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
          <p className="text-gray-600">
            Create shortened URLs instantly with our high-performance system
          </p>
        </div>

        <div className="text-center">
          <div className="bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Analytics</h3>
          <p className="text-gray-600">
            Monitor click counts and engagement for all your links
          </p>
        </div>

        <div className="text-center">
          <div className="bg-gray-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
          <p className="text-gray-600">
            Your data is safe with automatic link expiration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
