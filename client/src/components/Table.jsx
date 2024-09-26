import React from 'react';
import './../../src/index.css'; // Import the CSS file

const Table = ({ children }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        {children}
      </table>
    </div>
  );
};

export default Table;
