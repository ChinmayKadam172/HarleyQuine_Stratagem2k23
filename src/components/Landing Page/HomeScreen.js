import React from "react";
// import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  // const navigate = useNavigate();
  return (
    <>
      <div className="home-screen">
        <div className="header">
          <div className="left-nav">
            <img src={require("../../assets/Logo.png")} className="logo"></img>
            <ul>
              <li><a>Home</a></li>
              <li><a>Our Service</a></li>
              <li><a>Our Doctors</a></li>
              <li><a>Pricing Plan</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
          <div className="right-nav">
            
          </div>
        </div>
      </div>
    </>
  );
}
