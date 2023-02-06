import { useState, useEffect, React } from "react";
import styles from '../../static/Home.module.css';
import { useNavigate, Link } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
// import { doc, setDoc, } from 'firebase/firestore';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import logo from '../../assets/logo.svg'


export default function Home(){
    const ngoCanPick = ['NGO 1']
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
            // console.log(auth.currentUser.uid)
            setInfo(sortedTaskList[0].firstName)
          };
        getList()
    }, [])

    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ngoName, setngoName] = useState('');
    const [quantityType, setquantityType] = useState('');

    // const [docID, setdocID] = useState('');

    const status = 'Not Delivered'


    
        const donateFunction = async() => {
            var docID='';

            if(!item | !quantity | !ngoName) {
                alert('Please fill out all forms. Make sure you have used only numbers for quantity')
                return
            } else{
                try {

                    const donateAnItem = async() => {
                        const donateItem = await addDoc(collection(db, "donations"), {
                            item: item,
                            quantity: quantity + ' ' + quantityType,
                            ngoName: ngoName,
                            // docId: doc().id,
                            // email: auth.currentUser.email,
                            uid: auth.currentUser.uid,
                            status: status,
                        })

                        docID = donateItem.id;
                       
                        if (ngoCanPick.includes(ngoName)){

                                navigate('/homecont', {state: {
                                    docID : docID,
                                    ngoName: ngoName,
                            
                        }})


                        } else{
                            if (window.confirm('This NGO cannot pickup from you, are you sure you want to donate? You will have to drop!')){

                                const docRef = doc(db, "donations", docID);
                                const updateData = await updateDoc(docRef, {
                                    time: 'NA',
                                    date: 'NA',
                                    deliveryType: 'Drop',
                                    docID: docID,

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

                        <form className={styles.donorItems}>
                            <input list="donorItems" type="text" onChange={e => setItem(e.currentTarget.value)} placeholder="Choose an Item..."/>
                            <datalist id="donorItems">
                            <option value="Poha"></option>
                                <option value="Vermicelli"></option>
                                <option value="Murmura"></option>
                                <option value="Aata"></option>
                                <option value="Rice"></option>
                                <option value="Maida"></option>
                                <option value="Suji"></option>

                                <option value="Besan"></option>
                                <option value="Salt"></option>
                                <option value="Tea"></option>
                                <option value="Coffee"></option>
                                <option value="Milk"></option>
                                <option value="Sugar"></option>
                                <option value="Biscuits"></option>
                                <option value="Namkeen"></option>
                                <option value="Pulses"></option>
                                <option value="Spices"></option>
                                <option value="Cooking Oil"></option>
                                <option value="Fruits"></option>
                                <option value="Vegetables"></option>

                                <option value="Toys"></option>

                                <option value="Books "></option>

                                <option value="Pen"></option>
                                <option value="Pencil"></option>
                                <option value="Sharpner"></option>
                                <option value="Eraser"></option>
                                <option value="Pencil Box"></option>
                                <option value="Ruler"></option>
                                <option value="Sanitary Pads"></option>
                                <option value="Toothpaste"></option>
                                <option value="Toothbrush"></option>
                                <option value="Washing Detergents"></option>
                                <option value="Shampoo"></option>
                                <option value="Cream"></option>
                                <option value="Hair Oil"></option>

                                <option value="Bathing Soap"></option>
                                <option value="Table"></option>
                                <option value="Chair"></option>

                            </datalist>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>

                        <div className={styles.txt_field}>
                            <input type="number" id='number' onChange={e => setQuantity(e.currentTarget.value)} name='number' required/>
                            <span></span>
                            <label>Quantity</label>
                        </div>

                        <form className={styles.donorItems}>
                        <input list="quantityType" type='text' onChange={e => setquantityType(e.currentTarget.value)} placeholder="Quantity Type"/>
                            <datalist id="quantityType">
                            <option value="Numbers"></option>
                            <option value="Kilograms"></option>
                            {/* <option value="Milligram"></option> */}
                            <option value="Liters"></option>
                            {/* <option value="Milliliter"></option> */}

                            </datalist>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>


                        <form className={styles.donorItems}>
                        <input list="ngoList" type='text' onChange={e => setngoName(e.currentTarget.value)} placeholder="Choose an NGO..."/>
                            <datalist id="ngoList">
                            <option value="NGO 1"></option>
                            <option value="NGO 2"></option>
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



