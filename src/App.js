import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './style/App.css';
import Main from "./pages/Main";
import Login from "./pages/Login";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchCoffee} from "./asyncActions/coffee";
import {Navbar} from "./containers/Navbar";
import {fetchUser} from "./asyncActions/users";
import Coffee from "./pages/Coffee";

function App() {
    const dispatch = useDispatch();

       useEffect(() => {
           dispatch(fetchCoffee)
           dispatch(fetchUser("yanapush"))
       }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main" element={<div className="page-container"> <Navbar/> <Main/> </div>}/>
                <Route path="/coffee/:id" element={<div className="page-container"> <Navbar/> <Coffee/> </div>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
