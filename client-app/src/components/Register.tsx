import React, { useContext, useState } from 'react';
import '../styles/Register.css';
import userSvg from '../resources/user.svg';
import Header from './Header';
import { RootStoreContext } from '../stores/RootStore';
import { IUserFromValues } from '../models/UserModel';

function Register(){
    const rootStore = useContext(RootStoreContext);
    
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [emailCorrect, setEmailCorrect] = useState(false);
    const [emailText, setEmailText] = useState('Wprowadź email.');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [passwordText, setPasswordText] = useState('Wprowadź hasło i jego potwierdzenie.');
    const [displayName, setdisplayName] = useState('');
    const [buttonStatus, setButtonStatus] = useState(true);
    const [validationPasswordColor, setValidationPasswordColor] = useState('#ff0000');
    const [validationEmailColor, setValidationEmailColor] = useState('#ff0000');

    function handleChangeLogin(event: React.ChangeEvent<HTMLInputElement>) {
        setLogin(event.target.value);
    }

    function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleChangeCheckPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setCheckPassword(event.target.value);
    }

    function handleChangeDisplayName(event: React.ChangeEvent<HTMLInputElement>) {
        setdisplayName(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const userDataToRegister: IUserFromValues = {
            email: email,
            userName: login,
            displayName: displayName,
            password: password,
            isDoctor: false
        };
        rootStore.userStore.registerUser(userDataToRegister)
        event.preventDefault();
    }

    function checkPasswordCorrect() {
        if (password !== '' && checkPassword !== '') {
            if (password === checkPassword) {
                setPasswordText('Poprawnie wprowadzono hasła.');
                setValidationPasswordColor("#00ff00");
                setPasswordCorrect(true);
            }
            else if (password !== checkPassword) {
                setPasswordText('Hasła nie są jednakowe.');
                setValidationPasswordColor("#ff0000");
                setPasswordCorrect(false);
            }
        }
        else if (password !== '' && checkPassword === '') {
            setPasswordText('Wprowadź potwierdzenie hasła.');
            setValidationPasswordColor("#ff0000");
            setPasswordCorrect(false);
        }
        else if (password === '' && checkPassword !== '') {
            setPasswordText('Wprowadź hasło.');
            setValidationPasswordColor("#ff0000");
            setPasswordCorrect(false);
        }
        else {
            setPasswordText('Wprowadź hasło i jego potwierdzenie.');
            setValidationPasswordColor("#ff0000");
            setPasswordCorrect(false);
        }
    }

    function checkEmailCorrect() {
        const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email === ''){
            setEmailText('Wprowadź email.');
            setValidationEmailColor("#ff0000");
            setEmailCorrect(false);
        }
        else if (expression.test(email)) {
            setEmailText('Poprawnie wprowadzono email.');
            setValidationEmailColor("#00ff00");
            setEmailCorrect(true);
        }
        else {
            setEmailText('Wprowadzono błędny email.');
            setValidationEmailColor("#ff0000");
            setEmailCorrect(false);
        }
    }

    function checkButtonStatus() {
        if (
            login !== '' &&
            email !== '' &&
            emailCorrect === true &&
            password !== '' &&
            checkPassword !== '' &&
            passwordCorrect === true &&
            displayName !== ''
        ) setButtonStatus(false);
        else setButtonStatus(true);
    }

    function validate(event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>){
        checkPasswordCorrect();
        checkEmailCorrect();
        checkButtonStatus();
    }

    return (
        <>
            <Header />
            <div id="register" onKeyUp={validate} onClick={validate}>
                <div id="registerImg">
                    <img src={userSvg} alt="User SVG" />
                </div>
                <div id="registerForm">
                    <form onSubmit={handleSubmit}>
                        <div id="registerFormContent">
                            <label>
                                <div id="registerInput">
                                    <p>Login:</p>
                                    <input type="text" value={login} onChange={handleChangeLogin} />
                                </div>
                                <div id="registerInput">
                                    <p>Email:</p>
                                    <input type="email" value={email} onChange={handleChangeEmail} />
                                    <i style={{ color: validationEmailColor }}>{emailText}</i>
                                </div>
                                <div id="registerInput">
                                    <p>Hasło:</p>
                                    <input type="password" value={password} onChange={handleChangePassword} />
                                    <i style={{ color: validationPasswordColor }}>{passwordText}</i>
                                </div>
                                <div id="registerInput">
                                    <p>Potwierdź hasło:</p>
                                    <input type="password" value={checkPassword} onChange={handleChangeCheckPassword} />
                                </div>
                                <div id="registerInput">
                                    <p>Imię i nazwisko:</p>
                                    <input type="text" value={displayName} onChange={handleChangeDisplayName} />
                                </div>
                            </label>
                        </div>
                        <div id="registerButton">
                            <i>* wszystkie pola należy uzupełnić aby móc dokonać rejestracji</i>
                            <input type="submit" value="Zarejestruj" disabled={buttonStatus} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;