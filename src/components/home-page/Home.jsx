import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../../service/auth";
import Header from "../Header/Header";
import Footer from "../footer/Footer";

import "./Home.css"

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        <h1>Home</h1>
        <Button onClick={handleLogout}>Sair</Button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
