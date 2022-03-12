import '../style/registration.css'
import React from "react";
import {loginAction} from "../store/userReduser";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

export default function Login() {

    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })


    function login(event) {
        event.preventDefault()
        dispatch(loginAction(formData));
    }

    return (
        <div className="registration-container">
            <div className="reg-form">
                <h1>Start your <br/>brewing journey</h1>
                <form className="login-form" onSubmit={login}>
                    <label htmlFor="username">Username</label><br/>
                    <input
                           type="text"
                           name="username"
                           value={formData.username}
                    /><br/>
                        <label htmlFor="password">Password</label><br/>
                        <input
                            type="password" name="password" value={formData.password}/>
                    <br/>
                    <Link to="/main">
                    <button type="submit" className="main-button">
                                LOG IN
                            </button>
                    </Link>
                </form>
                <div className="sign-container">
                    <p>Don't have an account?</p> <br/>
                    <button className="secondary-button">SIGN UP</button>
                </div>
            </div>
        </div>
);
}