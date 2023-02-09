import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './Views/Home';
import Graph from './Views/Graph';
import Record from './Views/Record';
import icon from '../../assets/icon.svg';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </Router>
  );
}
