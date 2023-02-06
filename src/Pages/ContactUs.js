import { useState, useEffect, React } from "react";
import styles from '../static/ContactUs.module.css';

import { useNavigate,Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

import { db, collection, addDoc, auth, getDocs } from './firebase';

export default function ContactUs(){

    const [phoneNumber, setphoneNumber] = useState ('')
    const [contactName, setcontactName] = useState ('')
    const [email, setEmail] = useState ('')
    const [organizationName, setorganizationName] = useState ('')
    const history = useNavigate();


    const ngoSignUp = async() => {


        if(!phoneNumber | !contactName | !email | !organizationName) {
            alert('Please fill out all questions. Make sure to use only numbers in phone number!')
            return
        } else{
            try {

                const ngoSignUp1 = async() => {
                    const donateItem = await addDoc(collection(db, "ngoSignUp"), {
                        phoneNumber: phoneNumber,
                        contactName: contactName,
                        email: email,
                        organizationName: organizationName,

                    
                    })

                    history('/contactus2')

                }

        
                ngoSignUp1();
            
                
                // console.log(user);
            } catch (error) {
                console.log(error)
        
          }
        }
    }




    return(
        <div className={styles.main}>
            {/* <h1 className='homeHeading'>Hello</h1> */}
            <div className={styles.mainHeader}>
                            
                <div className={styles.navbar}>
                    <div className={styles.navbarContainer1}>
                        <img className='logo-image' src={logo} alt="helpinhands" height="300px"  ></img>
                    </div>
                    <div className={styles.navbarContainer2}>
                    <ul>
                        {/* <li><a className={styles.menuItem}><Link to="/" onClick={logout}>Log Out</Link></a></li> */}
                        {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                        {/* <li><a className={styles.menuItem}><Link to="/home">Contact</Link></a></li> */}
                        <li><a className={styles.menuItem}><Link to="/">Home Page</Link></a></li>



                    </ul>
                    </div>
                </div>
                <div className={styles.donationListHeaderboxContainer}>
                    <h1 className={styles.donationListHeaderboxContainerHeading}>Contact Us</h1>
                    <h2 className={styles.donationListHeaderboxContainerHeading}>Thank you for using our website!</h2>
                </div>
                
            </div>

            <div className={styles.hackerContainer}>
            <h1 className={styles.teamText}>Are you a NGO looking to join?</h1>
            <h1 className={styles.teamText}>Just fill the form below:</h1>
                
                {/* <p className={styles.hacker}><a href="mailto:helpinhandteam@gmail.com">helpinhandteam@gmail.com</a></p> */}
            
             </div>

   
            <div className={styles.form}>

                                
                         <div className={styles.txt_field}>
                            <input type="text" id='text' onChange={e => setorganizationName(e.currentTarget.value)} name='text' required/>
                            <span></span>
                            <label>Organization Name</label>
                        </div>

                        <div className={styles.txt_field}>
                            <input type="text" id='text' onChange={e => setcontactName(e.currentTarget.value)} name='text' required/>
                            <span></span>
                            <label>Contact Name</label>
                        </div>

                        <div className={styles.txt_field}>
                            <input type="text" id='text' onChange={e => setEmail(e.currentTarget.value)} name='text' required/>
                            <span></span>
                            <label>Email</label>
                        </div>

                        <div className={styles.txt_field}>
                            <input type="number" id='number' onChange={e => setphoneNumber(e.currentTarget.value)} name='number' required/>
                            <span></span>
                            <label>Phone Number</label>
                        </div>

                 
                        <div className={styles.buttonContainer1}>
                    {/* <button className={styles.editButton1} onClick={updatetheDoc}>Update</button>  */}
                            <button className={styles.editButton1} onClick={ngoSignUp}>Submit</button> 
                         </div>
                        

             </div>

             <div className={styles.hackerContainer}>
                <h1 className={styles.teamText}>Are you a donor who has questions?</h1>
                <h1 className={styles.teamText}>Contact us using:</h1>
                
                <p className={styles.hacker}><a href="mailto:helpinhandteam@gmail.com">helpinhandteam@gmail.com</a></p>
            
             </div>


   


            

           
           
        </div>



    )
}



