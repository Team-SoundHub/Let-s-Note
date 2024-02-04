import React, { useState } from 'react';
import { TextInput } from 'flowbite-react';
import Button from '../common/Button';
import { googleCustomSearchApi } from '../../api/googleCustomSearchApi';
import SearchImageModal from '../WorkSpace/SearchImageModal';
import FileStoreModal from '../WorkSpace/FileStoreModal';

const GoogleCustomSearch = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [storedImage, setStoredImage] = useState(null);

    const handleSearchClick = async () => {
        try {
            setLoading(true);
            const searchTerm = document.getElementById('input-info').value;
            document.getElementById('input-info').value = '';
            const fetchedImages = await googleCustomSearchApi(searchTerm);

            if (fetchedImages && fetchedImages.length >= 1) {
                setImages(fetchedImages);
            } else {
                setImages([]); // Reset images state if no images are found
            }
        } catch (error) {
            console.error('Error during search:', error);
        } finally {
            setLoading(false);
        }
    };

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const openFileStoreModal = (imageUrl) => {
        setStoredImage(imageUrl);
    };

    return (
        <div className="absolute w-[1200px] h-[500px] top-[300px] left-[400px] bg-gray-100 rounded-lg  flex flex-col justify-between items-center p-4">
            <div className="w-full flex justify-center content-center mb-4">
                    <TextInput id="input-info" placeholder="노래 이름 입력" required color="info" />
                    <Button onClick={handleSearchClick} disabled={loading}>
                        악보 검색
                    </Button>
        </div>
            <div className="flex p-4 w-[1200px] h-[400px] overflow-y-auto items-center">
                {loading && <p>Loading...</p>}
                {!loading && images.length === 0 && <p>No images found.</p>}
                {!loading && images.length > 0 && (
                    <ul className="flex">
                        {images.map((image, index) => (
                            <li key={index} className="mr-4 w-[140px] cursor-pointer">
                                <div>
                                    <img src={image.imageUrl} width={250} height={200} alt={image.title} onClick={() => openImageModal(image.imageUrl)} draggable="true"/>
                                    <p className={'overflow-ellipsis'}>{image.title}</p>
                                    <Button onClick={() => openFileStoreModal(image.imageUrl)} disabled={loading}>
                                        악보에 저장
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedImage && <SearchImageModal image_url={selectedImage} onClose={() => setSelectedImage(null)} />}
            {storedImage && <FileStoreModal image_url={storedImage} onClose={() => setStoredImage(null)} />}
        </div>
    );
};

export default GoogleCustomSearch;
