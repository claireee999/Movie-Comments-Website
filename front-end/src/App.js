import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes, Switch} from "react-router-dom";
import MainPage from './pages/MainPage';
import CommentPage from './pages/CommentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from "./pages/UserPage";
function App() {
    const [username, setUsername] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<MainPage username={username} setUsername={setUsername} />}
                />
                <Route path="/comments" element={<CommentPage />} />
                <Route
                    path="/login"
                    element={<LoginPage username={username} setUsername={setUsername} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
