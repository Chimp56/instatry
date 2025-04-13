// src/components/ARTryOn3D.js
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { mediaURL } from "../api/api"; 

// --- GarmentModel Component ---
function GarmentModel({ overlayModelUrl, modelObject, pose }) {
  const modelRef = useRef();

  useFrame(() => {
    if (pose && modelRef.current) {
      // For Wizard Hat: use the nose keypoint.
      if (overlayModelUrl.includes("wizards_hat")) {
        const nose = pose.keypoints.find((kp) => kp.name === "nose");
        if (nose && nose.score > 0.5) {
          // Assume a 640x480 video feed; center is (320,240).
          modelRef.current.position.x = (nose.x - 320) / 100;
          // Offset upward so the hat sits on the head.
          modelRef.current.position.y = -((nose.y - 240) / 100) + 1;
          // Set a base scale for the hat.
          modelRef.current.scale.set(3, 3, 3);
        }
      }
      // For Victorian Dress: use shoulders and hips.
      else if (overlayModelUrl.includes("victorian_dress")) {
        const leftShoulder = pose.keypoints.find((kp) => kp.name === "left_shoulder");
        const rightShoulder = pose.keypoints.find((kp) => kp.name === "right_shoulder");
        const leftHip = pose.keypoints.find((kp) => kp.name === "left_hip");
        const rightHip = pose.keypoints.find((kp) => kp.name === "right_hip");
        if (
          leftShoulder && rightShoulder && leftHip && rightHip &&
          leftShoulder.score > 0.5 && rightShoulder.score > 0.5 &&
          leftHip.score > 0.5 && rightHip.score > 0.5
        ) {
          const midShoulderX = (leftShoulder.x + rightShoulder.x) / 2;
          const midShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
          const midHipX = (leftHip.x + rightHip.x) / 2;
          const midHipY = (leftHip.y + rightHip.y) / 2;
          // Average the shoulder and hip midpoints.
          const centerX = (midShoulderX + midHipX) / 2;
          const centerY = (midShoulderY + midHipY) / 2;
          // Use shoulder distance for scaling.
          const shoulderDist = Math.abs(leftShoulder.x - rightShoulder.x);
          const dynamicScale = shoulderDist / 50; // Tweak as needed.
          modelRef.current.position.x = (centerX - 320) / 100;
          modelRef.current.position.y = -((centerY - 240) / 100);
          modelRef.current.scale.set(dynamicScale, dynamicScale, dynamicScale);
          console.log("Dress - dynamic scale:", dynamicScale, "Center:", centerX, centerY);
        }
      }
      // Default (e.g., T-Shirt): use shoulders.
      else {
      const leftShoulder = pose.keypoints.find((kp) => kp.name === "left_shoulder");
      const rightShoulder = pose.keypoints.find((kp) => kp.name === "right_shoulder");
      if (leftShoulder && rightShoulder && leftShoulder.score > 0.5 && rightShoulder.score > 0.5) {
        const midX = (leftShoulder.x + rightShoulder.x) / 2;
        const midY = (leftShoulder.y + rightShoulder.y) / 2;
        modelRef.current.position.x = (midX - 320) / 100;
        modelRef.current.position.y = -((midY - 240) / 100);
        const dx = leftShoulder.x - rightShoulder.x;
        const distance = Math.sqrt(dx * dx);
        const scaleFactor = distance / 50; // Adjust as needed
        modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }
      }
    }
  });

  return (
    <Center>
      <primitive ref={modelRef} object={modelObject} />
    </Center>
  );
}

// --- Main ARTryOn3D Component ---
const ARTryOn3D = ({ product, onClose }) => {
  const videoRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [pose, setPose] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [modelObject, setModelObject] = useState(null); // Store the loaded 3D object

  // Initialize TensorFlow backend
  useEffect(() => {
    const setupTF = async () => {
      await tf.ready();
      await tf.setBackend("webgl");
      console.log("TF backend is ready:", tf.getBackend());
    };
    setupTF();
  }, []);

  // Initialize the MoveNet pose detector
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

  // Load the 3D model
  useEffect(() => {
    const loadModel = async () => {
      if (product?.overlay_model) {
        const loader = new GLTFLoader();
        const modelUrl = `${mediaURL}${product.overlay_model}`; // Ensure the URL points to the backend
        loader.load(
          modelUrl,
          (gltf) => {
            setModelObject(gltf.scene); // Store the loaded 3D object
            console.log("3D model loaded:", gltf.scene);
          },
          undefined,
          (error) => {
            console.error("Error loading 3D model:", error);
          }
        );
      }
    };
    loadModel();
  }, [product]);

  // Start the camera
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

  // Continuously detect pose
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

  // Stop the camera
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
        <h2>3D AR Try-On: {product?.name}</h2>
        {/* Container for the video and Canvas */}
        <div style={{ position: "relative", width: 400, height: 300 }}>
          {/* Video feed */}
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
          {/* Canvas overlay */}
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
            {modelObject ? (
              <GarmentModel overlayModelUrl={product.overlay_model} modelObject={modelObject} pose={pose} />
            ) : (
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
              </mesh>
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

export default ARTryOn3D;

// --- Modal Styles ---
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
