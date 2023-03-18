import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [patientData, setPatientData] = useState(null);
  const { user } = useAuth();
  const uid = user.uid;
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/getPatient", {
          params: { Uid: uid },
        });
        setPatientData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [uid]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patient Profile</h1>
      <p>Patient ID: {patientData.uid}</p>
      <p>First Name: {patientData.First_name}</p>
      <p>Date of Birth: {patientData.Dob}</p>
      <p>Gender: {patientData.Gender}</p>
      <p>Address: {patientData.Address}</p>
      <p>Phone: {patientData.Phone}</p>
      <p>Blood Group: {patientData.Blood_group}</p>
      <p>
        Chronic Medical Conditions: {patientData.Chronic_Medical_Conditions}
      </p>
      <p>
        Long-term Ongoing Medication: {patientData.Long_term_ongoing_Medication}
      </p>
      <p>Email: {patientData.Email}</p>
    </div>
  );
};

export default Profile;
