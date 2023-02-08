import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface valueList {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}
interface plotList {
  labels: string[];
  datasets: valueList[];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

function Hello() {
  const [filePath, setFilePath] = useState<string[] | string>('');
  const [plotList, setPlotList] = useState<plotList>({
    labels: [''],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });
  // const

  const handleOpenFile = async () => {
    const tempList: plotList = {
      labels: [''],
      datasets: [
        {
          label: 'current',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    const fileData: string[][] = await window.electron.openFile(
      'dialog:openFile',
      () => [[]]
    );
    setFilePath(fileData[0]);
    let plottingData: string[] = fileData[1];
    // let tempDate = new Date(0);
    // let startTime = plottingData[0][0];
    for (let i = 0; i < plottingData.length; i++) {
      // let tempDate = new Date(0);
      // tempDate.setUTCMilliseconds(plottingData[i][0]);
      tempList.labels.push(plottingData[i][0]);
      tempList.datasets[0].data.push(parseInt(plottingData[i][1]));
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
        <Line width={750} height={500} options={options} data={plotList} />
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
