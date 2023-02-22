import React, { useState, useRef, useEffect } from "react";
import "./Popup.css";
import styles from '../style.module.css';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const signedin = {
    paddingLeft : '20px',
    fontSize : '13pt',
    marginTop : '0px',
    paddingTop : '10px',
}

function Profile({ closePopup, setIsAuthenticated, profile, userName}) {
    const popupRef = useRef(null);

    const handleClick = (e) => {
        if (profile && popupRef.current !== null && !popupRef.current.contains(e.target)) {
            console.log(!popupRef.current.contains(e.target), profile);
           closePopup(true);
        }
    }

    const yourinfoHandle = (e) => {

    }

    const changePasswordHandle = (e) => {

    }

    const signOutHandle = (e) => {
        setIsAuthenticated(false);
        closePopup();
    }

    return (
        <div className="popup-container" onClick={(e) => {handleClick(e)}}>
            <div className="popup-body profilePop" ref={popupRef}>
                <p style={signedin}>Siged in {userName}</p>
                <button className="popfilebutton" onClick={yourinfoHandle}>Your information</button>
                <button className="popfilebutton" onClick={changePasswordHandle}>Change password</button>
                <button className="popfilebutton" onClick={signOutHandle}>Sign out</button>
            </div>
        </div>
    );
}


export default React.memo(Profile);