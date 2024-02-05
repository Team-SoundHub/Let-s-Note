import React from "react";

const NoteImage = ({ images, openImagePreview, loading }) => {
  return (
    <div
      id="note-storage"
      className="flex flex-col justify-between content-center"
    >
      <div>
        {loading && <p>Loading...</p>}
        {!loading && !images && <p>No images found.</p>}
        {!loading && images && images.length > 0 && (
          <ul className="flex p-4 overflow-x-scroll">
            {images.map((image, index) => (
              <li key={index} className="mr-4 h-fit cursor-pointer">
                <div>
                  <img
                    src={image.fileUrl}
                    width={250}
                    height={200}
                    alt={image.fileName}
                    onClick={() => openImagePreview(image.fileUrl)}
                    draggable="true"
                  />
                  <p className="overflow-ellipsis">{image.fileName}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NoteImage;
