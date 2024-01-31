import tw from "tailwind-styled-components";
import add from "../../assets/control/plus-large-svgrepo-com.svg";

const AddMemberButton = tw.button`
text-gray-900 
bg-[#49C5B6]
hover:bg-[#3c8d83]
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
mx-1
my-2
`;

const Image = tw.img`
  w-5
  h-5
`;

const MemberInfo = ({ onClick }) => (
  <AddMemberButton>
    <Image src={add} />
  </AddMemberButton>
);

export default MemberInfo;
