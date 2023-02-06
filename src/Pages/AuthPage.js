import { useEffect, React } from "react";
// import { SignUp } from "./Pages/SignUp";
// import { SignIn } from "./Pages/SignIn";
import { useNavigate,Link } from 'react-router-dom';
// import { auth } from './firebase';
import styles from '../static/AuthPage.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.svg'
import grains from '../assets/grains.jpeg'
import apple from '../assets/apple.png'
import toy from '../assets/toy.png'
import books from '../assets/books.png'




import { auth } from './firebase';
// import { useState } from 'react';


function AuthClassifierPage() {
    const navigate = useNavigate();
    // const [authType, setAuthType] = useState('signIn');
    const ngoList = ['goonj@gmail.com','testngo@gmail.com']

    // const [data, setData] = useState('')
    // const [info, setInfo] = useState('')


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user && ngoList.includes(user.email)){
            

                navigate('/ngohome', 
                // {state: {data: sortedTaskList, donations: sortedTaskList1}}
                )

            } else if (user){
                navigate('/home')

            }
        })
    }, [])


        const signuplink =  () => {
            navigate('/signup')
          };
          const signinlink =  () => {
            navigate('/signup')
          };

    return (


    <div className={styles.main}>
    {/* <h1 className='homeHeading'>Hello</h1> */}
    <div className={styles.mainHeader}>
                    
        <div className={styles.navbar}>
            <div className={styles.navbarContainer1}>
                <img className='logo-image' src={logo} alt="helpinhands" height="300px"  ></img>
            </div>
            <div className={styles.navbarContainer2}>
            <ul>
                {/* <li><a className={styles.menuItem}><Link to="/home" >Log Out</Link></a></li> */}
                {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                <li><a className={styles.menuItem}><Link to="/signin">Sign In</Link></a></li>
                <li><a className={styles.menuItem}><Link to="/signup">Sign Up</Link></a></li>

                <li><a className={styles.menuItem}><Link to="/contactus">Contact Us</Link></a></li>
                 {/* <li><a className={styles.menuItem}><Link to="/home">Home</Link></a></li> */}



            </ul>
            </div>
        </div>
        
        <div className ={styles.lowerheader}>
            <div className={styles.headerItem1}>
                <p className = {styles.maintext}>Welcome to helpinhand.org</p>
                <p className={styles.subtextHeader}>This website is your one-stop destination for donating books, food, clothes, and more! To get started click the link below!</p>
                <button className={styles.signUP} type="button" onClick={signuplink}>Sign up</button>
                <div className={styles.alreadyMember}>
                    Already a member? <Link to="/signin">Sign In</Link>
                 </div>

                 <div className={styles.ngoJoining}>
                    Are you a NGO looking to join? <Link to="/contactus">Contact Us</Link>
                 </div>

                 {/* <div className={styles.ngoJoining}>
                    Click here for sample user credentials to test the NGO page<Link to="/contactus">Contact Us</Link>
                 </div> */}
            </div>
            <div className={styles.headerItem2}>
                {/* <img src="photo.jpg" alt="Italian Trulli"/> */}
            </div> 
        </div>

    </div>
    
    
    <h1 className={styles.headingDiv2}>Simply select one of the items from the various options, choose your NGO and you are ready to donate! Some examples of items you can donate!</h1>
    {/* <h1 className={styles.headingDiv2}>To do all this, just sign up with a few clicks.</h1> */}

    <div className={styles.container2}>
        <div className={styles.textContainer}>
            <div className={styles.item}>
                <img className='logo-image' src={books} alt="clothes" height="150px" ></img>

            </div>
            <div className={styles.itemsCaption}>Books</div>
        </div>

        <div className={styles.textContainer}>
            <div className={styles.item}>
                <img className='logo-image' src={toy} alt="toy" height="150px"></img>
            </div>
            <div className={styles.itemsCaption}>Toys</div>
        </div>

        <div className={styles.textContainer}>
            <div className={styles.item}>
                <img className='logo-image' src={apple} alt="apple" height="150px"></img>

            </div>
            <div className={styles.itemsCaption}>Fruits</div>
        </div>

        <div className={styles.textContainer}>
            <div className={styles.item}>
                <img className='logo-image' src={grains} alt="grains" height="150px"></img>
            </div>
            <div className={styles.itemsCaption}>Grains</div>
        </div>
    </div>

    <div className={styles.quoteSection}>
        <h1 className={styles.quote}>“Helping hands are better than praying lips”</h1>
        <p className={styles.quoteAuthor}>-Mother Teresa</p>
    </div>

    <div className={styles.callToActionContainer}>
        <div className={styles.callToActionBanner}>
            <div className={styles.callToActionBody}>
                <div className={styles.callToActionItem1}>
                    <p className={styles.callToActionTitle}>Lets donate! It's time!</p>
                    <p className={styles.callToActionPara}>Sign up for the website by clicking that button right over there!</p>
                </div>
                <button type="button" className={styles.callToActionButton} onClick={signuplink}>Sign up</button>
            </div>
        </div>
    </div>

    {/* <div className={styles.footer}>
        <p className={styles.footerText}>Copyright &#169 Mihir Seth 2022</p>
    </div> */}

    </div>



    )
}

export default AuthClassifierPage








