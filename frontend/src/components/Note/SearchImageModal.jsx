import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

const SearchImageModal = ({ image_url, onClose, openFileStoreModal }) => {
    return (
        <>
            <Modal show={Boolean(image_url)} onClose={onClose} className={"z-[1000]"}>
                <Modal.Header>Image Details</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <img src={image_url} alt="Selected Image" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
                    <Button
                      onClick={() => openFileStoreModal(image_url)}
                    //   disabled={loading}
                    >
                      악보에 저장
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchImageModal;
