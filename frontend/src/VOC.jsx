import React from 'react';
import { RiCustomerService2Fill } from "react-icons/ri";

const handleVOC = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSf3QUyckdsNEJXwg1eJva4tegCo0eoeq4nCSTWCxAQjjrk4wQ/viewform', '_blank');
}

const VOC = () => {
    return (
        <div className="flex absolute justify-center content-center bottom-[100px] left-0 w-[80px] h-[80px]">
            <button onClick={handleVOC} class={"flex justify-center items-center w-[60px] h-[60px] rounded-full focus:ring-4 focus:outline-none focus:ring-lime-200 bg-[#49C5B6] hover:bg-[#367e76]"}>
                <RiCustomerService2Fill className={'w-8 h-8 fill-white'}/>
            </button>
        </div>
    );
};

export default VOC;