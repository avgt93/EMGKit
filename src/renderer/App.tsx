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
  TimeScale,
} from 'chart.js';

import { Line, Chart } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import type { ChartOptions } from 'chart.js/dist/types/index';
import ChartStreaming from 'chartjs-plugin-streaming';
import { RealTimeScale } from 'chartjs-plugin-streaming';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartStreaming
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

const rTData = {
  datasets: [
    {
      label: 'Dataset 1 (linear interpolation)',
      backgroundColor: 'rgb(255, 255, 255)',
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: [],
    },
  ],
};
const rTOptions: any = {
  plugins: {
    // Change options for ALL axes of THIS CHART
    streaming: {
      duration: 20000,
    },
  },
  scales: {
    x: {
      type: 'realtime',
      // Change options only for THIS AXIS
      realtime: {
        duration: 20000,
        refresh: 100,
        onRefresh: function (chart: { data: { datasets: any[] } }) {
          chart.data.datasets.forEach(function (dataset) {
            dataset.data.push({
              x: Date.now(),
              y: Math.random(),
            });
          });
        },
      },
    },
    y: { display: true },
  },
};
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

  const handleRecord = () => {};

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
            onClick={handleRecord}
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
        <Chart
          type="line"
          width={750}
          height={500}
          data={rTData}
          options={rTOptions}
        />
        {/* <Line width={750} height={500} options={options} data={plotList} /> */}
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
