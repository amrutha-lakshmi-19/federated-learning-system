import React from "react";
import { useNavigate } from "react-router-dom";
import { FiServer } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";
import Navbar from "../components/navbar";
import "../styles/main.css";
import federatedImg from "./federated.png";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="hero-section">
        <div className="hero-text">
          <h1>Federated Learning System</h1>
          <p>
            Privacy-Preserving Federated Learning System
          </p>
        </div>

        <img
  src={federatedImg}
  alt="Federated Architecture"
  className="hero-image"
/>
      </div>

      <div className="card-container">

        <div className="card admin" onClick={() => navigate("/admin")}>
          <FiServer size={45} />
          <h3>Admin Server</h3>
          <p>Global Model Aggregation</p>
        </div>

        <div className="card hospital a" onClick={() => navigate("/client/1")}>
          <MdLocalHospital size={45} />
          <h3>Hospital A</h3>
          <p>Client 1</p>
        </div>

        <div className="card hospital b" onClick={() => navigate("/client/2")}>
          <MdLocalHospital size={45} />
          <h3>Hospital B</h3>
          <p>Client 2</p>
        </div>

        <div className="card hospital c" onClick={() => navigate("/client/3")}>
          <MdLocalHospital size={45} />
          <h3>Hospital C</h3>
          <p>Client 3</p>
        </div>

      </div>

      <p className="privacy-text">
        Raw patient data never leaves hospitals — only model updates are shared.
      </p>
    </>
  );
}
