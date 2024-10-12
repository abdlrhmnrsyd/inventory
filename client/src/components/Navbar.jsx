import React, { useState } from 'react';

const Navbar = ({ children }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (index) => {
    setSelected(index);
  }

  return (
    <nav className="flex p-3 space-x-4 bg-gray-400 rounded-xl">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onClick: () => handleClick(index),
          isSelected: selected === index,
        })
      )}
      
    </nav>
  );
};

export default Navbar;
