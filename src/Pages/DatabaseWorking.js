import {useEffect, useState, React } from "react";
import styles from '../static/Home.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { db, collection, getDocs, addDoc, auth } from './firebase';
import {signOut} from "firebase/auth";

export default function Home(){
    const navigate = useNavigate();


    const logout = async () => {
        await signOut(auth);
  
        navigate('/')
      };

      const [text, setText] = useState ('')

      const [info, setInfo] = useState([{}])


      useEffect(() => { 
        const getList = async() => {
            const tasksCol = collection(db, 'tests');
            const taskSnapshot = await getDocs(tasksCol);
            const taskList = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setInfo(taskList)
          };
        getList()
    }, [])
    
      const onSubmit = (e) => {
        e.preventDefault(); /*Prevent refresh*/

        // if(!text | !date | !time) {
        //     alert('Please fill out all forms')
        //     return
        // }

        setText('')
        // addTask({text})

       
        const addTheTask = async() => {
            
            const addTask = await addDoc(collection(db, "tests"), {
                text: text,
                // date: date,
                // time: time,
                // id: id,
                uid: auth.currentUser.uid,
            })
            window.location.reload(false);

        }

        addTheTask();

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
                        <li><a className={styles.menuItem} onClick={logout}>Log Out</a></li>
                        {/* <li><a><Link to="/contactus">Contact Us</Link></a></li> */}
                        <li><a className={styles.menuItem}>Contact</a></li>
                    </ul>
                    </div>
                </div>

            </div>


            <form className={styles.txt_field} onSubmit ={onSubmit}>
                        <input className='whatTask' type = "text" placeholder="Task" value={text} onChange ={(e) => setText(e.target.value)} ></input>
            </form>
            <button className='submitButton' onClick={onSubmit}>SAVE</button> 

            {info.map((infos) => {
        return (
          <div>
            {" "}
            <h1>Text: {infos.text}</h1>
        </div>
        );
     })}


        </div>



    )
}



