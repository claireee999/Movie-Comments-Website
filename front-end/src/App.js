import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from './pages/MainPage';
import CommentPage from './pages/CommentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/comments' element={<CommentPage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/register' element={<RegisterPage/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
