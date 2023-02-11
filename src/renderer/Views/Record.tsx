import { Ref, useEffect, useRef, useState } from 'react';
import './statics/record.css';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import CustomBackButton from './components/CustomBackButton';
import { ForwardedRef } from 'react-chartjs-2/dist/types';
import { ipcRenderer } from 'electron';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  zoomPlugin
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

interface csvData {
  date: number[];
  value: number[];
}

export const options = {
  responsive: true,
  plugins: {
    zoom: {
      pan: {
        enabled: true,
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
      },
    },
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Live Streaming EMG-Graph',
    },
  },
};
function Graph() {
  const [filePath, setFilePath] = useState<string[] | string>('');
  // const [csvData, setCsvData] = useState<csvData[]>([]);
  const [stopFlag, setStopFlag] = useState<boolean>(false);
  const chartRef = useRef<ChartJS | null>(null);
  const [plotList, setPlotList] = useState<plotList>({
    labels: [],
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
  const handleChange = (chartRef: any) => {
    // console.log(chartRef);
    if (!stopFlag) {
      let currentDate = Date.now();
      let mathRandomInt = Math.random();

      //async data here
      chartRef.data.labels.push(currentDate);
      chartRef.data.datasets[0].data.push(mathRandomInt);
      // console.log([...csvData, [currentDate, mathRandomInt]]);
      // setCsvData(csvData.push({ data: currentDate, value: mathRandomInt }));
      chartRef.update();
    }
  };

  const handleStop = () => {
    setStopFlag(!stopFlag);
  };

  const arrayBuffer: csvData[] = [];

  // console.log(csvData);
  useEffect(() => {
    const chart = chartRef.current;
    const dataChange = setInterval(() => {
      if (!stopFlag) handleChange(chart);
      // console.log(csvData);
    }, 100);

    return () => {
      clearInterval(dataChange);
    };
  }, []);
  return (
    <div className="record-root">
      <div className="record-controls">
        <div className="record-back-button">
          <Link to="/">
            <CustomBackButton />
          </Link>
        </div>
        <div className="record-title">The Graph is Listening for Input</div>
        <div className="record-controls-options">
          {/* <CustomSwitch switchLabel="Animate" onFunc={() => {}} /> */}
        </div>
      </div>
      <div>
        <button className="stop-button" onClick={() => setStopFlag(!stopFlag)}>
          Stop
        </button>
        <button
          onClick={() => {
            console.log(chartRef.current?.data.labels);

            window.electron.sendSaveData([
              chartRef.current?.data.labels,
              chartRef.current?.data.datasets[0].data,
            ]);
            handleStop();
          }}
          className="save-button"
        >
          Save
        </button>
      </div>
      {/* {console.log(csvData)} */}
      <div id="plotly-container">
        <Chart
          ref={chartRef}
          type="line"
          width={750}
          height={500}
          options={options}
          data={plotList}
        />
      </div>
    </div>
  );
}

export default function App() {
  return <Graph />;
}
