import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import InteractiveGlobePage from './pages/InteractiveGlobePage';
import QuizPage from './pages/QuizPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/globe" element={<InteractiveGlobePage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;