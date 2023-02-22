import React, { useState, useRef } from "react";
import "./Popup.css";
import styles from '../style.module.css';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


const emailfont = {
    color : '#BFDFFF',
    fontSize : '14pt',
    marginBottom : '7px',
    display: 'inline-block',
};

const rightArrow = {
    fontSize : '14pt',
    float: 'left',
    width : '20px',
    color : '#ea4aaa',
    userSelect : 'none',
};

const checkPass = {
    fontSize : '14pt',
    float: 'left',
    width : '20px',
    color : '#2da44e',
    userSelect : 'none',
}

export default function SignUp({ closePopup, employees, setEmployees, setIsAuthenticated, setUserNameNew }) {
    const form = useRef();

    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [password, setPassword] = useState('');
    const [passWordCheck, setPassWordCheck] = useState(false);
    const [passWordConfigCheck, setPassWordConfigCheck] = useState(false);
    const [userName, setUserName] = useState('');
    const [userNameCheck, setUserNameCheck] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [verifyCodeCheck, setVerifyCodeCheck] = useState(false);
    const [alarm, setAlarm] = useState('');
    const [alarmState, setAlarmState] = useState(false);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const emailValidCheck = e => {
        e.preventDefault();
        const {name, value} = e.target;
        var state = isValidEmail(value);
        if (state) {
            const employee = employees.filter(employee => employee.email === value);
            if (employee.length > 0) {
                state = false;
                setAlarm('This email has already signed up!')
            } else {
                setAlarm('Valid email address!');
                setEmail(value);
            }
        } else {
            setAlarm('Invalid email address!')
        }
        setAlarmState(state);
        setEmailCheck(state);
    };

    const passwordValidCheck = e => {
        e.preventDefault();
        const {name, value} = e.target;
        const state = value.length >= 8 && /[A-Z]/.test(value) && /[^a-zA-Z]/.test(value) && /[0-9]/.test(value);
        if (!state) {
            if (value.length < 8) setAlarm('The length must be more than 8!')
            else setAlarm('Password should contain digits, upper and lowercases!')
        } else {
            setAlarm('Strong password!');
            setPassword(value);
        }
        setAlarmState(state);
        setPassWordCheck(state);
    };

    const passwordConfigCheck = e => {
        e.preventDefault();
        const {name, value} = e.target;
        var state = false;
        if (!passWordCheck) setAlarm('Weak Password!');
        else if (value === password) { setAlarm('Correct password!'); state = true;}
        else setAlarm('Wrong Password!');
        setAlarmState(state);
        setPassWordConfigCheck(state);
    };

    const userNameValidCheck = e => {
        e.preventDefault();
        const {name, value} = e.target;
        if (value.length === 0) {
            setAlarm('');
            setAlarmState(false);
            setUserNameCheck(false);
            return;
        }
        const res = /^[a-zA-Z0-9]+$/.exec(value);
        const valid = !!res;

        if (!valid) {
            setAlarm('Username should only contain alphanumeric characters and digits');
            setAlarmState(false);
            setUserNameCheck(false);
            return;
        }

        const employee = employees.filter(employee => employee.userName === value);
        if (employee.length > 0) {
            setAlarm('This username has already signed up!')
            setAlarmState(false);
            setUserNameCheck(false);
        } else {
            setAlarm('Valid username!');
            setUserName(value);
            setAlarmState(true);
            setUserNameCheck(true);
        }
    }

    const sendCode = () => {
        var code = "";
        for (var i = 0; i < 20; i++) {
            code = code + Math.floor(Math.random() * 10);
        }
        setVerifyCode(code);
        console.log(code);
//        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY');
    };

    const verifyCodeValidCheck = e => {
        e.preventDefault();
        const {name, value} = e.target;
        if (value === verifyCode) {
            setAlarm('Correct Code!');
            setAlarmState(true);
            setVerifyCodeCheck(true);
        } else {
            setAlarm('Incorrect Code!');
            setAlarmState(false);
            setVerifyCodeCheck(false);
        }
    }

    const signUpHandle = () => {
        if (emailCheck && passWordCheck && passWordConfigCheck && userNameCheck && verifyCodeCheck) {
            const newEmployee = {
                userName,
                password,
                email,
                available : true,
            };
            var employees2 = employees;
            employees2.push(newEmployee);
            localStorage.setItem('employees_data', JSON.stringify(employees));
            setEmployees(employees);
            closePopup();
            
            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text : 'You have successfully signed up to my homepage. Thank you!',
                showConfirmButton: true,
                confirmButtonColor: '#30303030',
                background : '#000000A0',
                color: '#FFFFFF',
            });
            
            setIsAuthenticated(true);
            setUserNameNew(userName);

            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('userName', userName);
        } else {
            setAlarm('Please check all requirements!');
            setAlarmState(false);
        }
    }

    return (
        <div className="popup-container">
         <div className="popup-body signUpPop">
            <p>Welcome to my website.<br></br>Please try to creat a new profile and sign up!</p>
            <div style={{minHeight : '01px'}}></div>
            <p style={emailfont}>Enter your email</p>
            <div>
                {emailCheck ? <span style={checkPass}>✓</span> : <span style={rightArrow}>→</span>}
                <input className={styles.inputtext} type="text" name="email" spellCheck="false" autoComplete="false" onChange={(e) => emailValidCheck(e)}/>
                <span style={{margin: '10px'}}></span>
            </div>
            <p style={emailfont}>Enter password</p>
            <div>
                {passWordCheck ? <span style={checkPass}>✓</span> : <span style={rightArrow}>→</span>}
                <input className={styles.inputtext} type="password" name="password" spellCheck="false" autoComplete="false" onChange={(e) => passwordValidCheck(e)}/>
                <span style={{margin: '10px'}}></span>
            </div>
            <p style={emailfont}>Password Configuration</p>
            <div>
                {passWordConfigCheck ? <span style={checkPass}>✓</span> : <span style={rightArrow}>→</span>}
                <input className={styles.inputtext} type="password" name="passwordConfig" spellCheck="false" autoComplete="false" onChange={(e) => passwordConfigCheck(e)}/>
                <span style={{margin: '10px'}}></span>
            </div>
            <p style={emailfont}>Enter username</p>
            <div>
                {userNameCheck ? <span style={checkPass}>✓</span> : <span style={rightArrow}>→</span>}
                <input className={styles.inputtext} type="text" name="userName" spellCheck="false" onChange={(e) => userNameValidCheck(e)}/>
                <span style={{margin: '10px'}}></span>
            </div>
            <div>
                <p style={emailfont}>Enter verification code</p>
                <span style={{margin : '30px'}}/>
                <button className={styles.linkbutton} onClick={sendCode}>Send Code</button>
            </div>
            <div>
                {verifyCodeCheck ? <span style={checkPass}>✓</span> : <span style={rightArrow}>→</span>}
                <input className={styles.inputtext} type="number" name="code" spellCheck="false" onChange={(e) => verifyCodeValidCheck(e)}/>
                <span style={{margin: '10px'}}></span>
            </div>
            <div style={{height : '12px'}}></div>
            <p style={alarmState ? {paddingLeft : '7px', display: 'block', height : '20px', color : '#20BB30'} : {paddingLeft : '7px', display: 'block', height : '20px', color : '#AA2222'}}>{alarm}</p>
            <div style={{height : '15px'}}></div>
            <div>
                <span style={{margin : '20px'}}></span>
                <button className={styles.buttonstyle + ' , ' + styles.bluebutton} onClick={signUpHandle}>SingUp</button>
                <span style={{margin : '30px'}}></span>
                <button className={styles.buttonstyle} onClick={closePopup}>Close</button>
            </div>
         </div>
        </div>
      );
};