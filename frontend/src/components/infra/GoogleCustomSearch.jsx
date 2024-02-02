import React, { useState } from 'react';
import { TextInput } from 'flowbite-react';
import Button from '../common/Button';
import { googleCustomSearchApi } from '../../api/googleCustomSearchApi';
import SearchImageModal from '../WorkSpace/SearchImageModal';
import FileStoreApi from "../../api/fileStoreApi";

const GoogleCustomSearch = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <div>
                <div className="w-full flex justify-center content-center mb-4">
                    <TextInput id="input-info" placeholder="검색어 입력" required color="info" />
                    <Button onClick={handleSearchClick} disabled={loading}>
                        검색
                    </Button>
                </div>
                <div className="flex p-4 w-full h-fit overflow-y-auto items-center">
                    {loading && <p>Loading...</p>}
                    {!loading && images.length === 0 && <p>No images found.</p>}
                    {!loading && images.length > 0 && (
                        <ul className="flex">
                            {images.map((image, index) => (
                                <li key={index} className="mr-4 h-fit cursor-pointer" onClick={() => openImageModal(image.imageUrl)} draggable="true">
                                    <div>
                                        <img src={image.imageUrl} width={250} height={200} alt={image.title}/>
                                        <p className={'overflow-ellipsis'}>{image.title}</p>
                                        <Button onClick={FileStoreApi(image.imageUrl)} disabled={loading}>
                                            악보에 저장
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {selectedImage && <SearchImageModal image_url={selectedImage} onClose={() => setSelectedImage(null)}/>}
        </div>
    );
};

export default GoogleCustomSearch;
