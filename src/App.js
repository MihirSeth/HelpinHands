// import logo from './logo.svg';
// import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "./Pages/Donor/Home";
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AuthClassifierPage from './Pages/AuthPage';
import HomeContinued from './Pages/Donor/HomeCont';
import HomeContinued1 from './Pages/Donor/HomeCont1';
import ProfilePage from './Pages/Donor/ProfilePage';
import DonationList from './Pages/Donor/DonationList';
import HomeContinued2 from './Pages/Donor/HomeCont2';
import HomeContinued3 from './Pages/Donor/HomeCont3';
import NGOHome from './Pages/NGO/NGOHome';

import NGOProfile from './Pages/NGO/ProfilePageNGO';
import PageNotFound from './Pages/PageNotFound';


// import { auth } from '/Users/mihirseth/Desktop/React App/csproject/src/Pages/firebase.js';
// import { useAuthState } from 'react-firebase-hooks/auth';
import NGOHome2 from "./Pages/NGO/NGOHome2";

function App() {
  // const [user] = useAuthState(auth);


  return (
    <div>
      {/* <SignIn /> */}
      {/* {user ? <Home /> : <SignIn />} */}
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<AuthClassifierPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homecont" element={<HomeContinued />} />
        <Route path="/homecont1" element={<HomeContinued1 />} />
        <Route path="/homecont2" element={<HomeContinued2 />} />
        <Route path="/homecont3" element={<HomeContinued3 />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/donationlist" element={<DonationList />} />
        <Route path="/ngohome" element={<NGOHome />} />
        <Route path="/ngoprofile" element={<NGOProfile />} />
        <Route path="/ngohome2" element={<NGOHome2 />} />


        {/* <Route component={() => (<div>404 Not found </div>)} /> */}
        <Route path="*" component={<PageNotFound />}  />






      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
