import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

const ProgressBarContainer = tw.div`
    flex
    flex-col
    w-full dark:bg-gray-700
`;

const BeatProgressBar = ({ count, handleCountChange, columns }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="bg-[#49c5b6] h-2.5 rounded-full"
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
    </ProgressBarContainer>
  );
};

export default BeatProgressBar;
