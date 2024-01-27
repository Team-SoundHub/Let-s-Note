import React from "react";
import { Route, Routes } from "react-router-dom";
import WorkPlacePage from "./pages/WorkPlacePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WorkPlacePage />} />
        <Route path="/workplace" element={<WorkPlacePage />} />
      </Routes>
    </>
  );
};

export default App;
