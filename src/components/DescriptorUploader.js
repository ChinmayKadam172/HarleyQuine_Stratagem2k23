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

    const loadLabeledImages = async () => {
      //insert new users uid
      const labels = [];

      //images path
      const FACES_URL = process.env.PUBLIC_URL + "/labeled_images";
      const descriptions = await Promise.all(
        labels.map(async (label) => {
          const faceDescriptors = [];
          for (let i = 1; i <= 5; i++) {
            const img = await faceapi.fetchImage(
              FACES_URL + `/${label}/${i}.jpg`
            );

            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            console.log("horay");
            faceDescriptors.push(detections.descriptor);
          }
          return {
            label,
            descriptors: faceDescriptors,
          };
        })
      );

      console.log("Labeled images loaded");
      console.log(descriptions);

      return descriptions;
    };

    loadModels();
    loadLabeledImages();
  }, []);

  return (
    <div>
      <h1>FILLER</h1>
    </div>
  );
};

export default FaceRecognition;
