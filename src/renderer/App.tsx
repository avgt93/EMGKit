import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';
import Plot from 'react-plotly.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface plotList {
  name: string;
  value: number;
}

function Hello() {
  const [filePath, setFilePath] = useState<string[] | string>('');
  const [plotList, setPlotList] = useState<Array<plotList>>([
    { name: '', value: 0 },
  ]);
  // const

  const handleOpenFile = async () => {
    const tempList: plotList[] = [{ name: '', value: 0 }];
    const fileData: string[][] = await window.electron.openFile(
      'dialog:openFile',
      () => [[]]
    );
    setFilePath(fileData[0]);
    let plottingData: string[] = fileData[1];
    // let tempDate = new Date(0);
    // let startTime = plottingData[0][0];
    for (let i = 0; i < plottingData.length; i++) {
      let temp: plotList = {
        name: plottingData[i][0],
        value: parseInt(plottingData[i][1]),
      };
      tempList.push(temp);
    }
    setPlotList(tempList);
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
      <div id="plotly-container" className="test">
        <LineChart width={750} height={500} data={plotList}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
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
