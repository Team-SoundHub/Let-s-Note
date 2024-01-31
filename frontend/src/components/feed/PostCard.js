import tw from "tailwind-styled-components";
import { Card } from "flowbite-react";

const TitleContainer = tw.div`
  flex items-center justify-between mb-4
`;

const MemberNickNameSpan = tw.span`
  group 
  flex 
  items-center 
  rounded-lg 
  bg-gray-200
  p-3 
  text-sm
  font-bold 
  text-gray-900 
  hover:bg-gray-100 
  hover:shadow 
  dark:bg-gray-600 
  dark:text-white 
  dark:hover:bg-gray-500
`;

const PostCard = (props) => {
  return (
    <Card
      as="a"
      href={`#`}
      className="max-w-60 mx-5 my-5 border-b-8 border-[#49C5B6]"
    >
      <TitleContainer>
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {props.snapshotTitle}
        </h5>
      </TitleContainer>
      <span>{props.snapshotContent}</span>
      <ul className="my-4 space-y-3">
        {props.memberNicknames.map((member, index) => (
          <li key={index}>
            <MemberNickNameSpan href="#">{member}</MemberNickNameSpan>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PostCard;
