import styles from '../style.module.css';
import homeicon from '../img/home.png';
import aboutmeicon from '../img/aboutme.png';
import contacticon from '../img/contact.png';
import React from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';


function Header({ isAuthenticated, userName, setSignUp, setSignIn, profile, setProfile }) {
      
    const handleClicked = e => {
        e.preventDefault();
        Swal.fire({
            icon: 'info',
            title: 'Please Sign Up!',
            text : 'You should sign up to my website. Please click sign up button.',
            showConfirmButton: true,
            confirmButtonColor: '#30303030',
            background : '#000000A0',
            color: '#FFFFFF',
        });
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.width100}>
                <div className={styles.headerspace}></div>
                <div className={styles.headericon}>
                    <div className={styles.headerfrontspace}></div>
                    <Link to="/" className={styles.headerlink + ' ' + styles.headerleft}>
                        <img src={homeicon} alt="Home" width="26" height="20"></img>
                        <span>Home</span>
                    </Link>
                    <Link onClick={handleClicked} className={styles.headerlink + ' ' + styles.headerleft}>
                        <img src={aboutmeicon} alt="MyInfo" width="24" height="20"></img>
                        <span>My Info</span>
                    </Link>
                    <Link onClick={handleClicked} className={styles.headerlink + ' ' + styles.headerleft}>
                        <img src={contacticon} alt="Contact" width="24" height="20"></img>
                        <span>Contact</span>
                    </Link>
                    <div className={styles.headerspace}></div>
                    <Link onClick={() => setSignUp(true)} className={styles.headerlink + ' ' + styles.headerright + ' ' + styles.headersignup}>
                        <span>Sign Up</span>
                    </Link>
                    <Link onClick={() => setSignIn(true)} className={styles.headerlink + ' ' + styles.headerright}>
                        <span>Sign In</span>
                    </Link>
                    <div className={styles.headerendspace}></div>
                </div>
            </div>
        );
        } else {
            return (
                <div className={styles.width100}>
                    <div className={styles.headerspace}></div>
                    <div className={styles.headericon}>
                        <div className={styles.headerfrontspace}></div>
                        <Link to="/" className={styles.headerlink + ' ' + styles.headerleft}>
                            <img src={homeicon} alt="Home" width="26" height="20"></img>
                            <span>Home</span>
                        </Link>
                        <Link onClick={handleClicked} className={styles.headerlink + ' ' + styles.headerleft}>
                            <img src={aboutmeicon} alt="MyInfo" width="24" height="20"></img>
                            <span>My Info</span>
                        </Link>
                        <Link onClick={handleClicked} className={styles.headerlink + ' ' + styles.headerleft}>
                            <img src={contacticon} alt="Contact" width="24" height="20"></img>
                            <span>Contact</span>
                        </Link>
                        <div className={styles.headerspace}></div>
                        <Link onClick={() => setProfile(!profile)} className={styles.headerlink + ' ' + styles.headerright + ' ' + styles.headersignup}>
                            <span>{userName}</span>
                        </Link>
                        <div className={styles.headerendspace}></div>
                    </div>
                </div>
            );
        }
}

export default React.memo(Header);
