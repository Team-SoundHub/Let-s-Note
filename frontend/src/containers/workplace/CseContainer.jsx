import React, { useState } from "react";
import Button from "../../components/common/Button";

const CseContainer = ({ handleSearchModalOpen }) => {
  return (
    <>
      <Button
        className={"w-30 flex justify-center items-center"}
        onClick={handleSearchModalOpen}
      >
        악보 찾기
      </Button>
    </>
  );
};

export default CseContainer;
