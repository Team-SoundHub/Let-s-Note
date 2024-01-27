import WorkSpaceContainer from "../containers/workplace/WorkSpaceContainer";
import WebSocketContainer from "../containers/WebSocket/WebSocketContainer";

const WorkPlacePage = () => {
  return (
    <>
      <WebSocketContainer />
      <WorkSpaceContainer />
    </>
  );
};

export default WorkPlacePage;