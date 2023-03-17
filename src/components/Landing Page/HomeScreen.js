import React from "react";
import doctors from "../../assets/doctors.png";
import wave from "../../assets/wave.png";
// import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
	// const navigate = useNavigate();
	return (
		<>
			<div className="home-screen">
				<div className="header">
					<div className="left-nav">
						<img
							src={require("../../assets/Logo.png")}
							className="logo"
							alt=""></img>
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/">Our Service</a>
							</li>
							<li>
								<a href="/">Our Doctors</a>
							</li>
							<li>
								<a href="/">Pricing Plan</a>
							</li>
							<li>
								<a href="/">About</a>
							</li>
						</ul>
						<button className="signup" onClick={() => console.log("hello")}>
							Sign Up
						</button>
					</div>
					<div className="right-nav"></div>
				</div>
				<div className="main-div">
					<div className="main-title">
						<span>
							Welcome to <p className="notpara">MedBook</p>
						</span>
						<p style={{ fontSize: "40px" }}>
							Book your appointments from the comfort of your home.
						</p>
					</div>
					<img src={doctors} alt="" style={{ width: "800px" }} />
				</div>
				<div className="stats">
					<p className="text-stats">
						150+<span>Doctors</span>
					</p>
					<p className="text-stats">
						150+<span>Doctors</span>
					</p>
					<p className="text-stats">
						150+<span>Doctors</span>
					</p>
					<p className="text-stats">
						150+<span>Doctors</span>
					</p>
				</div>
			</div>
		</>
	);
}
