import { useState } from 'react';
import '../css/signup.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Signup(){
    const [uname,setuname]=useState("");
    const [email,setemail]=useState(""); 
    const [password,setpassword]=useState(""); 
    const [loading,setloading]=useState(false); 
    const navigate=useNavigate(); 
    const onSignup = async (e) => {
        e.preventDefault();
        try {
            setloading(true)
          const apidata = { uname, email, password };
          const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/signup`, apidata);
          const {success,message}=apiresp.data; 
          if(success)
          {
            toast.success(message || "Signup Successful");
              setuname(""); 
              setemail(""); 
              setpassword(""); 
              navigate("/"); 
          }
          else
          {
            toast.info(message || "Signup Failed")
          }
        } catch (e) {
          if(e.response && e.response.data && e.response.data.message){
            toast.error(e.response.data.message)
          }
          else{
          toast.error("Error Occurred " + e.message);
        }
      }
        finally{
            setloading(false); 
        }
      };
    return(
      <div className="maincontentsign">
        <div className="signbackimg">
            <img src="../images/about.webp" alt="SignUp"/>
            </div>
            <div className="signupcontainer">
                <h2>Sign Up</h2>
                <form name="form1" onSubmit={onSignup}>
                    <input type="text" placeholder="Username" value={uname} onChange={(e)=>setuname(e.target.value)} required/><br/><br/>
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)} required/><br/><br/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)} required/><br/><br/>
                    <button className="signbtn" type="submit" disabled={loading}>{loading?"Registering":"Register"}</button>
                </form>
            </div>

        </div>
    )
}
export default Signup
