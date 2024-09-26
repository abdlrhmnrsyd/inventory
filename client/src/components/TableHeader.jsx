import React from 'react';

const TableHeader = ({ children }) => {
  return (
    <thead>
      <tr className="h-10 px-8 py-2 uppercase transition duration-300 ease-in-out rounded-t-lg text-l text-white-700 hover:bg-blue-600 whitespace-nowrap bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {children}
      </tr>
    </thead>
  );
};

export default TableHeader;