import React from "react";
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../about/About";
import Adm from "../adm-page/Adm";
import Home from "../home-page/Home";
import Login from "../login-page/Login";
import Register from "../register-page/Register";
import Timeline from "../timeline-page/Timeline";
import Coment from '../coment-page/Coment';

const AppRoutes = (): ReactElement => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/T3l4d0@dm" element={<Adm />} />
        <Route path="/coment" element={<Coment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
  );
};

export default AppRoutes;
