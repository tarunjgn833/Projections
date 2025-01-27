import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import Chart from './components/Chart';

const App = () => {
  const [selectedColumn, setSelectedColumn] = useState('');

  return (
    <div style={{width:"100%", padding:"20px"}}>
      <h1 style={{color:"black"}}>Histogram Viewer</h1>
      <Dropdown onSelectColumn={setSelectedColumn} />
      {selectedColumn && <Chart column={selectedColumn} />}
    </div>
  );
};

export default App;
