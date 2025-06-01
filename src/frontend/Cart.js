import '../css/cart.css'
import { dataContext } from "../App";
import { useContext, useEffect, useState } from 'react';
import useFetchCart from '../useFetchCart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import SectionLast from './Sectionlast';
function Cart()
{
    const [loading,setloading]=useState(false); 
    const {pdata,carttotal}=useContext(dataContext); 
    const {cartdata,fetchcart}=useFetchCart(); 
    const navigate=useNavigate(); 
     useEffect(()=>
            {
                if(pdata!==null)
                {
                fetchcart(pdata.email);
                }
            },[pdata]);
        const oncartdel=async(id)=>{ 
        const uchoice=window.confirm(`Are you sure to delete this product`)
        if(uchoice)
        {
            try {
                setloading(true)
                const apireq = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delcart/${id}`) //un
                if (apireq.status >= 200 && apireq.status < 300) {
                    if (apireq.data.success === true) {
                        toast.success("Product deleted successfully")
                        fetchcart(pdata.email);
                    }
                    else{
                        toast.error("Error while deleting")
                    }
                }
                else 
                {
                    toast.error("Some error occured try again")
                }
            }
            catch (e) {
                toast.error("Error occured" + e.message)
            }
            finally {
                setloading(false)
            }
        }
    };
    return(
        <>
        <div className="cartcontainer">
            {cartdata.length > 0 ?
             <>
            <h2 className="cartsummary" style={{fontWeight:'bold'}}>Your Cart Summary</h2>
            <table className="carttable">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Remove Cart Item</th>
                    </tr>
                </thead>
                <tbody>
                    {cartdata.map((item,index)=>(
                        <tr key={index}>
                            <td><img src={`uploads/${item.image}`} alt={item.prodname} className="cartimg"/></td>
                            <td>{item.prodname}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                            <td>₹{item.totalprice}</td>
                            <td><button className="delcartbtn" onClick={()=>oncartdel(item._id)}>Remove Item</button></td>
                        </tr>
                    ))
                    }
                      <h5 style={{paddingTop:'12px', fontStyle:'oblique'}}>{cartdata.length} Product(s) found</h5>
                </tbody>
            </table>
            <div className="cartfooter">
                 <h5 style={{borderBottom:'3px solid #1CAC78', borderRadius:'5px'}}><strong>Your Cart total is <em>₹{carttotal}/- </em></strong></h5> <br/><br/>
                                <button className="checkoutbutton" onClick={()=>navigate("/checkout")}>Checkout</button>
            </div>
            </>:<h2 style={{color: '#c0392b'}}>No product added in your cart yet.</h2>}

        </div>
        <SectionLast/>
        </>
    )
}
export default Cart;