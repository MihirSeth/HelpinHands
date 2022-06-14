
import { useState, useEffect, React } from "react";
import styles from '../../static/ProfilePageNGO.module.scss';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import { signOut } from "firebase/auth";
// import { doc, setDoc, } from 'firebase/firestore';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";


export default function NGOProfile() {
    const navigate = useNavigate();
    const { state } = useLocation();


    const logout = async () => {
        await signOut(auth);

        navigate('/')
    };

    //   const [text, setText] = useState ('')

    const [info, setInfo] = useState('')
    // const [data, setData] = useState([])



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
            // console.log(sortedTaskList)
            // console.log(auth.currentUser.email)

            // const tasksCols = collection(db, 'donations');
            // const taskSnapshots = await getDocs(tasksCols);
            // const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            // let sortedTaskList1 = []
            // for (let i = 0; i < taskLists.length; i++) {
            //     if (taskLists[i].ngoName === info) {
            //         sortedTaskList1.push(taskLists[i])
            //     }
            // }

            // setData(sortedTaskList1)

            // console.log(sortedTaskList1)
        };
        getList()
    }, [])

    // const [item, setItem] = useState('');
    // const [quantity, setQuantity] = useState('');
    // const [ngoName, setngoName] = useState('');
    // const [docID, setdocID] = useState('');

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

        // navigate('/ngoprofile', {state: sortedTaskList1})

        // console.log(state)

    }

    // if(!data) { return null }
    // if (data!==undefined){
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
                            <li><a className={styles.menuItem}><Link to="/" onClick={logout}>Log Out</Link></a></li>
                            {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                            {/* <li><a className={styles.menuItem}><Link to="/home">Contact</Link></a></li> */}
                            <li><a className={styles.menuItem}><Link to="/ngoprofile" onClick={profile}>Profile</Link></a></li>
                            <li><a className={styles.menuItem}><Link to="/ngohome">Home</Link></a></li>



                        </ul>
                    </div>
                </div>
                <div className={styles.donationListHeaderboxContainer}>
                    <h1 className={styles.donationListHeaderboxContainerHeading}>Welcome {info}!</h1>
                    <h2 className={styles.donationListHeaderboxContainerHeading}>These are the donations coming your way!</h2>

                </div>
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
                        <th>User Profile</th>



                    </tr>
                    {/* <tr>
                    <td data-th="Order">$460,935,665</td>
                    <td data-th="Name">Star Wars</td>
                    <td data-th="Email">Adventure, Sci-fi</td>
                    <td data-th="Phone Number">1977</td>
                    <td data-th="Gross">$460,935,665</td>

                </tr>
                <tr>
                    <td data-th="Order">$16,295,774</td>
                    <td data-th="Name">Howard The Duck</td>
                    <td data-th="Email">"Comedy"</td>
                    <td data-th="Phone Number">1986</td>
                    <td data-th="Gross">$460,935,665</td>

                </tr>
                <tr>
                    <td data-th="Order">$115,000,000</td>
                    <td data-th="Name">American Graffiti</td>
                    <td data-th="Email">Comedy, Drama</td>
                    <td data-th="Phone Number">1973</td>
                    <td data-th="Gross">$460,935,665</td>

                </tr> */}

                    {state.map((val) => {
                        return (
                            <tr>
                                <td data-th="Order">{val.item}</td>
                                <td data-th="NGO Name">{val.ngoName}</td>
                                <td data-th="Quantity">{val.quantity}</td>
                                <td data-th="Time">{val.time}</td>
                                <td data-th="Date">{val.date}</td>
                                <td data-th="Delivery Type">{val.deliveryType}</td>

                            </tr>
                        )
                    })}
                </table>
            </div>

        </div>



    )

}



