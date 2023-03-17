import React, { useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
      console.log("Models loaded");
    };

    const loadDescriptors = async () => {
      // array of 5 uploaded images
      const uploadedImages = [];

      const descriptors = await Promise.all(
        uploadedImages.map(async (image) => {
          const img = await faceapi.bufferToImage(image);

          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          console.log("horay");
          return detections.descriptor;
        })
      );

      console.log("Descriptors extracted");
      console.log(descriptors);

      return descriptors;
    };

    loadModels();
    loadDescriptors();
  }, []);

  return (
    <div>
      <h1>FILLER</h1>
    </div>
  );
};

export default FaceRecognition;
