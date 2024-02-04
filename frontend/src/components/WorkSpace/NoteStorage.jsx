import React, { useState, useEffect } from 'react';
import NoteImage from "./NoteImage";
import FileGetApi from "../../api/fileGetApi";

const NoteStorage = () => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    const openImageModal = (imageUrl) => {
        console.log('Open image modal for:', imageUrl);
    };

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await FileGetApi();
            setImages(response); // Assuming response is an array of images
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="note-storage" className="w-[400px]">
            <NoteImage images={images} openImageModal={openImageModal} loading={loading} fetchImages={fetchImages} />
        </div>
    );
};

export default NoteStorage;
