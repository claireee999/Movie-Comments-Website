import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from './pages/MainPage';
import CommentPage from './pages/CommentPage';
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/comments' element={<CommentPage/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
