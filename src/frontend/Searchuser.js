import { useState } from 'react';
import '../css/searchuser.css'
import axios from 'axios';
import { toast } from 'react-toastify';
function Searchuser()
{
    const [semail,setsemail]=useState(""); 
    const [loading,setloading]=useState(false); 
    const [udata,setudata]=useState(null); 
    const onsearch=async(e)=>
    {
        e.preventDefault(); 
        try
        {
            setloading(true); 
            const apireq=await axios.get(`${process.env.REACT_APP_APIURL}/api/searchuser?email=${semail}`); 
                setudata(apireq.data); 
                setsemail(""); 
        }
        catch(e)
        {
            setudata(null); 
            if(e.response && e.response.data && e.response.data.message){
                toast.error(e.response.data.message)
            }
            else{
                toast.error("Error Occured "+e.message)
            }

        }
        finally{
            setloading(false); 
    }
    }
    return(
        <div className="searchcontainer">
             <img src="../images/adminhome.jpeg" alt="adminhomepic" className="bgimage" />
             <div className="searchcontent">
            <h2>Search User by Email</h2>
            <form onSubmit={onsearch}>
            <input type="email" placeholder="Enter Email" value={semail} onChange={(e)=>setsemail(e.target.value)}/><br/><br/>
            <button type="submit" disabled={loading}>{loading?"Searching...":"Search"}</button>
            </form>
            {udata && (
                <div className="userinfo">
                    <p><strong>Username: </strong>{udata.username}</p>
                    <p><strong>Email: </strong>{udata.email}</p>
                    </div>
            )}

        </div>
        </div>
    )
}
export default Searchuser