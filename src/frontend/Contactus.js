import { useEffect, useRef, useState } from 'react';
import '../css/contactus.css';
import SectionLast from './Sectionlast'; 
import { toast } from 'react-toastify';
import axios from 'axios';
function Contactus() {
    const [name,setname]=useState(""); 
    const [email,setemail]=useState(""); 
    const [message,setmessage]=useState(""); 
    const [loading,setloading]=useState(false); 
    const [captchatoken,setcaptchatoken]=useState(null); 
    const recaptchaRef=useRef(null); 
    useEffect(()=>
    {
        const renderrecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LeWZkYrAAAAAOe9ptGb2b7pZiPaUiIBiuauIwbd",
          callback: (token) => setcaptchatoken(token),
          "expired-callback": () => setcaptchatoken(null),
        });
      }
    };
    if (window.grecaptcha) {
      renderrecaptcha();
    } else {
      window.onloadCallback = () => {
        renderrecaptcha();
      };
    }
  }, []);
  const handlesubmit=async(e)=>
  {
    e.preventDefault();
     if (!captchatoken) {
          toast.error("Please complete the reCAPTCHA");
          return;
        }
    try
    {
        setloading(true);
      const apidata = { name, email, message, captchatoken };
      const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/contactus`,apidata);
      if (apiresp.status >= 200 && apiresp.status < 300) {
        toast.success(apiresp.data.message);
        setname("");
        setemail("");
        setmessage("");
      } else {
        toast.error("Some error occured, try again");
      }
    } catch (e) {
      const errormessage = e.response?.data?.errmsg || e.message;
      toast.error("Error Occured " + errormessage);
    } finally {
      setloading(false);
    }
  };

    return (
        <>
        <div className="contactuscontainer">
            <div className="contactleft">
                <h2 className="contactushead">Customer Support</h2>
                <h4 className="contactemail">Email: <i className="fas fa-envelope" style={{color:'#ff7043'}}></i> support@rk.in</h4>
                <h4 className="contactphone">Phone: <i className="fas fa-phone" style={{color:'#ff7043'}}></i> +91 98765 65890</h4>
                <h2 className="lefth2">Find us on</h2>
                <div className="social-icons">
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-pinterest"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
                <h2 className="lefth2">Address</h2>
                <p><i className="fas fa-map-marker-alt" style={{color:'#ff7043'}}></i> No. 5, Sy No. 8-14, Ground Floor, Shaheed Udham Singh Nagar, Satnampura, Bhanoki Road, Phagwara, Punjab, India, Corporate Identity Number: L741107973457091 Registration Number: 098968</p>
                <button className="contactbutton" onClick={()=>window.open( "https://www.google.co.in/maps/place/R+K+Petha+House/@31.2217477,75.7671794,17z/data=!3m1!4b1!4m6!3m5!1s0x391af4e64e27afdb:0x7f79ece3585b1613!8m2!3d31.2217477!4d75.7697543!16s%2Fg%2F12qgt97c1?entry=ttu",
      "_blank")}>Get Directions</button>
            </div>
            <div className="contactright">
                <form name="contactform" onSubmit={handlesubmit}>
                    <h2 className="contactushead">Get in touch</h2>
                    <input type="text" name="name" placeholder="Enter Name" value={name} onChange={(e)=>setname(e.target.value)}required/>
                    <input type="email" name="email" placeholder="Enter Email Address" value={email} onChange={(e)=>setemail(e.target.value)}required/>
                    <textarea placeholder="Enter Message" value={message} onChange={(e)=>setmessage(e.target.value)}required></textarea><br/>
                    <div ref={recaptchaRef} id="recaptcha-container"></div><br/>
                    <button type="submit" className="contactformbtn" disabled={loading}>{loading?"Submitting":"Submit"}</button>
                    <p>By contacting us you agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></p>
                </form>
            </div>
        </div>
        <SectionLast/>
        </>
    )
}
export default Contactus