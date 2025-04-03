// src/components/DynamicTryOn.js
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";

// --- DynamicGarmentModel Component ---
// This component loads the garment model and applies a dynamic transformation.
// For wizard hats, we use the nose keypoint and add an increased vertical offset
// so the hat appears on top of the head.
function DynamicGarmentModel({ overlayModelUrl, pose }) {
  const { scene } = useGLTF(overlayModelUrl);
  console.log("Loaded 3D scene from", overlayModelUrl, ":", scene);
  const modelRef = useRef();

  useFrame(() => {
    if (pose && modelRef.current) {
      // If the model is a wizard hat, use the nose keypoint.
      if (overlayModelUrl.includes("wizards_hat")) {
        const nose = pose.keypoints.find((kp) => kp.name === "nose");
        if (nose && nose.score > 0.5) {
          // Assuming a 640x480 video feed with center at (320,240):
          modelRef.current.position.x = (nose.x - 320) / 100;
          // Increase vertical offset so the hat sits on top of your head.
          modelRef.current.position.y = -((nose.y - 240) / 100) + 3.5;
          // Set a base scale; adjust if needed.
          modelRef.current.scale.set(3, 3, 3);
          console.log("Wizard hat positioned at:", modelRef.current.position, "with scale 3");
        }
      }
      // You can add additional logic for other garment types here (e.g., dresses, t-shirts)
      else {
        // Default transformation using shoulders (for example)
        const leftShoulder = pose.keypoints.find((kp) => kp.name === "left_shoulder");
        const rightShoulder = pose.keypoints.find((kp) => kp.name === "right_shoulder");
        if (leftShoulder && rightShoulder && leftShoulder.score > 0.5 && rightShoulder.score > 0.5) {
          const midX = (leftShoulder.x + rightShoulder.x) / 2;
          const midY = (leftShoulder.y + rightShoulder.y) / 2;
          modelRef.current.position.x = (midX - 320) / 100;
          modelRef.current.position.y = -((midY - 240) / 100);
          const dx = leftShoulder.x - rightShoulder.x;
          const scaleFactor = Math.abs(dx) / 50;
          modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
          console.log("Default garment position:", modelRef.current.position, "scale:", scaleFactor);
        }
      }
    }
  });

  return (
    <Center>
      <primitive ref={modelRef} object={scene} />
    </Center>
  );
}

// --- TestCube Component ---
// A simple red cube for testing purposes.
function TestCube() {
  useFrame(() => {});
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

// --- Main DynamicTryOn Component ---
const DynamicTryOn = ({ product, onClose }) => {
  const videoRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [pose, setPose] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Initialize the TensorFlow backend.
  useEffect(() => {
    const setupTF = async () => {
      await tf.ready();
      await tf.setBackend("webgl");
      console.log("TF backend is ready:", tf.getBackend());
    };
    setupTF();
  }, []);

  // Initialize the MoveNet pose detector using the tfjs runtime.
  useEffect(() => {
    const initDetector = async () => {
      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = {
        runtime: "tfjs",
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      try {
        const newDetector = await poseDetection.createDetector(model, detectorConfig);
        setDetector(newDetector);
        console.log("Pose detector initialized:", newDetector);
      } catch (err) {
        console.error("Error creating detector:", err);
      }
    };
    initDetector();
  }, []);

  // Start the camera.
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraActive(true);
          console.log("Camera started");
          console.log("Video dimensions:", videoRef.current.videoWidth, videoRef.current.videoHeight);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
  }, []);

  // Continuously detect pose from the video.
  useEffect(() => {
    let animationFrameId;
    const detectPose = async () => {
      if (detector && videoRef.current && cameraActive) {
        try {
          const poses = await detector.estimatePoses(videoRef.current);
          if (poses && poses.length > 0) {
            setPose(poses[0]);
            console.log("Pose detected:", poses[0]);
          }
        } catch (err) {
          console.error("Pose detection error:", err);
        }
      }
      animationFrameId = requestAnimationFrame(detectPose);
    };
    detectPose();
    return () => cancelAnimationFrame(animationFrameId);
  }, [detector, cameraActive]);

  // Stop the camera when closing.
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      console.log("Camera stopped");
    }
    setCameraActive(false);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Dynamic 3D AR Try-On: {product?.name}</h2>
        {/* Container for the video and Canvas */}
        <div style={{ position: "relative", width: 400, height: 300 }}>
          {/* Video feed (background) */}
          <video
            ref={videoRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
            muted
            playsInline
          />
          {/* Canvas overlay for 3D scene */}
          <Canvas
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              pointerEvents: "none",
            }}
            camera={{ position: [0, 0, 5] }}
            gl={{ alpha: true }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[0, 5, 5]} intensity={0.8} />
            {product?.overlayModel ? (
              <DynamicGarmentModel overlayModelUrl={product.overlayModel} pose={pose} />
            ) : (
              <TestCube />
            )}
          </Canvas>
        </div>
        <button onClick={handleClose} style={{ marginTop: "1rem" }}>
          Close AR
        </button>
      </div>
    </div>
  );
};

export default DynamicTryOn;

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
    width: "600px",
    maxWidth: "90%",
    textAlign: "center",
  },
};
