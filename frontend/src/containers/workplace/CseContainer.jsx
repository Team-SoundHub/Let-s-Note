import React, { useState } from "react";
import Button from "../../components/common/Button";

const CseContainer = ({ handleSearchModalOpen }) => {
  return (
    <div className={"flex justify-center items-center"}>
      <Button
        onClick={handleSearchModalOpen}
        className="flex justify-center items-center w-14 h-14 rounded-full p-3"
      >
        <svg
          width="49"
          height="46"
          viewBox="0 0 49 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.5625 38.3438C30.9452 38.3438 33.6875 36.2871 33.6875 33.75C33.6875 31.2129 30.9452 29.1562 27.5625 29.1562C24.1798 29.1562 21.4375 31.2129 21.4375 33.75C21.4375 36.2871 24.1798 38.3438 27.5625 38.3438Z"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M33.6875 33.75V4.65625L34.3 5.88125C35.8312 9.09688 38.2813 11.8531 41.3438 13.8438C43.9469 15.5281 44.5594 18.8969 42.875 21.5"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.59375 36.8125H15.3125"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.59375 29.1562H15.3125"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.59375 21.5H26.0312"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.59375 13.8438H26.0312"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.59375 6.1875H26.0312"
            stroke="white"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};

export default CseContainer;
