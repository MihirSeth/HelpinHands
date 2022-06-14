import { useState, useEffect, React } from "react";
import styles from '../../static/DonationList.module.scss';
import { useNavigate,Link, useLocation } from "react-router-dom";
import { db, collection, auth, getDocs } from '../firebase';
import {signOut} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";


export default function DonationList(){
    const navigate = useNavigate();
    const { state } = useLocation();



    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

      const [text, setText] = useState ('')

      const [info, setInfo] = useState('')
      // const [checked, setChecked] = useState('')


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
            // const tasksCols = collection(db, 'donations');
            // const taskSnapshots = await getDocs(tasksCols);
            // const taskLists = taskSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // setText(taskLists)
          };

        
        getList()
    }, [])
    


  // const donationListFunction = () => {

  //   console.log(text[0].date)
  // };


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
                <div className={styles.donationListHeaderboxContainer}>
                    <h1 className={styles.donationListHeaderboxContainerHeading}>Your Donation List {info}</h1>
                    <h2 className={styles.donationListHeaderboxContainerHeading}>Here is what you have donated!</h2>
                    {/* <button className={styles.listButton} onClick={donationListFunction}>Donation List</button>  */}

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


