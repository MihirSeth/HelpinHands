import { useState, useEffect, React } from "react";
import styles from '../../static/Home.module.css';
import { useNavigate,Link, useLocation } from "react-router-dom";
import { db, collection, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import logo from '../../assets/logo.svg'


export default function HomeContinued(){
    const navigate = useNavigate();
    const { state } = useLocation();



    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

    //   const [text, setText] = useState ('')

      const [info, setInfo] = useState('')
      const [checked, setChecked] = useState('')


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
            // console.log(typeof state)

          };
        getList()
    }, [])


    const saveFunction = () => {

        // console.log(state.docID)
        const docRef = doc(db, "donations", state.docID);
        

        // if(!checked) {
        //     alert('Please fill out all forms')
        //     return
        // } else{
            if (checked===true){
                // setChecked('Drop');
                const updatetheDoc = async() => {
                    const updateDeliveryType = await updateDoc(docRef, {
                        deliveryType: 'Pickup',
                        docID: state.docID,
                    });
                    navigate('/homecont1', {state: state.docID})
                }
                updatetheDoc(); 
            } else{
                // const docRef = doc(db, "donations", state);
                const updatetheDoc = async() => {
                    const updateDeliveryType = await updateDoc(docRef, {
                        time: 'NA',
                        date: 'NA',
                        deliveryType: 'Drop',
                        docID: state.docID,

                    });
                    navigate('/homecont3', {state: {
                        // docID : docID,
                        ngoName: state.ngoName,
                    }})                }
                updatetheDoc(); 

            }
        // }

        // console.log(checked)
        
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
                <div className={styles.donateFormHeaderboxContainer}>
                    <h1 className={styles.donateFormHeaderboxContainerHeading}>Hello {info}</h1>
                    <h2 className={styles.donateFormHeaderboxContainerHeading}>Fill the form and Donate!</h2>

                </div>
            </div>


            <div className={styles.form}>


                <span className={styles.toggleButtonContainer}>
                    <label className={styles.labelReadorNot}>Do you want a pickup?</label>
                    <label className={styles.switch}>
                        <input id='readOrNot' type='checkbox' value={checked} onChange={e => setChecked(e.currentTarget.checked)}/>
                        <span className={styles.slider}></span>
                    </label>
                </span>

                <div className={styles.saveTaskButtonContainer}>
                            <button className={styles.submitButton} onClick={saveFunction}>SAVE</button> 
                        </div>
                        
                {/* <h1>{state.doc_ID}</h1> */}

                {/* <label className={styles.switch}>
                    <input type='checkbox' />
                    <span className={styles.slider}></span>
                    {/* </input> */}
                {/* </label>  */}


                 
                        

            </div>

         </div>



    )
}


