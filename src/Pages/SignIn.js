import React, { useState, useEffect } from 'react'
import { auth } from './firebase';
import styles from '../static/SignIn.module.css';
import { Link, useNavigate } from "react-router-dom";

import {
    // createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    // signOut,
  } from "firebase/auth";


export default function SignIn(){

    const [user, setUser] = useState({});
    const history = useNavigate();


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
        // Notice the empty dependency array, there to make sure the effect is only run once when the component mounts
      }, []) 

    
    // const goBack =  () => {
    //         history.push('/')
    //       };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async() => {
        try {
            const user = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            history('/')
          } catch (error) {
              console.log(error)
            if (password.length < 6){
                alert('Password should be at least 6 characters!')
            }
            else if(!email | !password) {
                alert('Please fill out all forms')
                
            } else{
                alert('Please recheck the email and password!')
            }
          }
        }

    return(
        <div className={styles.main}>
            <div className={styles.center}>
                <h1>Login</h1>
                <div className={styles.form}>
                    <div className={styles.txt_field}>
                        <input type="text" id='text' name='text' value={email} onChange={e => setEmail(e.currentTarget.value)} required/>
                        <span></span>
                        <label>Email ID</label>
                    </div>
                    <div className={styles.txt_field}>
                        <input type="password" id='password' name='password' value={password} onChange={e => setPassword(e.currentTarget.value)} required/>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Login"  onClick={signIn}/>
                    <div className={styles.signup_link}>
                        Not a member? <Link to="/signup">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}