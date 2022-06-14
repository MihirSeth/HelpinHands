import { useState, useEffect, React } from "react";
import styles from '../../static/Home.module.css';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export default function HomeContinued2(){
    const navigate = useNavigate();
    const { state } = useLocation();



    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

    //   const [text, setText] = useState ('')

      const [info, setInfo] = useState('')
      const [date, setDate] = useState('')
      const [time, setTime] = useState('')



    //   let userName = ''

      useEffect(() => { 
        const getList = async() => {
            const tasksCol = collection(db, 'users');
            const taskSnapshot = await getDocs(tasksCol);
            const taskList = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // setInfo(taskList)

            let sortedTaskList = []
            for (let i=0;i<taskList.length;i++){
                if(taskList[i].uid === auth.currentUser.uid){
                    sortedTaskList.push(taskList[i])
                }
            }            
        
            setInfo(sortedTaskList[0].firstName)
          };
        getList()
    }, [])
    
      const onSubmit = (e) => {
        e.preventDefault(); /*Prevent refresh*/


        if(!time | !date) {
            alert('Please fill out all forms')
            return
        } else{
            const docRef = doc(db, "donations", state);
            const updatetheDoc = async() => {
                const updateTimings = await updateDoc(docRef, {
                    time: time,
                    date: date,
                    });
      
            }
            updatetheDoc();        
        }

       

    };


    return(
        <div className={styles.main}>
            {/* <h1 className='homeHeading'>Hello</h1> */}
            <div className={styles.mainHeader}>
                            
                <div className={styles.navbar}>
                    <div className={styles.navbarContainer1}>
                        <p className={styles.title}>Header Logo</p>
                    </div>
                    <div className={styles.navbarContainer2}>
                    <ul>
                        <li><a className={styles.menuItem}><Link to="/home" onClick={logout}>Log Out</Link></a></li>
                        {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                        {/* <li><a className={styles.menuItem}><Link to="/home">Contact</Link></a></li> */}
                        <li><a className={styles.menuItem}><Link to="/profile">Profile</Link></a></li>
                         <li><a className={styles.menuItem}><Link to="/home">Home</Link></a></li>

                    </ul>
                    </div>
                </div>
                <div className={styles.donateFormHeaderboxContainer}>
                    <h1 className={styles.donateFormHeaderboxContainerHeading}>Hello {info}</h1>
                    <h2 className={styles.donateFormHeaderboxContainerHeading}>Fill the form and Donate!</h2>

                </div>
            </div>


            <div className={styles.form}>

            
            <h1 className={styles.mainText}>Your Donation is successful!</h1>

            {/* <div className={styles.dateandtimeContainer}> */}
                    {/* <label className={styles.labelReadorNot}>What time?</label> */}
                    {/* <input type = "time" placeholder="Time" onChange={e => setTime(e.currentTarget.value)}></input> */}
                {/* </div> */}

                {/* <div className={styles.dateandtimeContainer}>
                    <label className={styles.labelReadorNot}>What date?</label>
                    <input type = "date" placeholder="Date" onChange={e => setDate(e.currentTarget.value)}></input>
                </div> */}


              

                 
                        

            </div>

         </div>



    )
}



