import '../style/registration.css'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {postLogin, registerUser} from "../asyncActions/users";
import React, {useState} from 'react'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })

    const [isLogIn, setIsLogin] = useState(true);

    function login(event) {
        event.preventDefault();
        navigate("/main")
        dispatch(postLogin(formData));
    }

    function handleChange(event) {
        const {name, value} = event.target
       setFormData(prev => ({...prev, [name]: value}));
    }

    function register(event) {
        event.preventDefault();
        if (formData.password === formData.confirmPassword) {
            dispatch(registerUser(formData))
            navigate("/main");
        } else {
            console.log("passwords don't match")
        }
    }

    return (
        <div className="registration-container">
            <div className="reg-form">
                <h1>Start your <br/>brewing journey</h1>
                {isLogIn ? <form onSubmit={login}>
                    <table>
                        <tr>
                            <td>User:</td>
                            <td><input type='text' name='username' value={formData.username} onChange={handleChange}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type='password' name='password' value={formData.password} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><button name="submit" type="submit">submit</button></td>
                        </tr>
                    </table>
                </form> : <form onSubmit={register}>
                    <table>
                        <tr>
                            <td>Username:</td>
                            <td><input type='text' name='username' value={formData.username} onChange={handleChange}/></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><input type='email' name='email' value={formData.email} onChange={handleChange}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type='password' name='password' value={formData.password} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Confirm password:</td>
                            <td><input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><button name="submit" type="submit">submit</button></td>
                        </tr>
                    </table>
                </form>}
                <div className="sign-container">
                    <p>{isLogIn ? "Don't have an account?" : "Already have an account?"}</p> <br/>
                    <button onClick={() => setIsLogin(prev => !prev)} className="secondary-button">{isLogIn ? "SIGN UP" : "LOG IN"}</button>
                </div>
            </div>
        </div>
);
}
