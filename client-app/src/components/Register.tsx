import React, { useState } from 'react';
import '../styles/Register.css';
import userSvg from '../resources/user.svg';
import Header from './Header';

function Register(){
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [emailCorrect, setEmailCorrect] = useState(false);
    const [emailText, setEmailText] = useState('Wprowadź email.');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [passwordText, setPasswordText] = useState('Wprowadź hasło i jego potwierdzenie.');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberText, setPhoneNumberText] = useState('Wprowadź poprawny numer telefonu.');
    const [phoneNumberCorrect, setPhoneNumberCorrect] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pesel, setPesel] = useState('');
    const [peselText, setPeselText] = useState('Wprowadź poprawny pesel.');
    const [peselCorrect, setPeselCorrect] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [validationPasswordColor, setValidationPasswordColor] = useState('#ff0000');
    const [validationPeselColor, setValidationPeselColor] = useState('#ff0000'); 
    const [validationEmailColor, setValidationEmailColor] = useState('#ff0000');
    const [validationPhoneNumberColor, setValidationPhoneNumberColor] = useState('#ff0000');

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

    function handleChangeCheckPhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(event.target.value);
    }

    function handleChangeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value);
    }

    function handleChangeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value);
    }

    function handleChangePesel(event: React.ChangeEvent<HTMLInputElement>) {
        setPesel(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        alert(
            'Login: ' + login + '\n' +
            'Email: ' + email + '\n' +
            'Password: ' + password + '\n' +
            'CheckPassword: ' + checkPassword + '\n' +
            'PhoneNumber: ' + phoneNumber + '\n' +
            'Name: ' + firstName + '\n' +
            'LastName: ' + lastName + '\n' +
            'Pesel: ' + pesel
        );
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

    function checkPhoneNumberCorrect() {
        if (phoneNumber.length === 0) {
            setPhoneNumberText('Wprowadź poprawny numer telefonu.');
            setValidationPhoneNumberColor("#ff0000");
            setPhoneNumberCorrect(false);
        } 
        else if (phoneNumber.length !== 9) {
            setPhoneNumberText('Za mało znaków.');
            setValidationPhoneNumberColor("#ff0000");
            setPhoneNumberCorrect(false);
        }
        else {
            const expression = /^[0-9]{9}$/;
            if (expression.test(phoneNumber)) {
                setPhoneNumberText('Poprawnie wprowadzono numer telefonu.');
                setValidationPhoneNumberColor("#00ff00");
                setPhoneNumberCorrect(true);
            }
            else{
                setPhoneNumberText('Wprowadzono błędny numer telefonu.');
                setValidationPhoneNumberColor("#ff0000");
                setPhoneNumberCorrect(false);                
            }
        }
    }

    function checkPeselCorrect() {
        if (pesel.length === 0) {
            setPeselText('Wprowadź poprawny pesel.');
            setValidationPeselColor("#ff0000");
            setPeselCorrect(false);
        }
        else if (pesel.length !== 11) {
            setPeselText('Za mało znaków.');
            setValidationPeselColor("#ff0000");
            setPeselCorrect(false);
        }
        else {
            const peselArray = pesel.split('');
            const peselSum =
                parseInt(peselArray[0]) * 1 +
                parseInt(peselArray[1]) * 3 +
                parseInt(peselArray[2]) * 7 +
                parseInt(peselArray[3]) * 9 +
                parseInt(peselArray[4]) * 1 +
                parseInt(peselArray[5]) * 3 +
                parseInt(peselArray[6]) * 7 +
                parseInt(peselArray[7]) * 9 +
                parseInt(peselArray[8]) * 1 +
                parseInt(peselArray[9]) * 3 +
                parseInt(peselArray[10]) * 1;

            if (peselSum % 10 === 0) {
                setPeselText('Poprawnie wprowadzono pesel.');
                setValidationPeselColor("#00ff00");
                setPeselCorrect(true);
            }
            else {
                setPeselText('Wprowadzono błędny pesel.');
                setValidationPeselColor("#ff0000");
                setPeselCorrect(false);
            }
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
            phoneNumber !== '' &&
            phoneNumberCorrect === true &&
            firstName !== '' &&
            lastName !== '' &&
            pesel !== '' &&
            peselCorrect === true
        ) setButtonStatus(false);
        else setButtonStatus(true);
    }

    function validate(event: React.KeyboardEvent<HTMLDivElement>){
        checkPasswordCorrect();
        checkPhoneNumberCorrect();
        checkPeselCorrect();
        checkEmailCorrect();
        checkButtonStatus();
    }

    return (
        <>
            <Header />
            <div id="register" onKeyUp={validate}>
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
                                    <p>Numer telefonu:</p>
                                    <input type="text" value={phoneNumber} onChange={handleChangeCheckPhoneNumber} maxLength={9} />
                                    <i style={{ color: validationPhoneNumberColor }}>{phoneNumberText}</i>
                                </div>
                                <div id="registerInput">
                                    <p>Potwierdź hasło:</p>
                                    <input type="password" value={checkPassword} onChange={handleChangeCheckPassword} />
                                </div>
                                <div id="registerInput">
                                    <p>Pesel:</p>
                                    <input type="text" value={pesel} onChange={handleChangePesel} maxLength={11} />
                                    <i style={{ color: validationPeselColor }}>{peselText}</i>
                                </div>
                                <div id="registerInput">
                                    <p>Imię:</p>
                                    <input type="text" value={firstName} onChange={handleChangeFirstName} />
                                </div>
                                <div id="registerInput">
                                    <p>Nazwisko:</p>
                                    <input type="text" value={lastName} onChange={handleChangeLastName} />
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