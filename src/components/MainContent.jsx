import React from 'react';

function MainContent({ children }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 lg:py-4 xl:py-6">
        <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm sm:shadow-md lg:shadow-lg p-2 sm:p-3 lg:p-4 xl:p-6">
          {children}
        </div>
      </div>
    </main>
  );
}

export default MainContent;
