import '../css/checkout.css'
import { dataContext } from "../App";
import useFetchCart from '../useFetchCart';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SectionLast from './Sectionlast';
function Checkout() {
    const { pdata, carttotal } = useContext(dataContext);
    const { cartdata, fetchcart } = useFetchCart();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const [address, setaddress] = useState({ house: '', street: '', city: '', state: '', pincode: '' });
    const [saveaddress, setsaveaddress] = useState(false);
    const [paymentmethod, setpaymentmethod] = useState('cod')
    const [carddetails, setcarddetails] = useState({ cardnum: '', expiry: '', cvv: '', cardname: '' });
    const [savedaddr, setsaveaddr] = useState([]);
    const [selectedindex, setselectedindex] = useState("");
    const fetchsaveaddress = async () => {
        try {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getaddress/${pdata.email}`);
            if (apiresp.data.success && apiresp.data.addresses) {
                const uniqueaddresses = [];
                const seen = new Set();
                apiresp.data.addresses.forEach(addr => {
                    const identifier = `${addr.house}-${addr.street}-${addr.city}-${addr.state}-${addr.pincode}`.toLowerCase().replace(/\s+/g, '');
                    if (!seen.has(identifier)) {
                        seen.add(identifier);
                        uniqueaddresses.push(addr);
                    }
                });

                setsaveaddr(uniqueaddresses);
            }
        }
        catch (e) {
            console.log(e);
            console.log("No Saved Address")
        }
    };
    useEffect(() => {
        if (pdata) {
            fetchsaveaddress();
        }
    }, [pdata])
    useEffect(() => {
        if (pdata !== null) {
            fetchcart(pdata.email);
        }
    }, [pdata]);
    const oncheckout = async (e) => {
        e.preventDefault();
        try {
            if (pdata !== null) {
                setloading(true);
                const apidata = { address, saveaddress, paymentmethod, carddetails, email: pdata.email }
                const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/saveorder`, apidata)
                if (apiresp.status >= 200 && apiresp.status < 300) {
                    if (apiresp.data.success === false) {
                        toast.error("Error while placing order, try again")

                    }
                    else if (apiresp.data.success === true) {
                        toast.success("Order placed successfully")
                        await fetchcart(pdata.email)
                        navigate("/ordersummary")
                    }
                }
                else {
                    toast.error("Some error occured try again")
                }
            }
        }
        catch (e) {
            toast.error("Error occured" + e.message)
        }
        finally {
            setloading(false)
        }
    }
    return (
        <>
        <div className="checkoutcontainer">
            <h2>Checkout</h2>
            <div className="checkoutform">
                {savedaddr.length > 0 && (
                    <div className="savedaddressselector">
                        <label>Select a Saved Address</label>
                        <select value={selectedindex} onChange={(e) => {
                            const index = e.target.value;
                            setselectedindex(index);
                            if (index !== "") {
                                setaddress(savedaddr[index]);
                            }
                            else {
                                setaddress({ house: '', street: '', city: '', state: '', pincode: '' });
                            }
                        }}>
                            <option value={selectedindex} disabled>Select a saved address</option>
                            {savedaddr.map((addr, index) => (
                                <option key={index} value={index}>
                                    {`${addr.house}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}`}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <label>House No.</label>
                <input type="text" value={address.house} onChange={(e) => setaddress({ ...address, house: e.target.value })} />
                <label>Street No.</label>
                <input type="text" value={address.street} onChange={(e) => setaddress({ ...address, street: e.target.value })} />
                <label>City</label>
                <input type="text" value={address.city} onChange={(e) => setaddress({ ...address, city: e.target.value })} />
                <label>State</label>
                <input type="text" value={address.state} onChange={(e) => setaddress({ ...address, state: e.target.value })} />
                <label>Pincode</label>
                <input type="text" value={address.pincode} onChange={(e) => setaddress({ ...address, pincode: e.target.value })} />
                <label><input type="checkbox" checked={saveaddress} onChange={(e) => setsaveaddress(e.target.checked)} />Save this address</label>
                <h3 className="paymenthead">Payment Method:</h3>
                <label><input type="radio" value="cod" checked={paymentmethod === 'cod'} onChange={() => setpaymentmethod('cod')} />Cash on Delivery</label>
                <label><input type="radio" value="card" checked={paymentmethod === 'card'} onChange={() => setpaymentmethod('card')} />Card Payment</label>
                {paymentmethod === 'card' && (
                    <div className="carddetails">
                        <label>Card Number</label>
                        <input type="text" value={carddetails.cardnum} onChange={(e) => setcarddetails({ ...carddetails, cardnum: e.target.value })} />
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" value={carddetails.expiry} onChange={(e) => setcarddetails({ ...carddetails, expiry: e.target.value })} />
                        <label>CVV</label>
                        <input type="password" value={carddetails.cvv} onChange={(e) => setcarddetails({ ...carddetails, cvv: e.target.value })} />
                        <label>Name on Card</label>
                        <input type="text" value={carddetails.cardname} onChange={(e) => setcarddetails({ ...carddetails, cardname: e.target.value })} />
                    </div>
                )}
                <div className="checkoutsummary">
                    <button onClick={oncheckout} className="placeorderbtn" disabled={loading}>{loading ? "Placing Order" : "Place Order"}</button>
                </div>
            </div>
        </div>
        <SectionLast/>
        </>
    )
}
export default Checkout; 