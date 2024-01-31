import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

const buttonStyle = tw.button`
  bg-[#49C5B6]
  hover:bg-[#275a54]
  focus:ring-4 
  focus:outline-none 
  focus:ring-lime-200 
  dark:focus:ring-teal-700 
  font-medium
  text-center
  rounded-lg
  px-4
  py-1
  mx-2
  my-2
`;

const StyledButton = tw(buttonStyle)`
  text-white
  font-bold
  bg-[#49C5B6]
  hover:bg-[#367e76]
  disabled:bg-gray-300
  disabled:text-gray-500
  disabled:cursor-not-allowed
`;

const StyledLink = tw(Link)`
text-white
  font-bold
bg-[#49C5B6]
hover:bg-[#275a54]
focus:ring-4 
focus:outline-none 
focus:ring-lime-200 
dark:focus:ring-teal-700 
font-medium
text-center
rounded-lg
px-4
py-1
mx-2
my-2
`;

const Button = (props) => {
  return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
