import React, { useState } from 'react';

interface ImageViewerProps {
  imageUrl: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Función para alternar la visibilidad de la imagen
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="image-viewer">
      <button
        onClick={toggleVisibility}
        className="toggle-button bg-blue-500 text-white p-2 rounded-md"
      >
        {isVisible ? 'Ocultar Imagen' : 'Ver Imagen'}
      </button>

      {isVisible && (
        <div className="image-container mt-4">
          <img src={imageUrl} alt="Vista previa" className="rounded-md max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
