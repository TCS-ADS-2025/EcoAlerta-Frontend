import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../about/About";
import Home from "../home-page/Home";
import Login from "../login-page/Login";
import Register from "../register-page/Register";
import Timeline from "../timeline-page/Timeline";
import Coment from "../coment-page/Coment";
import User from "../user-page/User";

const AppRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/comentario" element={<Coment />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/cronograma" element={<Timeline />} />
      <Route path="/login" element={<Login />} />
      <Route path="/conscientizacao" element={<Home />} />
      <Route path="/perfil" element={<User />} />
    </Routes>
  );
};

export default AppRoutes;
