import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './views/LandingPage';
import QuizPage from './views/QuizPage';
import PlayQuiz from './views/PlayQuiz';
import BrowseQuiz from './views/BrowseQuiz';
import ListQuiz from './views/ListQuiz';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/buat_kuis" element={<QuizPage />} />
      <Route path="/play_kuis" element={<PlayQuiz />} />
      <Route path="/browse_kuis" element={<BrowseQuiz />} />
      <Route path="/list_kuis" element={<ListQuiz />} />
      <Route path="/browse_kuis" element={<BrowseQuiz />} />
    </Routes>
  );
}

export default App;
