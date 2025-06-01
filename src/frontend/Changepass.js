import "../css/changepass.css"; 
import { useContext, useState } from "react";
import { dataContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Changepass()
{
    const [cpass,setcpass]=useState(""); 
    const [npass,setnpass]=useState(""); 
    const [npassw,setnpassw]=useState(""); 
    const {pdata,setpdata}=useContext(dataContext)
    const [loading,setloading]=useState(false); 
    const navigate=useNavigate(); 
    const handleSubmit=async(e)=>
    {
        e.preventDefault(); 
        try
        {
            if(npass===npassw)
            {
                const apidata={uid:pdata._id,cpass,npass}
                setloading(true); 
                const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/changepassword`,apidata); 
                if(apiresp.status>=200 && apiresp.status<300)
                {
                    if(apiresp.data.success===false)
                    {
                        toast.error(apiresp.data.message)
                    }
                    else if(apiresp.data.success===true)
                    {
                        toast.success("Password Changed Successfully")
                        toast.info("You have been logged out, please login with the new password"); 
                        setpdata(null); 
                         sessionStorage.clear(); 
                         navigate("/login")
                    }
                }
                else
                {
                     toast.error("Some error occured try again")
                }
            }
            else
            {
                 toast.error("New password and confirm password doesn't match")
            }
        }
        catch(e)
        {
            toast.error("Error Occured "+e.message)
        }
        finally{
            setloading(false); 
        }
    }
    return(
        <div className="changepasscontainer">
            <form onSubmit={handleSubmit} className="changepassform">
                <h2 className="changepasshead">Change Password</h2>
                <input type="password" name="cpass" value={cpass} placeholder="Current Password" onChange={(e)=>setcpass(e.target.value)}/><br/><br/>
                <input type="password" name="npass" value={npass} placeholder="New Password" onChange={(e)=>setnpass(e.target.value)}/><br/><br/>
                <input type="password" name="npassw" value={npassw} placeholder="Confirm Password" onChange={(e)=>setnpassw(e.target.value)}/><br/><br/>
                <button className="changepassbtn" disabled={loading}>{loading?"Changing Password...":"Change Password"}</button>
            </form>

        </div>
    )
}
export default Changepass