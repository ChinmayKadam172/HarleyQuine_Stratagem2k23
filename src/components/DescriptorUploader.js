import React, { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const FaceRecognition = () => {
  const {user} = useAuth();
  const [uploadedImages,setUploadedImages] = useState([]);
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

    loadModels();
  }, [uploadedImages]);

  const loadDescriptors = async () => {

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
    // api call to send to mongo
    axios.post('http://localhost:5001/createFace', {label:user.uid, descriptors : descriptors}, {
      headers: {
        "Content-Type": "application/json"
      }})
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  function uploadDescriptors(){
    if(uploadedImages.length <= 5)
    {
      uploadedImages.forEach((ele)=>{
        loadDescriptors(ele);
      })
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file.type.startsWith("image/")) {
      console.log("File is not an image.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const blob = new Blob([event.target.result], { type: file.type });
      console.log(blob);
      setUploadedImages([...uploadedImages,blob]);
    };
  
    reader.readAsArrayBuffer(file);

  };  

  return (
    <div>
      <h1>FILLER</h1>
      {uploadedImages.map((ele)=>{
        return <p>{ele.size}</p>})}
      <input type="file" onChange={handleFileSelect} accept="image"/>
      <button onClick={()=>uploadDescriptors()}>Submit</button>
    </div>
  );
};

export default FaceRecognition;
