import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  return (
    <div>
      <div id="upload" className="upload">
        <input
          type="text"
          id="filePath"
          readOnly={true}
          className="selected-dir"
        />
        <button type="button" id="file-btn" className="file-select-btn">
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
      <div id="tester" className="test"></div>
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
