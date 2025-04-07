import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DynamicBanner from "./components/dynamicBanner";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DynamicBanner />} />
      </Routes>
    </Router>
  );
};

export default App;
