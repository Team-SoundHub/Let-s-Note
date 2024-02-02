import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

const SearchImageModal = ({ image_url, onClose }) => {
    return (
        <>
            <Modal show={Boolean(image_url)} onClose={onClose}>
                <Modal.Header>Image Details</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <img src={image_url} alt="Selected Image" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchImageModal;
