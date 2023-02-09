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
  const chartRef = useRef<ChartJS | null>(null);
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
  const handleChange = (chartRef: any) => {
    console.log(chartRef);
    //async data here
    chartRef.data.labels.push(Date.now());
    chartRef.data.datasets[0].data.push(Math.random());

    chartRef.update();
  };
  useEffect(() => {
    const chart = chartRef.current;

    const dataChange = setInterval(() => {
      handleChange(chart);
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
