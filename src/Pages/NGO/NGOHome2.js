import { useState, useEffect, React } from "react";
import styles from '../../static/NGOHome.module.scss';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
// import { doc, setDoc, } from 'firebase/firestore';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";


export default function NGOHome2(){
    const navigate = useNavigate();
    const { state } = useLocation();


    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

      const [text, setText] = useState ('')

      const [info, setInfo] = useState([])

    //   let length;
      useEffect(() => { 
        const getList = async() => {
            const tasksCol = collection(db, 'ngos');
            const taskSnapshot = await getDocs(tasksCol);
            const taskList = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // setInfo(taskList)

            let sortedTaskList = []
            for (let i=0;i<taskList.length;i++){
                if(taskList[i].email === auth.currentUser.email){
                    sortedTaskList.push(taskList[i])
                }
            }
            setInfo(sortedTaskList[0].id)            
            // console.log(sortedTaskList)
            // console.log(auth.currentUser.email)


          
            // console.log(sortedTaskList1.length)
            console.log(state)
          };
        getList()
    }, [])

    // const [item, setItem] = useState('');
    // const [quantity, setQuantity] = useState('');
    // const [ngoName, setngoName] = useState('');
    // const [docID, setdocID] = useState('');
    const profile = async() => {
        const tasksCols = collection(db, 'donations');
        const taskSnapshots = await getDocs(tasksCols);
        const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    
        let sortedTaskList1 = []
        for (let i=0;i<taskLists.length;i++){
            if(taskLists[i].ngoName === info){
                sortedTaskList1.push(taskLists[i])
            }
        }  

        navigate('/ngoprofile', {state: sortedTaskList1})
        
    }
    

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
                        <li><a className={styles.menuItem}><Link to="/" onClick={logout}>Log Out</Link></a></li>
                        {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                        {/* <li><a className={styles.menuItem}><Link to="/home">Contact</Link></a></li> */}
                        <li><a className={styles.menuItem}><Link to="/ngohome" onClick={profile}>Profile</Link></a></li>
                         <li><a className={styles.menuItem}><Link to="/ngohome">Home</Link></a></li>



                    </ul>
                    </div>
                </div>
                <div className={styles.donationListHeaderboxContainer}>
                    <h1 className={styles.donationListHeaderboxContainerHeading}>Hey {info}!</h1>
                    <h2 className={styles.donationListHeaderboxContainerHeading}>This is your home page!</h2>
                </div>
            </div>

            {/* <h1 className={styles.profileHeading}>Click the button below to get some stats</h1> */}


            <h1 className={styles.profileHeading}>Number of Donations: {state}</h1>


           
        </div>



    )
}