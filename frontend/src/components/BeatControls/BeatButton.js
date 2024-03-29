import tw from "tailwind-styled-components";

const BeatButton = tw.button`
  text-gray-900 
  bg-[#49C5B6]
  hover:bg-gradient-to-l 
    hover:from-teal-200 
    hover:to-lime-200 
  focus:ring-4 
  focus:outline-none 
  focus:ring-lime-200 
  dark:focus:ring-teal-700 
  font-medium 
  rounded-full
  text-sm 
  px-3
  py-3 
  text-center
  my-2
`;

const BeatButtonPause = tw.button`
  text-gray-900 
  bg-[#BFCDCD]
  hover:bg-gradient-to-l 
    hover:from-teal-200 
    hover:to-lime-200 
  focus:ring-4 
  focus:outline-none 
  focus:ring-lime-200 
  dark:focus:ring-teal-700 
  font-medium 
  rounded-full
  text-sm 
  px-3
  py-3 
  text-center
  my-2
`;

export {BeatButtonPause};
export default BeatButton;
