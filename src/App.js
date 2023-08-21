import { useEffect, useRef, useState } from "react";
import Dashboard from './Dashboard.js';
import jwtDecode from "jwt-decode";
import axios from "axios";
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
    picture:"https://www.pngmart.com/files/22/User-Avatar-Profile-Download-PNG-Isolated-Image.png",
  })

  const [weatherParam, setWeatherParam]=useState({
    station: '10637',
    start: '2020-01-01',
    end: '2020-12-31'
  });
  
  function handleSignIn(res){
    let usr=jwtDecode(res.credential);
    setUser(usr);
    sessionStorage.setItem('user',JSON.stringify(usr));
  }
  
  function handleManualSignIn(e){
    e.preventDefault();
    setUser(tempUser);
    sessionStorage.setItem('user',JSON.stringify(tempUser));
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
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      callback: handleSignIn
    });

    if(sessionStorage.getItem('user')){
      setUser(JSON.parse(sessionStorage.getItem('user')));}
    
    if(Object.keys(user).length===0)
      google.accounts.id.renderButton(
      document.getElementById('signInGoogle'),
      {theme:"outline",size:"small"}
    );

  },[])

  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://meteostat.p.rapidapi.com/stations/monthly',
      params: weatherParam,
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY1}`,
        'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
      }
    };
    async function fetchData(){
      try {
        const response = await axios.request(options);
        sessionStorage.setItem('graph1',JSON.stringify({
          labels: ['Month 1','Month 2','Month 3','Month 4','Month 5','Month 6','Month 7','Month 8','Month 9','Month 10','Month 11','Month 12'],
          datasets: [
            {
              label: "tmax",
              data: response.data.data.map((data) => data.tmax),
            },
            {
              label: "tavg",
              data: response.data.data.map((data) => data.tavg),
            },
          ],
        }))
        sessionStorage.setItem('graph2',JSON.stringify({
          labels: ['Month 1','Month 2','Month 3','Month 4','Month 5','Month 6','Month 7','Month 8','Month 9','Month 10','Month 11','Month 12'],
          datasets: [
            {
              label: "tmax",
              data: response.data.data.map((data) => data.wspd),
            },
          ],
        }))
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  },[weatherParam])

  return (
    <div className="App">
      {
        Object.keys(user).length===0?
        <div id="loginScreen" className="sm:flex">
          <div id="leftSide" className="text-white bg-black sm:h-screen sm:w-2/5 flex sm:flex-col items-center justify-center py-1">
            <div className="w-fit font-montserrat text-3xl sm:text-7xl font-bold">Board.</div>
          </div>

          <div id="rightSide" className="h-[90vh] sm:h-screen sm:w-3/5 flex flex-col items-center justify-center">
            <div className="w-[300px]">
              
              <h1 className="font-montserrat text-2xl sm:text-4xl font-bold">Sign In</h1>
              <p className="font-lato text-sm sm:text-base">Sign in to your account</p>
              
              <div className="my-3 font-montserrat flex">
                <div id='signInGoogle' className="mr-1 w-[50%] h-full"></div>
                <div id='signInApple' className="cursor-pointer ml-1 text-[11px] bg-white flex justify-evenly items-center rounded-[4px] border border-[#dbd6d6] w-[50%]"><img src={apple} className="w-3"></img>Sign in with Apple</div>
              </div>
              
              <form onSubmit={(e)=>handleManualSignIn(e)}
              className="flex flex-col bg-white p-5 rounded-lg font-lato text-sm sm:text-base">
                Email address
                <input
                  required
                  type="email"
                  pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;"
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
                <a className="cursor-pointer text-[#346BD4] mb-3">Forgot password?</a>
                <button
                  type="submit"
                  className="bg-black text-white font-montserrat font-bold p-2 rounded-md">Sign In</button>
              </form>
              
              <p className="text-center font-lato text-[#858585] mt-3 text-sm sm:text-base">Don't have an account? <a className="cursor-pointer text-[#346BD4] sm:text-base">Register here</a></p>
            </div>
          </div>
        </div>:
        <div id="secondScreen" className="h-screen w-screen flex flex-col md:flex-row">
          <div id="nav" className="relative bg-black text-white font-montserrat md:h-[92%] w-screen md:w-[30%] md:max-w-[250px] md:rounded-3xl md:p-10 md:mx-5 md:mt-5">
            
            <div className="relative py-1 flex justify-center md:justify-start">
            <button onClick={handleMenuToggle} className="inline text-white md:hidden absolute top-3 left-2"><img className="aspect-square w-6" src="https://i.pinimg.com/originals/ee/c0/71/eec071442e9a1b8e017c5a7c1853b880.jpg"></img></button>
            <h1 className="inline md:block font-bold text-3xl md:text-4xl md:h-[10%] md:py-0">
              Board.
            </h1>
            </div>
            
            <div id='menu' ref={menu} className="absolute md:relative hidden md:flex flex-col justify-between md:h-[90%] md:mt-6 bg-black w-full z-10">
              <div className="flex flex-col items-start px-3 md:px-0">
                <button className="text-base md:text-lg flex items-center my-3 opacity-70 focus:opacity-100"><img src={dashboard_icon} className="w-4 mr-5"></img>Dashboard</button>
                <button className="text-base md:text-lg flex items-center my-3 opacity-70 focus:opacity-100"><img src={transaction_icon} className="w-4 mr-5"></img>Transactions</button>
                <button className="text-base md:text-lg flex items-center my-3 opacity-70 focus:opacity-100"><img src={schedule_icon} className="w-4 mr-5"></img>Schedules</button>
                <button className="text-base md:text-lg flex items-center my-3 opacity-70 focus:opacity-100"><img src={user_icon} className="w-4 mr-5"></img>Users</button>
                <button className="text-base md:text-lg flex items-center my-3 opacity-70 focus:opacity-100"><img src={setting_icon} className="w-4 mr-5"></img>Settings</button>
              </div>

              <div className="mx-3 md:mx-0">  
              <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100">Help</button>
              <button className="text-sm flex items-center my-2 opacity-70 focus:opacity-100">Contact Us</button>
              </div>
            </div>
          </div>
          <div className="md:h-[100%] p-2 md:p-0 md:pt-5 md:w-[calc(95vw-min(250px,30%))] md:overflow-scroll">
            <Dashboard userPic={user.picture} updateParam={setWeatherParam}></Dashboard>
          </div>
        </div>
      }
    </div>
  );
}

export default App;