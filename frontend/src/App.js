import React from "react";
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Route, Routes } from "react-router-dom";
import WorkPlacePage from "./pages/WorkPlacePage";
import ChatTestPage from "./pages/ChatTestPage";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/workspace" element={<WorkPlacePage />} />
          <Route path="/chat" element={<ChatTestPage />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
