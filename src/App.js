import { useEffect, useRef, useState } from "react";
import Dashboard from './Dashboard.js';
import jwtDecode from "jwt-decode";
import { UserData } from "./Data";
import dashboard_icon from './assets/dashboard_icon.png';
import schedule_icon from './assets/schedule_icon.png';
import setting_icon from './assets/setting_icon.png';
import transaction_icon from './assets/transaction_icon.png';
import user_icon from './assets/user_icon.png';

import apple from './assets/apple 1.svg'

function App() {
  
  const [user, setUser]=useState({});
  const [tempUser, setTempUser]=useState({
    email:"",
    password:"",
    picture:"https://cdn.vectorstock.com/i/1000x1000/57/22/human-avatar-man-isolated-icon-vector-11705722.webp",
  })

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
      },
    ],
  });

  
  function handleSignIn(res){
    let usr=jwtDecode(res.credential);
    setUser(usr);
  }
  
  function handleManualSignIn(e){
    e.preventDefault();
    setUser(tempUser);
  }
  
  const menu=useRef();
  function handleMenuToggle(){
    if(menu.current.style.display==='flex')
      menu.current.style.display='none';
    else
      menu.current.style.display='flex';
  }

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: "741211887173-5aphffrmr04mgopbq82tiolo1lnnftb3.apps.googleusercontent.com",
      callback: handleSignIn
    });

    google.accounts.id.renderButton(
      document.getElementById('signInGoogle'),
      {theme:"outline",size:"small"}
    );

  },[])


  return (
    <div className="App">
      {
        Object.keys(user).length===0?
        <div id="loginScreen" className="sm:flex">
          <div id="leftSide" className="text-white bg-black sm:h-screen sm:w-2/5 flex sm:flex-col items-center justify-center py-1">
            <div className="w-fit font-montserrat text-xl sm:text-5xl font-bold">Board.</div>
          </div>

          <div id="rightSide" className="h-[90vh] sm:h-screen sm:w-3/5 flex flex-col items-center justify-center">
            <div className="w-[300px]">
              
              <h1 className="font-montserrat text-2xl font-bold">Sign In</h1>
              <p className="font-lato text-sm">Sign in to your account</p>
              
              <div className="my-3 font-montserrat flex">
                <div id='signInGoogle' className="mr-1 w-[50%] h-full"></div>
                <div id='signInApple' className="ml-1 text-[11px] bg-white flex justify-evenly items-center rounded-[4px] border border-[#dbd6d6] w-[50%]"><img src={apple} className="w-3"></img>Sign in with Apple</div>
              </div>
              
              <form className="flex flex-col bg-white p-5 rounded-md font-lato text-sm">
                Email address
                <input required
                  type="text"
                  placeholder="Email address"
                  value={tempUser.name}
                  onChange={(e)=>setTempUser(tempUser=>({...tempUser, email: e.target.value}))}
                  className="bg-[#f5f5f5] rounded-md p-1 mt-2 mb-3">
                </input>
                Password
                <input required
                  type="password"
                  placeholder="Password"
                  value={tempUser.password}
                  onChange={(e)=>setTempUser(tempUser=>({...tempUser, password: e.target.value}))}
                  className="bg-[#f5f5f5] rounded-md p-1 mt-2 mb-3">
                </input>
                <a className="text-[#346BD4] mb-3">Forgot password?</a>
                <button
                  type="submit"
                  onClick={(e)=>handleManualSignIn(e)}
                  className="bg-black text-white font-montserrat font-bold p-2 rounded-md">Sign In</button>
              </form>
              
              <p className="text-center font-lato text-[#858585] mt-3 text-sm">Don't have an account? <a className="text-[#346BD4]">Register here</a></p>
            </div>
          </div>
        </div>:
        <div id="secondScreen" className="h-screen w-screen flex flex-col md:flex-row md:items-center">
          <div id="nav" className="bg-black text-white font-montserrat md:h-[92%] w-screen md:w-[30%] md:max-w-[250px] md:rounded-3xl md:px-10 md:py-5 md:mx-5">
            
            <div className="relative py-1 flex justify-center md:justify-start">
            <button onClick={handleMenuToggle} className="inline text-white md:hidden absolute left-0">b</button>
            <h1 className="inline md:block font-bold text-xl md:text-4xl md:h-[10%] md:py-0">
              Board.
            </h1>
            </div>
            
            <div id='menu' ref={menu} className="hidden md:flex flex-col justify-between md:h-[90%]">
              <div className="flex flex-col items-start">
                <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100"><img src={dashboard_icon} className="w-4 mr-5"></img>Dashboard</button>
                <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100"><img src={transaction_icon} className="w-4 mr-5"></img>Transactions</button>
                <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100"><img src={schedule_icon} className="w-4 mr-5"></img>Schedules</button>
                <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100"><img src={user_icon} className="w-4 mr-5"></img>Users</button>
                <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100"><img src={setting_icon} className="w-4 mr-5"></img>Settings</button>
              </div>

              <div>  
              <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100">Help</button>
              <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100">Contact Us</button>
              </div>
            </div>
          </div>
          <div className="md:h-[92%] p-2 md:w-[calc(95vw-min(250px,30%))]">
            <Dashboard userData={userData} userPic={user.picture}></Dashboard>
          </div>
        </div>
      }
    </div>
  );
}

export default App;