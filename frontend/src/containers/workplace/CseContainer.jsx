import React, { useState } from 'react';
import GoogleCustomSearch from "../../components/infra/GoogleCustomSearch";

const CseContainer = () => {
    const [searchBoxVisible, setSearchBoxVisible] = useState(false);

    const handleSearchBar = () => {
        setSearchBoxVisible(prevState => !prevState);
    };

    return (
        <>
            <div className={"w-full flex justify-center content-center"}>
                <div className={"w-[60px] h-[60px] flex justify-center content-center bg-[#49C5B6] hover:bg-[#3c8d83] focus:ring-4 focus:ring-lime-200 rounded-full p-2 cursor-pointer"} onClick={handleSearchBar}>
                    <svg className="w-10 h-10 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </div>
            </div>
            <div id="search-box" className={searchBoxVisible ? 'visible' : 'hidden'}>
                <GoogleCustomSearch/>
            </div>
        </>
    );
};

export default CseContainer;
