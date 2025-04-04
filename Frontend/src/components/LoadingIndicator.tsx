import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-center my-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingIndicator;