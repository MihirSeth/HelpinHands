import { useState, useEffect, React } from "react";
import styles from '../../static/NGOHome.module.scss';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
// import { doc, setDoc, } from 'firebase/firestore';
import {doc, updateDoc } from "firebase/firestore";
import logo from '../../assets/logo.svg'


export default function NGOHome(){
    const navigate = useNavigate();
    // const { state } = useLocation();


    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

      const [text, setText] = useState ('')

      const [info, setInfo] = useState([])

    //   const [edit, setEdit] = useState ('')


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
            setText(sortedTaskList[0].info)  
            // console.log(sortedTaskList[0].info)          

          };
        getList()
    }, [])



    const updatetheDoc = async() => {
        
        const docRef = doc(db, "ngos", info);
        const updateDeliveryType = await updateDoc(docRef, {
            // status: stats,
            info: text
        });
    }

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

        navigate('/ngostats', {state: sortedTaskList1})
        
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
                        <li><a className={styles.menuItem}><Link to="/" onClick={logout}>Log Out</Link></a></li>
                        {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                        {/* <li><a className={styles.menuItem}><Link to="/home">Contact</Link></a></li> */}
                        <li><a className={styles.menuItem}><Link to="/ngohome" onClick={profile}>Stats</Link></a></li>
                         <li><a className={styles.menuItem}><Link to="/ngohome">Home</Link></a></li>



                    </ul>
                    </div>
                </div>
                <div className={styles.donationListHeaderboxContainer}>
                    <h1 className={styles.donationListHeaderboxContainerHeading}>Hey {info}!</h1>
                    <h2 className={styles.donationListHeaderboxContainerHeading}>This is your home page! Edit what donors see about you!</h2>
                </div>
            </div>

            <h1 className={styles.profileHeading}>Edit the Text Below</h1>


            {/* <h1 className={styles.profileHeading}>Number of Donations: {text}</h1> */}

            <div className={styles.infoContainer}>

                <textarea type='text' className={styles.editContainer} defaultValue={text}  onChange={e => setText(e.currentTarget.value)}/>

            </div>

            <div className={styles.buttonContainer1}>
                    <button className={styles.editButton1} onClick={updatetheDoc}>Update</button> 
            </div>

           
        </div>



    )
}



