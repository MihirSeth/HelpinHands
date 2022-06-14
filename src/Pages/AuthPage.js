import { useState, useEffect, React } from "react";
// import { SignUp } from "./Pages/SignUp";
// import { SignIn } from "./Pages/SignIn";
import { useNavigate,Link } from 'react-router-dom';
// import { auth } from './firebase';
import styles from '../static/AuthPage.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { db, collection, addDoc, auth, getDocs } from './firebase';
// import { useState } from 'react';


function AuthClassifierPage() {
    const navigate = useNavigate();
    // const [authType, setAuthType] = useState('signIn');
    const ngoList = ['goonj@gmail.com']

    // const [data, setData] = useState('')
    // const [info, setInfo] = useState('')


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user && ngoList.includes(user.email)){
                // console.log(user.email)

                // const getList = async() => {  
                    
                //     const tasksCol = collection(db, 'ngos');
                //     const taskSnapshot = await getDocs(tasksCol);
                //     const taskList = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                //     // setInfo(taskList)
        
                //     let sortedTaskList = []
                //     for (let i=0;i<taskList.length;i++){
                //         if(taskList[i].email === auth.currentUser.email){
                //             sortedTaskList.push(taskList[i])
                //         }
                //     }    

                //     // setInfo(sortedTaskList)
                //     const tasksCols = collection(db, 'donations');
                //     const taskSnapshots = await getDocs(tasksCols);
                //     const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        
                //     let sortedTaskList1 = []
                //     for (let i=0;i<taskLists.length;i++){
                //         if(taskLists[i].ngoName === sortedTaskList[0].id){
                //             sortedTaskList1.push(taskLists[i])
                //         }
                //     }  
                //     // console.log(sortedTaskList1)
                //     // setData(sortedTaskList1)
                //     // console.log(sortedTaskList1)
                //     navigate('/ngohome', 
                //     {state: {data: sortedTaskList, donations: sortedTaskList1}}
                //     )
                //   };
                // getList()

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
                <p className={styles.title}>Header Logo</p>
            </div>
            <div className={styles.navbarContainer2}>
            <ul>
                {/* <li><a className={styles.menuItem}><Link to="/home" >Log Out</Link></a></li> */}
                {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                {/* <li><a className={styles.menuItem}><Link to="/home">Contact</Link></a></li> */}
                <li><a className={styles.menuItem}><Link to="/contactus">Contact Us</Link></a></li>
                 {/* <li><a className={styles.menuItem}><Link to="/home">Home</Link></a></li> */}



            </ul>
            </div>
        </div>
        
        <div className ={styles.lowerheader}>
            <div className={styles.headerItem1}>
                <p className = {styles.maintext}>Welcome to 'NAME' Website</p>
                <p className={styles.subtextHeader}>This website is your one-stop desitnation for donating books, food, clothes, and more! To get started click the link below!</p>
                <button className={styles.signUP} type="button" onClick={signuplink}>Sign up</button>

            </div>
            <div className={styles.headerItem2}>
                <img src="photo.jpg" alt="Italian Trulli"/>
            </div> 
        </div>

    </div>
    
    <h1 className={styles.headingDiv2}>Simply select one of the items, choose your NGO and you are ready to donate!</h1>
    <div className={styles.container2}>
        <div className={styles.textContainer}>
            <div className={styles.item}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg> */}
            </div>
            <div className={styles.itemsCaption}>this is some subtext under an illustration or image</div>
        </div>

        <div className={styles.textContainer}>
            <div className={styles.item}></div>
            <div className={styles.itemsCaption}>this is some subtext under an illustration or image</div>
        </div>

        <div className={styles.textContainer}>
            <div className={styles.item}></div>
            <div className={styles.itemsCaption}>this is some subtext under an illustration or image</div>
        </div>

        <div className={styles.textContainer}>
            <div className={styles.item}></div>
            <div className={styles.itemsCaption}>this is some subtext under an illustration or image</div>
        </div>
    </div>

    <div className={styles.quoteSection}>
        <h1 className={styles.quote}>This is an inspiring quote, or a testimonial from a customer. Maybe it's just filling up space, or maybe people will actually read it. Who knows? All I know is that it looks nice.</h1>
        <p className={styles.quoteAuthor}>-Thor, God of Thunder</p>
    </div>

    <div className={styles.callToActionContainer}>
        <div className={styles.callToActionBanner}>
            <div className={styles.callToActionBody}>
                <div className={styles.callToActionItem1}>
                    <p className={styles.callToActionTitle}>Call to action! It's time!</p>
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








