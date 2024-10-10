import React from 'react';

const NavbarItem = ({ onClick, isSelected, active, children }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 rounded ${
        active ? 'bg-blue-500  text-white' : isSelected ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
      }`}
    >
      {children}
    </div>
  );
};

export default NavbarItem;