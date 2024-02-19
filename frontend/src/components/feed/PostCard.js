import { useState } from "react";
import tw from "tailwind-styled-components";
import { Card } from "flowbite-react";
import crown from "../../assets/landing/crown-svgrepo-com.svg";

import { deleteWorkSpace, deleteSnapshot } from "../../api/myPageApi";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    
      <Card
        as="a"
        href={`#`}
        className="flex w-60 h-[90%] mx-5 my-5 border-b-8 border-[#49C5B6]"
      >
        <ContentContainer>
          <TitleContainer>
            {props.isMypage && (
              <div className="flex justify-end">
                <div>
                  <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdown"
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setDropdownOpen(!dropdownOpen);
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>
                </div>
                <div
                  id="dropdown"
                  className={`absolute z-10 mt-8 ${dropdownOpen ? "" : "hidden"
                    } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (props.spaceId) {
                            deleteWorkSpace(props.spaceId).then(() =>
                              window.location.reload()
                            );
                          } else {
                            deleteSnapshot(props.snapshotId).then(() =>
                              window.location.reload()
                            );
                          }
                        }}
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
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
