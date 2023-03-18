import * as faceapi from "face-api.js";
import React, { useEffect, useRef} from "react";
import { useAuth } from "../context/AuthContext";
import './Descriptor.css'
import { useNavigate } from "react-router-dom";

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const {setPatient} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error(err));
    };

    const recognizeFaces = async () => {
      const faceDataURL = "http://localhost:5001/getFaceMaster";
      let labeledDescriptors;

      try {
        const response = await fetch(faceDataURL);
        const data = await response.json();

        labeledDescriptors = data.map((x) =>
          faceapi.LabeledFaceDescriptors.fromJSON(x)
        );
      } catch (error) {
        console.error(error);
        return;
      }

      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

      videoRef.current.addEventListener("play", () => {
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvasRef.current.append(canvas);

        const displaySize = {
          width: videoRef.current.width,
          height: videoRef.current.height,
        };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

          const results = resizedDetections.map((d) =>
            faceMatcher.findBestMatch(d.descriptor)
          );

          results.forEach((result, i) => {
            console.log(result.toString())
            if(result.toString().length>14)
            {
              console.log('reached')
              setPatient(result.toString().split(' ')[0]);
              navigate('/token')
            }
          });
        }, 500);
      });
    };

    loadModels();
    startVideo();
    recognizeFaces();
  }, []);

  return (
    <div className="body">
      <video
        className="frame"
        id="videoInput"
        ref={videoRef}
        width={720}
        height={540}
        autoPlay
        muted
      />
      <div ref={canvasRef} className="hide"/>
    </div>
  );
};

export default FaceRecognition;
