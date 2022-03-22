import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchCoffee} from "./asyncActions/coffee";
import {Navbar} from "./containers/Navbar";
import {fetchUser} from "./asyncActions/users";
import Coffee from "./pages/Coffee";
import Brew from "./pages/Brew";

function App() {
    const dispatch = useDispatch();

       useEffect(() => {
           dispatch(fetchCoffee());
           dispatch(fetchUser("yanapush"))
       }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main" element={<div className="page-container"> <Navbar/> <Main/> </div>}/>
                <Route path="/brew" element={<div className="page-container"> <Navbar/> <Brew/> </div>}/>
                <Route path="/coffee/:id" element={<div className="page-container"> <Navbar/> <Coffee/> </div>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
