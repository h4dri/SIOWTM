import React, { useContext, useEffect, useState } from 'react';
import '../styles/Login.css';
import userSvg from '../resources/user.svg';
import Header from './Header';
import { RootStoreContext } from '../stores/RootStore';
import { IUserFromValues } from '../models/UserModel';

function Login() {
    const rootStore = useContext(RootStoreContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isdoctor, setIsDoctor] = useState(false);

    const values: IUserFromValues = {
        email: login,
        password: password
    };

    useEffect(() => {
        const token = window.localStorage.getItem('jwt');
        console.log(token)
        token === "null" ? console.log("logowanie") : window.open("/customerPanel", "_self")
    }, []);

    function handleChangeLogin(event: React.ChangeEvent<HTMLInputElement>) {
        setLogin(event.target.value);
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); 
        rootStore.userStore.login(values).catch(error => {
            setErrorText("Dane niepoprawne!")
        })
        setErrorText("");
    }

    function checkButtonStatus() {
        if (login !== '' && password !== '') setButtonStatus(false);
        else setButtonStatus(true);
    }

    function validate(event: React.KeyboardEvent<HTMLDivElement>){
        checkButtonStatus();
    }

    return (
        <>
            <Header />
            <div id="login" onKeyUp={validate}>
                <div id="loginImg">
                    <img src={userSvg} alt="User SVG" />
                </div>
                <div id="loginForm">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>Login:</p>
                            <div id="loginInput">
                                <input type="text" value={login} onChange={handleChangeLogin} />
                            </div>
                            <p>Hasło:</p>
                            <div id="loginInput">
                                <input type="password" value={password} onChange={handleChangePassword} />
                            </div>
                            <p style={{ color: '#FF0000' }}>{errorText}</p>
                        </label>
                        <div id="loginButton">
                            <input type="submit" value="Zaloguj" disabled={buttonStatus} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;