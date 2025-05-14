import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold font-serif text-red-600">404</h1>
      <p className="text-2xl mt-4">Route Not Found</p>
    </div>
  );
};

export default NotFoundPage;
