import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';
import Plot from 'react-plotly.js';

interface plotList {
  x: string[];
  y: string[];
}

function Hello() {
  const [filePath, setFilePath] = useState<string[] | string>('');
  const [plotList, setPlotList] = useState<plotList>({ x: [], y: [] });
  // const

  const handleOpenFile = async () => {
    const tempList: plotList = { x: [], y: [] };
    const fileData: string[][] = await window.electron.openFile(
      'dialog:openFile',
      () => [[]]
    );
    setFilePath(fileData[0]);
    let plottingData: string[] = fileData[1];
    plotList.x = [];
    plotList.y = [];
    let tempDate = new Date(0);
    let startTime = plottingData[0][0];
    for (let i = 0; i < plottingData.length; i++) {
      let tempDate = new Date(0);
      // tempDate.setUTCMilliseconds(plottingData[i][0]);
      tempList.x.push(plottingData[i][0]);
      tempList.y.push(plottingData[i][1]);
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
        <Plot
          data={[
            {
              x: plotList.x,
              y: plotList.y,
              // type: 'scatter',
              // mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{ width: 750, height: 500, title: 'A Fancy Plot' }}
        />
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
