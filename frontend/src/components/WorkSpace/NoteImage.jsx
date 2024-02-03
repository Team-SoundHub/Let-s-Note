import React from 'react';
import Button from '../common/Button';

const NoteImage = ({ images, openImageModal, loading, fetchImages }) => {
    return (
        <div id="note-storage" className="w-[400px]">
            <Button onClick={fetchImages} disabled={loading}>
                악보 불러오기
            </Button>
            {loading && <p>Loading...</p>}
            {!loading && !images && <p>No images found.</p>}
            {!loading && images && images.length > 0 && (
                <ul className="flex">
                    {images.map((image, index) => (
                        <li key={index} className="mr-4 h-fit cursor-pointer">
                            <div>
                                <img
                                    src={image.fileUrl}
                                    width={250}
                                    height={200}
                                    alt={image.fileName}
                                    onClick={() => openImageModal(image.fileUrl)}
                                    draggable="true"
                                />
                                <p className="overflow-ellipsis">{image.fileName}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoteImage;
