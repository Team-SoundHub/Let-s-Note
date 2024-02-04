import React, { useState } from "react";
import GoogleCustomSearch from "../../components/infra/GoogleCustomSearch";
import Button from "../../components/common/Button";

const CseContainer = ({ handleSearchBarOpen }) => {
  return (
    <>
      <Button
        className={"w-30 flex justify-center content-center"}
        onClick={handleSearchBarOpen}
      >
        악보 찾기
      </Button>
    </>
  );
};

export default CseContainer;
