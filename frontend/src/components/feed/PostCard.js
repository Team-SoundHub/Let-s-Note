import tw from "tailwind-styled-components";
import { Card } from "flowbite-react";

const PostCard = ({ children }) => {
  return (
    <Card as="a" href="#" className="max-w-sm">
      <h5 className="mb-3 text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
        Connect wallet
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Connect with one of our available wallet providers or create a new one.
      </p>
      <ul className="my-4 space-y-3">{children}</ul>
    </Card>
  );
};

export default PostCard;
