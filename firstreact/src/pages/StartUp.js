import styles from '../style.module.css';
import { Navigate } from 'react-router-dom';
import { Component } from 'react';
import React from 'react'

export default class StartUp extends Component {

    constructor(props){
        super()
        this.state = {isTimeOut:false};
    }
    
    componentDidMount(){
        this.timeoutHandle = setTimeout(()=>{
            this.setState({isTimeOut:true})
            console.log('12000');
        }, 12000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
    }

    render() {
        return (
            !this.state.isTimeOut ? 
            <div className = {styles.background}>
                <div className = {styles.startup}>
                    <span></span>
                </div>
            </div> 
            : 
            <Navigate to="/FirstPage"></Navigate>
        );
    }
}
