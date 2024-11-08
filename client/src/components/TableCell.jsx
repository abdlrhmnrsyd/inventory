import React from 'react';

const TableCell = ({ children }) => {
  return (
    <td className="h-12 px-6 text3 -left py-">
      {children}
    </td>
  );
};

export default TableCell;      