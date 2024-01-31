import tw from "tailwind-styled-components";
import { Card } from "flowbite-react";
import crown from "../../assets/landing/crown-svgrepo-com.svg";

const TitleContainer = tw.div`
  flex-col items-center justify-between mb-4
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

const EditDate = tw.p`
  text-black-200
  text-sm
  mt-auto
`;

const ContentContainer = tw.div`
  flex-col h-full
`;

const PostCard = (props) => {
  return (
    <Card
      as="a"
      href={`#`}
      className="flex w-60 h-[90%] mx-5 my-5 border-b-8 border-[#49C5B6]"
    >
      <ContentContainer>
        <TitleContainer>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {props.snapshotTitle}
          </h5>
          <div className="flex items-center">
            <img className="w-5 h-5 mt-3" src={crown} />
            <h2 className="ml-2 mt-4 text-xm font-bold text-gray-900 dark:text-white">
              {props.ownerNickname}
            </h2>
          </div>
        </TitleContainer>
        <div>
          <span>{props.snapshotContent}</span>
          <ul className="my-4 space-y-3">
            {props.memberNicknames.map((member, index) => (
              <li key={index}>
                <MemberNickNameSpan href="#">{member}</MemberNickNameSpan>
              </li>
            ))}
          </ul>
        </div>
      </ContentContainer>
      <EditDate>{new Date(props.updateAt).toLocaleString()}</EditDate>
    </Card>
  );
};

export default PostCard;
