import { useState, useEffect, React } from "react";
import styles from '../../static/Home.module.css';
import { useNavigate, Link } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
// import { doc, setDoc, } from 'firebase/firestore';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";


export default function Home(){
    const navigate = useNavigate();


    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

    //   const [text, setText] = useState ('')

      const [info, setInfo] = useState('')


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
            setInfo(sortedTaskList[0].firstName)
          };
        getList()
    }, [])

    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ngoName, setngoName] = useState('');
    // const [docID, setdocID] = useState('');

    const ngoAbilityList = ['Goonj']

    
        const donateFunction = async() => {
            var docID='';

            if(!item | !quantity | !ngoName) {
                alert('Please fill out all forms')
                return
            } else{
                try {

                    const donateAnItem = async() => {
                        const donateItem = await addDoc(collection(db, "donations"), {
                            item: item,
                            quantity: quantity,
                            ngoName: ngoName,
                            // docId: doc().id,
                            // email: auth.currentUser.email,
                            uid: auth.currentUser.uid,
                        })

                        docID = donateItem.id;
                        if (ngoAbilityList.includes(ngoName)){

                                navigate('/homecont', {state: {
                                    docID : docID,
                                    ngoName: ngoName,
                            
                        }})


                        } else{
                            if (window.confirm('This NGO cannot deliver to you, are you sure you want to donate? You will have to drop!')){

                                const docRef = doc(db, "donations", docID);
                                const updateData = await updateDoc(docRef, {
                                    time: 'NA',
                                    date: 'NA',
                                    deliveryType: 'Drop',

                                    }); 
                                navigate('/homecont3', {state: {
                                    // docID : docID,
                                    ngoName: ngoName,
                                }})

                                // console.log('ewfew')
                    
                        } else {
                            const deleteData = await deleteDoc(doc(db, "donations", docID));
                        }
                    }
                    }

            
                    donateAnItem();
                
                    
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

                        <form className={styles.donorItems}>
                            <input list="donorItems" type="text" onChange={e => setItem(e.currentTarget.value)} placeholder="Choose an Item..."/>
                            <datalist id="donorItems">
                                <option value="Apples"></option>
                                <option value="Bananas"></option>
                                <option value="Mangos"></option>
                                <option value="Grapes"></option>
                            </datalist>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>

                        <div className={styles.txt_field}>
                            <input type="number" id='number' onChange={e => setQuantity(e.currentTarget.value)} name='number' required/>
                            <span></span>
                            <label>Quantity</label>
                        </div>

                        <form className={styles.donorItems}>
                        <input list="ngoList" type='text' onChange={e => setngoName(e.currentTarget.value)} placeholder="Choose an NGO..."/>
                            <datalist id="ngoList">
                            <option value="Earth Saviours"></option>
                            <option value="Goonj"></option>
                            </datalist>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>

                 
                        <div className={styles.saveTaskButtonContainer}>
                            <button className={styles.submitButton} onClick={donateFunction}>SAVE</button> 
                        </div>
                        

        </div>

        </div>



    )
}



