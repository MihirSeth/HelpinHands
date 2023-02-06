import { useState, useEffect, React } from "react";
import styles from '../../static/EditProfilePage.module.css';
import { Link, useNavigate } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
import {doc, updateDoc } from "firebase/firestore";
import logo from '../../assets/logo.svg'

export default function EditProfilePage(){
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


    // const [addressUpdate, setAddressUpdate] = useState('')
    // const [phoneNumberUpdate, setphoneNumberUpdate] = useState('')
    // const [emailUpdate, setEmailUpdate] = useState('')

    const updateEmail = async(emailID) => {
            
        const docRef = doc(db, "users", auth.currentUser.uid,);
        const updateDeliveryType = await updateDoc(docRef, {
            email: emailID,
        });
          
    }

    const updatePhoneNumber = async(phoneNumber) => {
            
        const docRef = doc(db, "users", auth.currentUser.uid,);
        const updateDeliveryType = await updateDoc(docRef, {
            phoneNumber: phoneNumber,
        });
    
    }

    const updateAddress = async(address) => {
            
        const docRef = doc(db, "users", auth.currentUser.uid,);
        const updateDeliveryType = await updateDoc(docRef, {
            address: address,
        });
    
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
                    <h2 className={styles.profilePageHeaderboxContainer}>Edit your Profile here!</h2>
                    <h3 className={styles.profilePageHeaderboxContainer}>Just change your details in the textbox!</h3>

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
                                <input type='text' className={styles.answerLabel} onChange={e => updateAddress(e.currentTarget.value)} defaultValue={address} />
                            </div>
                        </div>

                        <div className={styles.smallInformationContainer1}>
                            <h1 className={styles.smallInformationHeading}>Phone</h1>
                            <div className={styles.answerContainer}>
                                <input type='text' className={styles.answerLabel} onChange={e => updatePhoneNumber(e.currentTarget.value)} defaultValue={phoneNumber} />
                            </div>
                        </div>
                    </div>

                    


                </div>

                {/* <div className={styles.informationContainer}>

                </div>  */}


            </div>
            

            {/* <div className={styles.buttonContainer2}>
                    <button className={styles.editButton2} onClick={updatetheDoc}>Update</button> 
                    {/* <button className={styles.listButton}>Donation List</button>  */}
            {/* </div>  */}


        </div>




    )
}



