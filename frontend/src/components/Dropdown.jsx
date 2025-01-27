import React, { useEffect, useState } from "react";
import { fetchColumns } from "../api/apiService";

const Dropdown = ({ onSelectColumn }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const getColumns = async () => {

      try {
        const data = await fetchColumns();
        setColumns(data);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    getColumns();
  }, []);

  return (
    <select onChange={(e) => onSelectColumn(e.target.value)}>
      <option style={{backgroundColor:"white"}} value="">Select a column...</option>
      {columns.map((column, index) => (
        <option key={index} value={column}>
          {column}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
