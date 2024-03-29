import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Route, Routes } from "react-router-dom";
import WorkPlacePage from "./pages/WorkPlacePage";
import LandingPage from "./pages/LandingPage";
import LandingPageBefore from "./pages/LandingPageBefore";
import MyPage from "./pages/MyPage";
import SnapshotPage from "./pages/SnapshotPage";
import VOC from "./VOC";
import DemoWorkPlacePage from "./pages/DemoWorkPlacePage";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPageBefore />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/demo" element={<DemoWorkPlacePage />} />
          <Route path="/workspace/:spaceId" element={<WorkPlacePage />} />
          <Route path="/snapshot/:snapshotId" element={<SnapshotPage />} /> 
        </Routes>
        {/* <VOC/> */}
      </Provider>
    </>
  );
};

export default App;
