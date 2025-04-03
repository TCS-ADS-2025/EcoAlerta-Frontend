import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Adm from './components/adm-page/Adm'
import Coment from './components/coment-page/coment'
import Home from './components/home-page/Home'
import Login from './components/login-page/Login'
import Register from './components/register-page/register'
import Timeline from './components/timeline-page/timeline'


function App() {
  return (
    <>
    
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/register'>Cadastro</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/T3l4d0@dm'>Adm</Link>
          </li>
          <li>
            <Link to='/coment'>Comentário</Link>
          </li>
          <li>
            <Link to='/timeline'>Cronograma</Link>
          </li>
        </ul>
      </nav>
    </div>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/T3l4d0@dm' element={<Adm/>}></Route>
      <Route path='/coment' element={<Coment/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/timeline' element={<Timeline/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  </>
  )
}

export default App
