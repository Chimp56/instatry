// src/components/ARTryOn.js
import React, { useRef, useState } from "react";

const ARTryOn = ({ product, onClose }) => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // When the modal is closed, also stop the camera
  const handleClose = () => {
    stopCamera();
    onClose();
  };

  if (!product) return null; // If no product, don't render anything

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>AR Try-On</h2>
        <p>Trying on: <strong>{product.name}</strong></p>

        {!cameraActive ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={stopCamera}>Stop Camera</button>
        )}

        <div style={{ marginTop: "1rem" }}>
          <video
            ref={videoRef}
            style={{ width: "400px", height: "auto", border: "1px solid #000" }}
          />
        </div>

        <p style={{ marginTop: "1rem" }}>
          This is where you could overlay 3D models or images for a true AR experience.
        </p>
        <button onClick={handleClose} style={{ marginTop: "1rem" }}>Close</button>
      </div>
    </div>
  );
};

export default ARTryOn;

// Very simple inline styles for a modal
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  content: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "500px",
    maxWidth: "90%",
  },
};
