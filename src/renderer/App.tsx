import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  const [filePath, setFilePath] = useState<string[] | string>('');
  // const

  const handleOpenFile = async () => {
    const fileData: string[][] = await window.electron.openFile(
      'dialog:openFile',
      () => [[]]
    );
    setFilePath(fileData[0]);
  };
  return (
    <div>
      <div className="controls">
        <div id="upload" className="upload">
          <input
            type="text"
            id="filePath"
            value={filePath}
            readOnly={true}
            className="selected-dir"
          />
          <button
            onClick={handleOpenFile}
            type="button"
            id="file-btn"
            className="file-select-btn"
          >
            Select a File
          </button>
          <button
            type="button"
            id="record-btn"
            className="record-btn"
            // onClick="recordingGraph()"
          >
            Record
          </button>
          <input type="checkbox" id="animate" />
          <label htmlFor="animate">Animate?</label>
        </div>
      </div>
      <div id="plotly-container" className="test"></div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
