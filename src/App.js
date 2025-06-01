import './App.css';
import Navbar from './frontend/Navbar';
import Footer from './frontend/Footer';
import Siteroutes from './Siteroutes';
import { ToastContainer } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
import Adminnav from './frontend/Adminnav';
const dataContext = createContext(null);
function App() {
  const [pdata, setpdata] = useState(()=>{
  const saveduser=sessionStorage.getItem("uinfo"); 
  return saveduser? JSON.parse(saveduser):null;})
  const [carttotal, setcarttotal] = useState(0);
  const [itemcount, setitemcount] = useState(0);
  // useEffect(()=>{
  //     if(sessionStorage.getItem("uinfo")!==null)
  //     {
  //       setpdata(JSON.parse(sessionStorage.getItem("uinfo")))
  //     }
  //   },[]); 

  return (
    <div id="root">
    <dataContext.Provider value={{pdata,setpdata,carttotal,setcarttotal,itemcount,setitemcount}}>
      {
        pdata===null?
        <Navbar/>
        :pdata.usertype==="admin"?
        <Adminnav/>:
        <Navbar/>
      }
      <div className="main-content">
        <Siteroutes />
        </div>
      <Footer />
      </dataContext.Provider>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
export {dataContext}
