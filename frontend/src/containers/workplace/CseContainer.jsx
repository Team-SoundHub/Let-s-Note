import React, { useState } from "react";
import Button from "../../components/common/Button";

const CseContainer = ({ handleSearchModalOpen }) => {
  return (
      <div className={"absolute w-full h-[100px] bottom-0 flex justify-center items-top"}>
          <Button
              className={"w-fit h-[36px] flex items-center hover:-translate-y-[12px]"}
              onClick={handleSearchModalOpen}
          >
              <span>악보 찾기</span>
          </Button>
      </div>
  );
};

export default CseContainer;
