import React from 'react';


const LoadingPlaceholder = React.memo(() => (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center space-y-2">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-300 w-64 mx-auto mb-4 rounded"></div>
          <div className="h-8 bg-gray-300 w-96 mx-auto mb-2 rounded"></div>
          <div className="h-6 bg-gray-300 w-80 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  ));
  
  LoadingPlaceholder.displayName = 'LoadingPlaceholder';
  
  export default LoadingPlaceholder;