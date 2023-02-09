import { useState } from 'react';
import { Link } from 'react-router-dom';
import './statics/home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-item">
        <div>
          <h1 className="home-title">Electromyograph-KIT</h1>
        </div>
        <div className="home-button-container">
          <Link to="/graph">
            <button className="home-button home-graph">GRAPH</button>
          </Link>
          <Link to="/record">
            <button className="home-button home-record">RECORD</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <Home />;
}
