import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { dataContext } from "../App";
function Login() {
    const [luname, setluname]=useState("");
    const [lpass, setlpass]=useState(""); 
    const [loading, setloading]=useState(false);
    const navigate=useNavigate(); 
    const {setpdata}=useContext(dataContext);
    const handlelogin=async(e)=>{
        e.preventDefault(); 
        try
        {
            setloading(true); 
            const apidata={luname, lpass}; 
            const apiresp=await axios.post(`${process.env.REACT_APP_APIURL}/api/login`,apidata); 
            if (apiresp.data.success === false) {
                                toast.error("Incorrect Username or Password")
                        }
                else if(apiresp.data.success===true)
                {
                setpdata(apiresp.data.udata)
				sessionStorage.setItem("uinfo", JSON.stringify(apiresp.data.udata))
				const returnURL = sessionStorage.getItem("returnURL");
				if (returnURL) {
					sessionStorage.removeItem("returnURL");
					navigate(returnURL);
                }
                else
                {
                    if (apiresp.data.udata.usertype === "superuser" || apiresp.data.udata.usertype === "admin") {
                        navigate("/adminhome")
                        }
					else {
						navigate("/")
					}
                    toast.success(apiresp.data.message || "Login Successful")
                    setluname(""); 
                    setlpass("");

                }
            }
        }
        catch(e)
        {
            if(e.response && e.response.data && e.response.data.message)
            {
                toast.error(e.response.data.message)
            }
            else
            {
                toast.error("Unexpected error: "+e.message)
            }
        }
        finally
        {
            setloading(false); 
        }
    }
    return (
        <div className="maincontentlogin">
        <div className="loginbackimg">
            <img src="../images/about.webp" alt="SignUp" />
            </div>
            <div className="logincontainer">
                <h2>Login</h2>
                <form name="form1" onSubmit={handlelogin}>
                    <input type="text" placeholder="Username" value={luname} onChange={(e)=>setluname(e.target.value)} required /><br /><br />
                    <input type="password" placeholder="Password" value={lpass} onChange={(e)=>setlpass(e.target.value)} required /><br /><br />
                    <button className="loginbtn" type="submit" disabled={loading}>{loading?"Verifying": "Login" }</button><br /><br />
                    <div className="registerlink"> Don't have an account? <Link to="/signup" className="link register">Register</Link></div>
                </form>
            </div>
        </div>
    )
}
export default Login
