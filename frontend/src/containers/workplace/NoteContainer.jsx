import React, { useState } from 'react';
import NoteStorage from "../../components/WorkSpace/NoteStorage";
import SearchImageModal from "../../components/WorkSpace/SearchImageModal";

const NoteContainer = () => {
    const [noteStorageVisible, setNoteStorageVisible] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleNoteStorageBox = () => {
        setNoteStorageVisible(prevState => !prevState);
    };

    return (
        <>
            <div className="w-[60px] h-[60px] flex justify-center content-center bg-[#49C5B6] hover:bg-[#3c8d83] focus:ring-4 focus:ring-lime-200 rounded-full p-2 cursor-pointer" onClick={handleNoteStorageBox}>
                <svg className="fill-white" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <path d="M138.2 22.71c-25.5-.14-45.82 38.57-50.14 80.29H32v18h55.23c.07 6.1.49 12.1 1.33 18l17.34-18h25.5c-3.8 3.9-7.9 7.7-12.1 11.8l-31.24 32.5v-.1c-.53.6-1.1 1.2-1.64 1.8H32v18h38.17c-12.95 14.6-25.91 30.2-35.67 46H34v.8c-8.09 13.3-13.89 26.8-15.44 39.9-3.5 33.5 9.52 67.3 33.39 87.3H32v18h65.54c2.56.1 5.16.1 7.86 0h20.1c3.7 20.7 7 41.2 8.9 60 .4 3.6-6.6 10.6-10 11.4 0-22-17.8-39.9-39.84-39.9-21.9 0-39.8 17.9-39.8 39.9.1 20.1 15.2 35.8 35 39.5 41.84 7.7 78.34-17.9 72.44-53-2.9-19.1-6.2-38.5-9.7-57.9H480v-18H139.3c-2.9-15.5-5.8-30.9-8.5-46h37.3c-2.6 7.8-8.1 15.9-15.4 23l3.7 20.8c15.5-11.3 31.3-26.6 35.7-43.8H480v-18H192.9c-1.6-14.5-7.8-30.8-17.8-39.9-2.5-2.3-5.1-4.3-7.8-6.1H480v-18H116.8c-1.2-7.7-1.9-11.8-2.7-16.4l-15.54 15.1c.08.4.17.9.25 1.3H72.63c12.31-16.2 26.52-30.9 41.17-46H480v-18H130.9c10.5-11.3 20.9-23.2 30.7-36.4 2-2.8 3.8-6 5.3-9.6H480v-18H172.1c2.5-12.89 2.7-26.36 1.2-35.24-2.7-16.12-14.2-42.89-31.9-44.83-1.1-.14-2.1-.22-3.2-.22zm-5.5 37c6.9.1 14.4 5.8 15.6 15.95 1.3 11.18-.3 19.87-3.8 27.34h-36c3.4-20 11.2-42.23 24.2-43.29zM60.23 249h31.24c-13.45 12.5-19.59 29.6-18.93 46H42.79c.04-5.6.98-11.3 2.97-17 4.02-10.4 8.93-20 14.47-29zm63.57 11.3c11.8-.3 26.9 5.8 34 12.9 5.7 6.2 9.6 14.1 11.2 21.8h-41.5c-2.1-11.8-4.2-23.4-6-34.6.7-.1 1.5-.1 2.3-.1zm-19.4 6.5c1.5 8.9 3.3 18.4 5.2 28.2H90.63c.1-11 4.22-21.2 13.77-28.2zM45.75 313h30.39c2.69 7.2 6.83 13.9 12.42 19.4 5.1 5.2 15.14-2.7 10-8.6-1.93-3.5-3.54-7.1-4.81-10.8h19.35c3 15 6.1 30.5 9.1 46h-20v-.1c-25.44-3.3-48.49-22.3-56.45-45.9z"></path>
                </svg>
            </div>
            <div id="note-box" className={noteStorageVisible ? "visible" : "hidden"}>
                <NoteStorage openImageModal={openImageModal}/>
            </div>
            <div>

            </div>
            {selectedImage && <SearchImageModal image_url={selectedImage} onClose={() => setSelectedImage(null)} />}
        </>
    );
};

export default NoteContainer;
