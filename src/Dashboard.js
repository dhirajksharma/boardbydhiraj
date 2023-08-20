import LineChart from "./chartComponents/LineChart";
import PieChart from "./chartComponents/PieChart";
import bell from "./assets/Vector.svg"
import search from "./assets/Search icon.svg";
import revenue from "./assets/revenue.svg";
import transaction from "./assets/total_transaction.svg";
import like from "./assets/like.svg";
import user from "./assets/user.svg";

function Dashboard({userData, userPic}){
    return(
        <div className="lg:ml-4">
            <div id="secondNav" className="flex items-center justify-between mb-4">
                
                <h1 className="font-montserrat font-bold text-2xl">Dashboard</h1>
                
                <div className="flex w-[25%] min-w-[240px] justify-around">
                    <div className="bg-white w-[150px] flex items-center justify-between px-3 font-lato rounded-lg text-gray-400">
                        <input
                        className="w-full"
                        placeholder="Search...">
                        </input>
                        <img src={search} className="w-3"></img>
                    </div>
                    <img src={bell} className="aspect-square w-4 rounded-full"/>
                    <img src={userPic} className="aspect-square w-7 rounded-full"/>
                </div>
            </div>

            <div className="flex justify-evenly md:justify-between mb-4 flex-wrap">
                <div className="bg-[#ddefe0] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={revenue} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm md:text-xs lg:text-sm">Total Revenues</h1>
                    <h2 className="font-sans font-bold text-xl md:text-lg lg:text-xl">&#36;2,129,430</h2>
                </div>
                <div className="bg-[#f4ecdd] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={transaction} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm md:text-xs lg:text-sm">Total Transactions</h1>
                    <h2 className="font-sans font-bold text-xl md:text-lg lg:text-xl">1,293</h2>
                </div>
                <div className="bg-[#efdada] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={like} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm md:text-xs lg:text-sm">Total Likes</h1>
                    <h2 className="font-sans font-bold text-xl md:text-lg lg:text-xl">29,230</h2>
                </div>
                <div className="bg-[#dee0ef] rounded-xl w-[45vw] md:w-[23%] h-[100px] mb-2 flex flex-col justify-end p-4 md:p-2 lg:p-4 relative">
                    <img src={user} className="w-5 lg:w-6 absolute top-3 right-3"></img>
                    <h1 className="font-lato text-sm md:text-xs lg:text-sm">Total Users</h1>
                    <h2 className="font-sans font-bold text-xl md:text-lg lg:text-xl">430</h2>
                </div>
            </div>
            
            <div className="h-[300px] bg-white rounded-xl p-5 mb-6">
            <h1 className="font-montserrat font-bold text-lg">Activities</h1>
            <LineChart chartData={userData} />
            </div>

            <div className="flex flex-wrap w-full justify-between">
                <div className="h-[250px] w-full lg:w-[48%] bg-white rounded-xl mb-6 p-5">
                    <h1 className="font-montserrat font-bold text-lg">Top Products</h1>
                    <PieChart chartData={userData} />
                </div>
                <div className="h-[250px] w-full lg:w-[48%] bg-white rounded-xl mb-6 p-5">
                    <h1 className="font-montserrat font-bold text-lg">Today's schedule</h1>
                    <div className="border-l-4 lg:border-l-8 my-3 pl-3 font-lato border-l-[#9bdd7c]">
                        <h1 className="text-[#666] font-bold">Fix pie chart legend</h1>
                        <h1 className="text-[#999] text-[12px]">18:00-19:00</h1>
                        <h1 className="text-[#999] text-[12px]">at Board assignment</h1>
                    </div>
                    <div className="border-l-4 lg:border-l-8 my-3 pl-3 font-lato border-l-[#6972c3]">
                        <h1 className="text-[#666] font-bold">Fix pie chart legend</h1>
                        <h1 className="text-[#999] text-[12px]">18:00-19:00</h1>
                        <h1 className="text-[#999] text-[12px]">at Board assignment</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;