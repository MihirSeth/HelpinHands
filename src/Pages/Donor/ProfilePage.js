import { useState, useEffect, React } from "react";
import styles from '../../static/ProfilePage.module.css';
import { Link, useNavigate } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";

export default function ProfilePage(){
    const navigate = useNavigate();


    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

      const [data, setData] = useState ('')

      const [firstName, setfirstName] = useState('')
      const [lastName, setlastName] = useState('')
      const [phoneNumber, setphoneNumber] = useState('')
      const [address, setAddress] = useState('')
      const [email, setEmail] = useState('')






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
            // console.log(sortedTaskList)
            setfirstName(sortedTaskList[0].firstName)
            setAddress(sortedTaskList[0].address)
            setphoneNumber(sortedTaskList[0].phoneNumber)
            setlastName(sortedTaskList[0].lastName)
            setEmail(sortedTaskList[0].email)

            const tasksCols = collection(db, 'donations');
            const taskSnapshots = await getDocs(tasksCols);
            const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            let sortedTaskList1 = []
            for (let i=0;i<taskLists.length;i++){
                if(taskLists[i].uid === auth.currentUser.uid){
                    sortedTaskList1.push(taskLists[i])
                }
            }  
            // console.log(sortedTaskList1)
            setData(sortedTaskList1)




          };
        getList()
    }, [])
    
    const donationListFunction = () => {

        navigate('/donationlist',{state: data })
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
                <div className={styles.profilePageHeaderboxContainer}>
                    <h1 className={styles.profilePageHeaderboxContainer}>Hello {firstName}</h1>
                    <h2 className={styles.profilePageHeaderboxContainer}>This is your Profile!</h2>
                </div>


                <div className={styles.buttonContainer}>
                    <button className={styles.editButton}>Edit Profile</button> 
                    <button className={styles.listButton} onClick={donationListFunction}>Donation List</button> 


                </div>

            </div>


            <div className={styles.mainInformationContainer}>
                <div className={styles.informationContainer}>


                    <h1 className={styles.profileHeading}>User Information</h1>

                    <div className={styles.mainContainer}>
                        <div className={styles.smallInformationContainer}>
                            <h1 className={styles.smallInformationHeading}>Email</h1>
                            <div className={styles.answerContainer}>
                                <p className={styles.answerLabel}>{email}</p>

                            </div>
                        </div>

                        <div className={styles.smallInformationContainer}>
                            <h1 className={styles.smallInformationHeading}>Name</h1>
                            <div className={styles.answerContainer}>
                                <p className={styles.answerLabel}>{firstName} {lastName}</p>
                            </div>
                        </div>
                    </div>



                    <div className={styles.mainContainer}>
                        <div className={styles.smallInformationContainer1}>
                            <h1 className={styles.smallInformationHeading}>Address</h1>
                            <div className={styles.answerContainer}>
                                <p className={styles.answerLabel}>{address}</p>
                            </div>
                        </div>

                        <div className={styles.smallInformationContainer1}>
                            <h1 className={styles.smallInformationHeading}>Phone</h1>
                            <div className={styles.answerContainer}>
                                <p className={styles.answerLabel}>{phoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    


                </div>

                {/* <div className={styles.informationContainer}>

                </div>  */}

            </div>
            

        </div>




    )
}



