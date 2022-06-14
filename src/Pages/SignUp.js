import React, { useState, useEffect } from 'react'
import { db, auth } from './firebase';
import styles from '../static/SignUp.module.css';
import { Link } from "react-router-dom";

import {
    createUserWithEmailAndPassword,
    // signInWithEmailAndPassword,
    onAuthStateChanged,
    // signOut,
  } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';


export default function SignUp(){

    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
        // Notice the empty dependency array, there to make sure the effect is only run once when the component mounts
      }, []) 

    const history = useNavigate();

    // const goBack =  () => {
    //     history('/')
    //   };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [userType, setUserType] = useState('');


    const signUpFunction = async() => {
        try {
            const user = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            // if (userType==='Donor'){
                const addTheTask = async() => {
                    const addTask = await setDoc(doc(db, "users", auth.currentUser.uid), {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        userType: userType,
                        uid: auth.currentUser.uid,
                    })
                }
                addTheTask();
            // } else{
            //     const addTheTask = async() => {
            //         const addTask = await setDoc(doc(db, "ngos", firstName), {
            //             email: email,
            //             firstName: firstName,
            //             lastName: lastName,
            //             phoneNumber: phoneNumber,
            //             userType: userType,
            //             uid: auth.currentUser.uid,
            //         })
            //     }
            //     addTheTask();
            // }
                
            history('/home')

          } catch (error) {
              console.log(error)
            if (password.length < 6){
                alert('Password should be at least 6 characters!')
            }
            else if(!email | !password) {
              alert('Please fill out all forms')
              
          }
          }
        }

    return(
        <div className={styles.main}>
            <div className={styles.center}>
            <h1>Sign Up</h1>
            <div className={styles.form}>
           

            <div className={styles.txt_field}>
                <input type="text" name='text' value={firstName} onChange={e => setFirstName(e.currentTarget.value)} required/>
                <span></span>
                <label>First Name</label>
            </div>

            <div className={styles.txt_field}>
                <input type="text" name='text' value={lastName} onChange={e => setLastName(e.currentTarget.value)} required/>
                <span></span>
                <label>Last Name</label>
            </div>

            <div className={styles.txt_field}>
                <input type="number" name='number' value={phoneNumber} onChange={e => setPhoneNumber(e.currentTarget.value)} required/>
                <span></span>
                <label>Phone Number</label>
            </div>

            <p>User Type:</p>

            <form className={styles.dropdown}>
                {/* <button className={styles.dropbtn}>Dropdown</button> */}
                <input list="userTypeList" type='text' className={styles.dropbtn} value={userType} onChange={e => setUserType(e.currentTarget.value)} required/>

                {/* <div className={styles.dropdownContent}> */}
                            <datalist id="userTypeList">
                            <option value="Donor"></option>
                            <option value="NGO"></option>
                            </datalist>

                            {/* <button type="submit"><i class="fa fa-search"></i></button> */}

                {/* </div> */}
            </form>


            {/* <form className={styles.donorItems}>
                        <input list="ngoList" type='text' placeholder="Choose an NGO..."/>
                            <datalist id="ngoList">
                            <option value="Earth Saviours"></option>
                            <option value="Goonj"></option>
                            </datalist>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form> */}

            <div className={styles.txt_field}>
                <input type="text" name='text' value={email} onChange={e => setEmail(e.currentTarget.value)} required/>
                <span></span>
                <label>Email ID</label>
            </div>
            <div className={styles.txt_field}>
                <input type="password" name='password' value={password} onChange={e => setPassword(e.currentTarget.value)} required/>
                <span></span>
                <label>Password</label>
            </div>
            {/* <div className={styles.pass}>Forgot Password?</div> */}
            <input onClick={signUpFunction} type="submit" value="Sign Up"/>
            <div className={styles.signup_link}>
                Already a member? <Link to="/signin">Sign In</Link>
            </div>
            </div>
        </div>
        </div>

    )
}


