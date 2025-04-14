import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import FAQPage from './FAQPage';
import MultiStepForm from './MultiStepForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/test" element={<MultiStepForm />} />
      </Routes>
    </Router>
  );
}
