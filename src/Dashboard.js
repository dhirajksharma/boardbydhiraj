import LineChart from "./chartComponents/LineChart";
import PieChart from "./chartComponents/PieChart";
import bell from "./assets/Vector.svg"
import search from "./assets/Search icon.svg";
import revenue from "./assets/revenue.svg";
import transaction from "./assets/total_transaction.svg";
import like from "./assets/like.svg";
import user from "./assets/user.svg";
import TinyDropdown from "./TinyDropdown";
import { useState } from "react";

function Dashboard({userPic, updateParam}){
    
    const options = [ '2020', '2021', '2022'];
    const [navOption, setNavOption] = useState(0);

    function navHandler(option,selectedIndex){
        updateParam({
            station: '10637',
            start: `${option}-01-01`,
            end: `${option}-12-31`
        })
        setNavOption(selectedIndex)
    }
    
    return(
        <div className="lg:ml-4">
            <div id="secondNav" className="flex items-center justify-between mb-4 mt-1">
                
                <h1 className="font-montserrat font-bold text-lg md:text-2xl">Dashboard</h1>
                
                <div className="flex w-[20%] min-w-[230px] justify-around">
                    <div className="bg-white w-[150px] flex items-center justify-between px-3 font-lato rounded-lg text-gray-400">
                        <input
                        className="w-full"
                        placeholder="Search...">
                        </input>
                        <img src={search} className="w-3"></img>
                    </div>
                    <img src={bell} className="cursor-pointer aspect-square w-4 rounded-full"/>
                    <img src={userPic} className="cursor-pointer aspect-square w-7 rounded-full"/>
                </div>
            </div>

            <div className="flex justify-evenly md:justify-between mb-4 flex-wrap">
                <div className="bg-[#ddefe0] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={revenue} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm">Total Revenues</h1>
                    <h2 className="font-sans font-bold text-xl md:text-2xl">&#36;2,129,430</h2>
                </div>
                <div className="bg-[#f4ecdd] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={transaction} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm">Total Transactions</h1>
                    <h2 className="font-sans font-bold text-xl md:text-2xl">1,293</h2>
                </div>
                <div className="bg-[#efdada] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={like} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm">Total Likes</h1>
                    <h2 className="font-sans font-bold text-xl md:text-2xl">29,230</h2>
                </div>
                <div className="bg-[#dee0ef] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={user} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm">Total Users</h1>
                    <h2 className="font-sans font-bold text-xl md:text-2xl">430</h2>
                </div>
            </div>
            
            <div className="h-[350px] bg-white rounded-xl p-5 mb-6">
            <h1 className="font-montserrat font-bold md:text-lg">Activities</h1>
            <TinyDropdown
                    options={options}
                    onSelect={(option, selectedIndex) => navHandler(option, selectedIndex)}
                    placeHolder='2020'
                    selectedIndex={navOption}
                    cssOverrides={{
                        dropdownButton: {
                            fontSize:'14px'
                        },
                        dropdownPanel: {
                            marginRight:"4px"
                        },
                        dropdownOption: {
                            fontFamily: 'Montserrat',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'14px',
                        },
                        dropdownOptionSelected: {
                            fontFamily: 'Montserrat',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'14px'
                        }
                      }}
                />
            <div className="h-[80%]">
            <LineChart chartData={JSON.parse(sessionStorage.getItem('graph1'))} />
            </div>
            </div>

            <div className="flex flex-wrap w-full justify-between">
                <div id='graph2' className="h-[250px] w-full lg:w-[48%] bg-white rounded-xl mb-6 p-5 pb-7">
                    <h1 className="font-montserrat font-bold md:text-lg w-full flex justify-between items-center">Top Products
                    <TinyDropdown
                    options={options}
                    onSelect={(option, selectedIndex) => navHandler(option, selectedIndex)}
                    placeHolder='2020'
                    selectedIndex={navOption}
                    cssOverrides={{
                        dropdownButton: {
                            fontSize:'14px'
                        },
                        dropdownPanel: {
                            marginRight:"4px"
                        },
                        dropdownOption: {
                            fontFamily: 'Montserrat',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'14px',
                        },
                        dropdownOptionSelected: {
                            fontFamily: 'Montserrat',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'14px'
                        }
                      }}
                />
                    </h1>
                    <div className="w-full h-[90%]">
                    <PieChart chartData={JSON.parse(sessionStorage.getItem('graph2'))} />
                    </div>
                </div>
                <div className="h-[250px] w-full lg:w-[48%] bg-white rounded-xl mb-6 p-5">
                    <h1 className="font-montserrat font-bold md:text-lg">Today's schedule</h1>
                    <div className="border-l-4 lg:border-l-6 my-3 pl-3 font-lato border-l-[#9bdd7c]">
                        <h1 className="text-[#666] font-bold text-sm">Meeting with suppliers</h1>
                        <h1 className="text-[#999] text-[12px]">18:00-19:00</h1>
                        <h1 className="text-[#999] text-[12px]">at Office</h1>
                    </div>
                    <div className="border-l-4 lg:border-l-6 my-3 pl-3 font-lato border-l-[#6972c3]">
                        <h1 className="text-[#666] font-bold text-sm">Create report for delivery</h1>
                        <h1 className="text-[#999] text-[12px]">09:00-11:00</h1>
                        <h1 className="text-[#999] text-[12px]">at Office</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;