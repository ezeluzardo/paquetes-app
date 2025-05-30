import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Entrega from './pages/Entrega';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrega" element={<Entrega />} />
      </Routes>
    </Router>
  );
}

export default App;
