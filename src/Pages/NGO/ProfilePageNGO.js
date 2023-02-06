
import { useState, useEffect, React } from "react";
import styles from '../../static/ProfilePageNGO.module.scss';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import { signOut } from "firebase/auth";
// import { doc, setDoc, } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import logo from '../../assets/logo.svg'


export default function NGOProfile() {
    const navigate = useNavigate();
    const { state } = useLocation();


    const logout = async () => {
        await signOut(auth);

        navigate('/')
    };

    // const [text, setText] = useState ('')

    const [info, setInfo] = useState('')
    // const [sort, setSort] = useState('')



    useEffect(() => {
        const getList = async () => {
            const tasksCol = collection(db, 'ngos');
            const taskSnapshot = await getDocs(tasksCol);
            const taskList = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // setInfo(taskList)

            let sortedTaskList = []
            for (let i = 0; i < taskList.length; i++) {
                if (taskList[i].email === auth.currentUser.email) {
                    sortedTaskList.push(taskList[i])
                }
            }
            setInfo(sortedTaskList[0].id)

        };

        // console.log(state)
        getList()
    }, [])

        const updatetheDoc = async(stats, docID) => {
            

            // console.log(stats,docID)
            const docRef = doc(db, "donations", docID);
            const updateDeliveryType = await updateDoc(docRef, {
                status: stats,
            });

            const tasksCols = collection(db, 'donations');
            const taskSnapshots = await getDocs(tasksCols);
            const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    
            let sortedTaskList1 = []
            for (let i = 0; i < taskLists.length; i++) {
                if (taskLists[i].ngoName === info) {
                    sortedTaskList1.push(taskLists[i])
                }
            }
            navigate('/ngostats', {state: sortedTaskList1})

        }


    const profile = async () => {
        const tasksCols = collection(db, 'donations');
        const taskSnapshots = await getDocs(tasksCols);
        const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        let sortedTaskList1 = []
        for (let i = 0; i < taskLists.length; i++) {
            if (taskLists[i].ngoName === info) {
                sortedTaskList1.push(taskLists[i])
            }
        }
        // console.log(sortedTaskList1)
        navigate('/ngostats', {state: sortedTaskList1})

    }


    const donationCount = async() => {
        const tasksCols = collection(db, 'donations');
        const taskSnapshots = await getDocs(tasksCols);
        const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    
        let sortedTaskList1 = []
        for (let i=0;i<taskLists.length;i++){
            if(taskLists[i].ngoName === info){
                sortedTaskList1.push(taskLists[i])
            }
        }  

        navigate('/ngohome2', {state: sortedTaskList1.length})
        
    }


    const sortTable = async(status) => {
        const tasksCols = collection(db, 'donations');
        const taskSnapshots = await getDocs(tasksCols);
        const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    
        // console.log(status)
        let sortedTaskListDelivered = []
        for (let i=0;i<taskLists.length;i++){

            
            if((taskLists[i].ngoName === info) && (taskLists[i].status === status)){
                sortedTaskListDelivered.push(taskLists[i])
            }
        }  

        navigate('/ngostats', {state: sortedTaskListDelivered})
        
    }

    // if(!data) { return null }
    // if (data!==undefined){
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
                            <li><a className={styles.menuItem}><Link to="/" onClick={logout}>Log Out</Link></a></li>
                            {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                            {/* <li><a className={styles.menuItem}><Link to="/home">Contact</Link></a></li> */}
                            <li><a className={styles.menuItem}><Link to="/ngohome" onClick={profile}>Stats</Link></a></li>
                            <li><a className={styles.menuItem}><Link to="/ngohome">Home</Link></a></li>



                        </ul>
                    </div>
                </div>
                <div className={styles.donationListHeaderboxContainer}>
                    <h1 className={styles.donationListHeaderboxContainerHeading}>Welcome {info}!</h1>
                    <h2 className={styles.donationListHeaderboxContainerHeading}>These are the donations coming your way! <Link to='/ngohome2' onClick={donationCount}>Click Here</Link> to get the number of donations. </h2>

                </div>
            </div>

            <div className={styles.sorter} >
                <h1>Sort By</h1>

                <form className={styles.sortList}>

                <input list="sortList" type="text" onChange={e => sortTable(e.currentTarget.value)}/>
                        <datalist id="sortList">
                        <option value="Delivered"></option>
                        <option value="Not Delivered"></option>
                        </datalist>

                </form>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.rwdTable}>
                    <tr>
                        <th>Orders</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Delivery Type</th>
                        <th>Status</th>



                    </tr>
                

                    {state.map((val) => {
                        return (
                            <tr>
                                <td data-th="Order">{val.item}</td>
                                <td data-th="NGO Name">{val.ngoName}</td>
                                <td data-th="Quantity">{val.quantity}</td>
                                <td data-th="Time">{val.time}</td>
                                <td data-th="Date">{val.date}</td>
                                <td data-th="Delivery Type">{val.deliveryType}</td>
                                <td data-th="Status">
                                    <form className={styles.deliveryOptions}>

                                        <input list="deliveryOption" type="text" onChange={e => updatetheDoc(e.currentTarget.value, val.docID)}  placeholder={val.status}/>
                                        <datalist id="deliveryOption">
                                        <option value="Delivered"></option>
                                        <option value="Not Delivered"></option>
                                        </datalist>
                                        <button type="submit"><i class="fa fa-search"></i></button>
                                    </form>

                                </td>


                            </tr>
                        )
                    })}
                </table>
                
            </div>


            {/* <div className={styles.buttonContainer2}>
                    <button className={styles.editButton2} onClick={updatetheDoc}>Update</button> 
            </div> */}

        </div>



    )

}



