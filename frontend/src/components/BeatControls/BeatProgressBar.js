import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { handleCountChange } from "../BeatGrid/BeatGrid";
import { getCount } from "../BeatGrid/BeatGrid";

const ProgressBarContainer = tw.div`
    flex
    flex-col
    w-full dark:bg-gray-700
`;

const BeatProgressBar = ({ count, columns, onPlay, handleIsPlaying }) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleMouseDown = (event) => {
    onPlay();
    handleIsPlaying();
    const progressBar = event.target.parentNode;
    const rect = progressBar.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const progressPercentage = (mouseX / progressBar.clientWidth) * 100;
    const newCount = Math.round((progressPercentage / 100) * columns);

    handleCountChange(newCount);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onPlay();
    handleIsPlaying();
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const progressBar = event.target.parentNode;
      const rect = progressBar.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const progressPercentage = (mouseX / progressBar.clientWidth) * 100;
      const newCount = Math.round((progressPercentage / 100) * columns);

      handleCountChange(newCount);
    }
  };

  useEffect(() => {
    if (isDragging) {
      // Attach event listeners for mouse move and mouse up
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Detach event listeners when component unmounts or drag ends
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  const progressValue = Math.max(0, Math.min((count / columns) * 100, 100));

  return (
    <ProgressBarContainer onMouseDown={handleMouseDown}>
      <div class="bg-white rounded-xl shadow-sm overflow-hidden p-1 border border-gray">
        <div class="relative h-6 flex items-center justify-center">
          <div
            className="absolute top-0 bottom-0 left-0 rounded-lg bg-green-200"
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      </div>
      {/* <div
            class="bg-[#49c5b6] h-2.5 rounded-full"
            style={{ width: `${progressValue}%` }}
          ></div> */}
    </ProgressBarContainer>
  );
};

export default BeatProgressBar;
