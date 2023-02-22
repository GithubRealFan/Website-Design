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


export default function SignIn({ closePopup, employees, setIsAuthenticated, setUserNameNew }) {

    const [alarm, setAlarm] = useState('');
    const [alarmState, setAlarmState] = useState(false);
    const [passWordCheck, setPassWordCheck] = useState(false);
    const [userName, setUserName] = useState('');
    const [profileCheck, setProfileCheck] = useState(false);

    const profileValidCheck = e => {
        e.preventDefault();
        const {name, value} = e.target;

        let employee = employees.filter(employee => employee.email === value);
        let user_email = 0;
        if (employee.length == 0) {
            employee = employees.filter(employee => employee.userName === value);
            if (employee.length == 0) {
                setProfileCheck(false);
                setAlarmState(false);
                setAlarm('Please enter the correct username or email.')
            } else {
                user_email = 0;
            }
        } else {
            user_email = 1;
        }
        if (employee[0].available) {
            setProfileCheck(true);
            setAlarmState(true);
            setUserName(employee[0].userName);
            user_email ? setAlarm('Correct email address.') : setAlarm('Correct username.');
        } else {
            setProfileCheck(false);
            setAlarmState(false);
            setAlarm('This account has been closed.')
        }
    }

    const passwordValidCheck = e => {
        e.preventDefault();
        const {name, value} = e.target;

        if (!profileCheck) {
            setPassWordCheck(false);
            setAlarmState(false);
            setAlarm('Please enter the correct profile.');
        } else {
            const employee = employees.filter(employee => employee.userName === userName);
            if (employee.length > 0) {
                if (value === employee[0].password) {
                    setPassWordCheck(true);
                    setAlarmState(true);
                    setAlarm('Correct profile and password.');
                } else {
                    setPassWordCheck(false);
                    setAlarmState(false);
                    setAlarm('Incorrect password.');
                }
            }
        }
    }

    const signInHandle = () => {
        if (profileCheck && passWordCheck) {
            closePopup();
            setIsAuthenticated(true);
            setUserNameNew(userName);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('userName', userName);
        } else {
            setAlarmState(false);
            setAlarm('Please enter the correct profile and password.');
        }
    }

    return (
        <div className="popup-container">
         <div className="popup-body signInPop">
            <p>Welcome to my website.<br></br>Please try to sign in!</p>
            <p style={emailfont}>Enter your email or username</p>
            <div>
                {profileCheck ? <span style={checkPass}>✓</span> : <span style={rightArrow}>→</span>}
                <input className={styles.inputtext} type="text" name="email" spellCheck="false" onChange={(e) => profileValidCheck(e)}/>
                <span style={{margin: '10px'}}></span>
            </div>
            <p style={emailfont}>Enter password</p>
            <div>
                {passWordCheck ? <span style={checkPass}>✓</span> : <span style={rightArrow}>→</span>}
                <input className={styles.inputtext} type="password" name="password" spellCheck="false" autoComplete="false" onChange={(e) => passwordValidCheck(e)}/>
                <span style={{margin: '10px'}}></span>
            </div>
            <div style={{height : '4px'}}></div>
            <p style={alarmState ? {paddingLeft : '7px', display: 'block', height : '20px', color : '#20BB30'} : {paddingLeft : '7px', display: 'block', height : '20px', color : '#AA2222'}}>{alarm}</p>
            <div style={{height : '15px'}}></div>
            <div>
                <span style={{margin : '20px'}}></span>
                <button className={styles.buttonstyle + ' , ' + styles.bluebutton} onClick={signInHandle}>SignIn</button>
                <span style={{margin : '30px'}}></span>
                <button className={styles.buttonstyle} onClick={closePopup}>Close</button>
            </div>
         </div>
        </div>
      );
}