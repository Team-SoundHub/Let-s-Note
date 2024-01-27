import React from "react";
import { Provider } from 'react-redux';
import { store } from './module/store';
import { Route, Routes } from "react-router-dom";
import WorkPlacePage from "./pages/WorkPlacePage";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<WorkPlacePage />} />
          <Route path="/workplace" element={<WorkPlacePage />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
