import tw from "tailwind-styled-components";

const BeatButton = tw.button`
  text-gray-900 
  bg-gradient-to-r 
    from-teal-200 
    to-lime-200 
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
  me-2 
  mb-2
`;

export default BeatButton;
