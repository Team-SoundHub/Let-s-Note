import React, { useState } from "react";

const NoteNavHeader = ({ toggleSearchVisible, toggleStorageVisible }) => {
  const [activeTab, setActiveTab] = useState("search"); // Initial active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                onClick={() => {
                  handleTabClick("search");
                  toggleSearchVisible();
                }}
                className={`block py-2 px-3 ${
                  activeTab === "search" ? "text-blue-700" : "text-black"
                } rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500`}
                aria-current={activeTab === "search" && "page"}
              >
                악보 검색
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  handleTabClick("storage");
                  toggleStorageVisible();
                }}
                className={`block py-2 px-3 ${
                  activeTab === "storage" ? "text-blue-700" : "text-black"
                } rounded hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                보관함
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NoteNavHeader;
