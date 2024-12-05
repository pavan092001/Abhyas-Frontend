import { useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Calendar from './components/Calendar'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionTaskItem from './components/QuestionTaskItem'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Error from './pages/Error'

function App() {

  return (
    
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<LoginPage/>}/>
         <Route path='/signup' element={<SignUpPage/>}/>
         <Route path='*' element={<Error/>}/>
       </Routes>
    </BrowserRouter>
   
  )
}

export default App
