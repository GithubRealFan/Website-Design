import React, { useState, useEffect } from 'react';
import myPhoto from '../img/me.jpg';
import styles from '../style.module.css';
import Header from '../components/Header';
import Bottom from '../components/Bottom'
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Profile from '../components/Profile';
import { employeesData } from '../data';

const photoStyle = {
    width: '240px',
    height: '240px',
    borderRadius : '120px',
    position: 'absolute',
    top: '120px',
    left: '40px',
    margin: '10px'
}

const wordstyle1 = {
    fontSize : '43pt',
    color : '#FF4444BF',
    paddingLeft : 'max(300px, calc(50vw - 300px))',
    textAlign : 'left',
}

const contentStyle1 = {
    fontSize : '22pt',
    color : '#BBBBBB',
    position : 'absolute',
    left : '60px',
    top : '380px',
    textAlign : 'left',
}

const contentStyle2 = {
    fontSize : '14pt',
    color : '#BBBBBB',
    position: 'absolute',
    left : '60px',
    top : '440px',
    textAlign : 'left',
    width : '300px',
}


export default function FirstPage() {

    const [employees, setEmployees] = useState(employeesData);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userName, setUserName] = useState('');
    const [signUp, setSignUp] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [profile, setProfile] = useState(false);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('isAuthenticated'));
// /        setIsAuthenticated(false);
        setUserName(localStorage.getItem('userName'));
        const data = JSON.parse(localStorage.getItem('employees_data'));
        if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
    }, []);

    function onBodyClick(e) {
        console.log(e);
        
    }

    return (
        <div className={styles.background_move}>
            <div className={styles.headerstyle}>
               <Header isAuthenticated={isAuthenticated} userName={userName} setSignUp={setSignUp} profile={profile} setSignIn={setSignIn} setProfile={setProfile} />
            </div>
            <div className={styles.sectionstyle} onClick={(e) => onBodyClick(e)}>
                <img src={myPhoto} alt="Your Face" style={photoStyle} />
                {signUp ? <SignUp closePopup={() => setSignUp(false)} employees={employees} setEmployees={setEmployees} setIsAuthenticated={setIsAuthenticated} setUserNameNew={setUserName}/> : null}
                {signIn ? <SignIn closePopup={() => setSignIn(false)} employees={employees} setIsAuthenticated={setIsAuthenticated} setUserNameNew={setUserName}/> : null}
                {profile ? <Profile closePopup={() => setProfile(false)} profile={profile} employees={employees} setIsAuthenticated={setIsAuthenticated} setUserNameNew={setUserName} userName={userName}/> : null}
                <p style={wordstyle1}>Welcome To My Website!{profile}</p>
                <p style={contentStyle1}>Melvin Lang</p>
                <p style={contentStyle2}>World Scaled Pro, Software & AI Engineer, Blockchain & Trading</p>
            </div>
            <div className={styles.headerstyle}>
                <Bottom/>
            </div>
        </div>
    );
}