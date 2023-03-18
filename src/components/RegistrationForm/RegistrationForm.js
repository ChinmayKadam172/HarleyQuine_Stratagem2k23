import React, {useState} from "react";
import axios from "axios";
import './Regis.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const UserForm = () => {
  const {user} = useAuth();
  const [formData,setFormData] = useState({uid : user.uid});
  const navigate = useNavigate();

  function postData()
  {
    axios.post('http://localhost:5001/createPatient',formData)
    .then(response => {
      console.log(response);
      navigate('/home')
    })
    .catch(error => {
      console.log(error);
    });
  }


  return (
    <div className="regis-body">
      <h1>Fill Personal Details</h1>
      <br></br><br></br>
      <div class="text-field">
      <input type='text' onChange={(e)=>setFormData({...formData, First_name : e.target.value})} value={formData.First_name} placeholder="Enter your name" /><br></br>
      <input type='date' onChange={(e)=>setFormData({...formData, Dob : e.target.value})} value={formData.Dob} placeholder="Date of Birth"/><br></br>
      <input type='text' onChange={(e)=>setFormData({...formData, Gender : e.target.value})} value={formData.Gender} placeholder="Gender"/><br></br>
      <input type='text' onChange={(e)=>setFormData({...formData, address : e.target.value})} value={formData.address} placeholder="address"/><br></br>
      <input type='email' onChange={(e)=>setFormData({...formData, email : e.target.value})} value={formData.email} placeholder="email"/><br></br>
      <input type='text' onChange={(e)=>setFormData({...formData, Blood_group : e.target.value})} value={formData.Blood_group} placeholder="Blood group"/><br></br>
      <input type='text' onChange={(e)=>setFormData({...formData, Chronic_Medical_Conditions : e.target.value})} value={formData.Chronic_Medical_Conditions} placeholder="Chronic Medical Conditions"/><br></br>
      <input type='text' onChange={(e)=>setFormData({...formData, Long_term_ongoing_Medication : e.target.value})} value={formData.Long_term_ongoing_Medication} placeholder="Long term ongoing medication"/>
      </div>
      <br></br><br></br>
      <button onClick={()=>postData()}>Submit</button>
    </div>
  );
};

export default UserForm;