import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { logout } from '../../service/auth';
const Home = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Início</h1>
      <Button onClick={handleLogout}>Sair</Button>
    </div>
  );
};

export default Home