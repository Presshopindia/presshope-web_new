import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from 'react-bootstrap';

// Convert cm to pixels (assuming 96 DPI)
const cmToPx = (cm) => {
  return Math.round(cm * 37.795275591);
};

const ImageCrop = ({ 
  show, 
  onHide, 
  onCropComplete, 
  aspectRatio = 1, 
  initialImage,
  maxWidthCm = 140, // Default max width in cm
  maxHeightCm = 100, // Default max height in cm
}) => {
  const [crop, setCrop] = useState();
  const [imgSrc, setImgSrc] = useState('');
  const [defaultCrop, setDefaultCrop] = useState(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  console.log({
    crop,
    imgSrc,
    defaultCrop,
  })
  // Convert max dimensions to pixels
  const maxWidthPx = cmToPx(maxWidthCm);
  const maxHeightPx = cmToPx(maxHeightCm);

  useEffect(() => {
    if (initialImage) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(initialImage);
    }
  }, [initialImage]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    
    // Calculate the scale to fit within max dimensions while maintaining aspect ratio
    const scaleX = maxWidthPx / width;
    const scaleY = maxHeightPx / height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up if image is smaller

    // Calculate new dimensions
    const newWidth = width * scale;
    const newHeight = height * scale;

    // Calculate crop dimensions in pixels
    const cropWidth = Math.min(newWidth, maxWidthPx);
    const cropHeight = cropWidth / aspectRatio;

    // Calculate crop position to center it
    const cropX = (newWidth - cropWidth) / 2;
    const cropY = (newHeight - cropHeight) / 2;

    // Create initial crop in pixels
    const initialCrop = {
      unit: 'px',
      x: cropX,
      y: cropY,
      width: cropWidth,
      height: cropHeight
    };

    setCrop(initialCrop);
    setDefaultCrop(initialCrop);
  };

  const getCroppedImg = () => {
    if (!imgRef.current || !crop) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    // Use the current crop or default crop if no changes were made
    const finalCrop = crop || defaultCrop;
    
    // Set canvas size to match the crop dimensions
    canvas.width = finalCrop.width * scaleX;
    canvas.height = finalCrop.height * scaleY;
    
    const ctx = canvas.getContext('2d');

    // Draw the cropped image
    ctx.drawImage(
      imgRef.current,
      finalCrop.x * scaleX,
      finalCrop.y * scaleY,
      finalCrop.width * scaleX,
      finalCrop.height * scaleY,
      0,
      0,
      finalCrop.width * scaleX,
      finalCrop.height * scaleY
    );

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      // Create a new File object from the blob
      const croppedFile = new File([blob], 'cropped-image.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
      
      onCropComplete(croppedFile);
      onHide();
    }, 'image/jpeg');
  };

  const handleClose = () => {
    setImgSrc('');
    setCrop(undefined);
    setDefaultCrop(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crop Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div 
          className="image-crop-container" 
          ref={containerRef}
          style={{
            maxWidth: `${maxWidthCm}cm`,
            maxHeight: `${maxHeightCm}cm`,
            margin: '0 auto'
          }}
        >
          {!imgSrc ? (
            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="file-input"
              />
              <p>Click to upload image</p>
            </div>
          ) : (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={aspectRatio}
              className="crop-container"
              style={{
                maxWidth: `${maxWidthCm}cm`,
                maxHeight: `${maxHeightCm}cm`
              }}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                onLoad={onImageLoad}
                alt="Crop me"
                className="crop-image"
                style={{
                  maxWidth: '100%',
                  maxHeight: `${maxHeightCm}cm`,
                  objectFit: 'contain'
                }}
              />
            </ReactCrop>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button 
          className="btn btn-primary" 
          onClick={getCroppedImg}
          disabled={!imgSrc || !crop}
        >
          Crop & Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCrop; 