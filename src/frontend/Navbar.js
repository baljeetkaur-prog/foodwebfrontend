import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import { useContext, useEffect, useState } from 'react';
import useFetchCart from '../useFetchCart';
import { dataContext } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
function Navbar() {
    const { pdata, setpdata, carttotal, itemcount } = useContext(dataContext)
    const { fetchcart } = useFetchCart();
    const navigate = useNavigate();
    const [stext,setstext]=useState();
    const onsearch=(e)=>{
        e.preventDefault(); 
        if(stext!==""){
            navigate(`/searchresults?q=${stext}`)
        }
        else
        {
            toast.info("Please enter something to search")
        }
    }
    const onlogout = async() => {
        try
        {
            const apiresp=await axios.post(`${process.env.REACT_APP_APIURL}/api/logout`); 
            if(apiresp.data.success===true)
            {
                toast.success(apiresp.data.message)
            }
            else
            {
                toast.error("Failed to logout from server")
            }
        }
        catch(e)
        {
            toast.error("Logout Error"+e.message)
        }
        setpdata(null);
        sessionStorage.clear();
        navigate('/')
    }
    useEffect(() => {
        if (pdata) {
            fetchcart(pdata.email)
        }
    }, [pdata])
    return (
        <nav className="navcontainer">
            <div className="toprow">
                <a href="#" className="nav-item-logo"><span style={{ color: '#C0392B' }}>R</span>.<span>K Snacks</span></a>
                <form onSubmit={onsearch}>
                    <div className="searchbox">
                        <input type="search" placeholder="Search" name="search" className="searchbar" onChange={(e)=>setstext(e.target.value)}/>
                        <input type="submit" name="searchbtn" value="" style={{display:"none"}}/>
                    </div>
                    </form>
                <div className="rightside">
                    <div className="authlinks">
                        {
                            pdata !== null ?
                                <div className="carticon">
                                    <Link to="/cart" className="navitemcart">
                                        <i className="fas fa-shopping-cart" style={{ fontSize: '24px', color: 'black', position: 'relative' }}></i>
                                        <span className="cartcount">{itemcount}</span>
                                    </Link>
                                </div> : null
                        }
                        {pdata===null?
                        <span>Welcome Guest</span>:
                        <span>Welcome {pdata.username}</span>}
                        {pdata===null?
                        <>
                        <Link to="/login" className="nav-item-login">Login</Link> | 
                        <Link to="/signup" className="nav-item-signup">Signup</Link>
                        </>:
                        <> 
                        <div><Link to="/orderhistory" className="nav-item-login">Order History</Link></div> | 
                        <div><Link to="/changepass" className="nav-item-login">Change Password</Link></div>
                        <div><button className="nav-item-logout" onClick={onlogout}>Logout</button></div>

                        </>}
                    </div>
                </div>
            </div>
            <div className="navlinks">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>About</NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Products</NavLink>
                <NavLink to="/pricing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Pricing</NavLink>
                <NavLink to="/delivery" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Delivery</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Contact</NavLink>
            </div>


        </nav>
    )
}
export default Navbar