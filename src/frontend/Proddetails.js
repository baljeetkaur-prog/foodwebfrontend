import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/proddetails.css'; 
import { useContext, useEffect, useState } from 'react';
import { dataContext } from "../App";
import axios from 'axios';
import { toast } from 'react-toastify';
import SectionLast from './Sectionlast';
function Proddetails()
{
    const [params] = useSearchParams();
	const prodid = params.get("pid")
	const [loading, setloading] = useState(false);
	const [pdetails, setpdetails] = useState({});
	const [quantity, setquantity] = useState(1);
	const { pdata } = useContext(dataContext);
	const navigate = useNavigate();
    useEffect(() => {
        if(prodid){
            fetchproddetailsbyid();
        }
        },[]); 
    	const fetchproddetailsbyid = async () => {
		try {
			setloading(true);
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getproddetailsbyid?prodid=${prodid}`);
			if (apiresp.status >= 200 && apiresp.status < 300) {
				if (apiresp.data.success === true) {
					setpdetails(apiresp.data.pdata)
				}
				else {
					toast.info("No details found");
				}
			}
		}
		catch (e) {
			toast.error("Error Occured " + e.message)
		}
		finally {
			setloading(false);
		}
	}
        const addToCart = async () => {
            if (pdata === null) {
                toast.info("Please login to add the product to cart");
                sessionStorage.setItem("returnURL", window.location.pathname + window.location.search);
                navigate("/login");
                return; 
            }
            try
            {
			setloading(true);
            const totalprice=pdetails.price*quantity
			const cartdata = { prodid, imgname: pdetails.image, pname: pdetails.name, quantity, email: pdata.email, price: pdetails.price, originalprice: pdetails.originalprice, instock: pdetails.instock, totalprice }
			const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/savecart`, cartdata)
			if (apiresp.status >= 200 && apiresp.status < 300) {
				if (apiresp.data.success === true) {
					navigate('/cart')
				}
				else {
					toast.error("Error while adding to cart, please try again")
				}
			}
		}
        catch(e)
        {
            toast.error("Error Occured"+e.message)
        }
        finally{
            setloading(false); 
        }
	}
    return(
        <>
        <div className="proddetails">
            <div className="proddetailimage">
                <img src={`/uploads/${pdetails.image}`} alt={pdetails.name} />
            </div>

            <div className="productdetailinfo">
                <h1 className="proddetailhead">{pdetails.name}</h1>
                <p>{pdetails.description}</p>
                <p><strong>Price per unit:</strong> ₹{pdetails.price}</p>
                <p style={{ color: pdetails.instock ? 'green' : 'red' }}>
                    <strong>Availability:</strong> {pdetails.instock ? "In Stock" : "Out of Stock"}
                </p>

                {pdetails.instock && (
                    <div className="quantitysel">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            value={quantity}
                            onChange={(e) => setquantity(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                <p style={{paddingTop:'15px', paddingLeft:'10px'}}><strong>Total Price:</strong> ₹{pdetails.price * quantity}</p>
                </div>
                )}
                <button disabled={!pdetails.instock} onClick={addToCart} className="addtocartbtn">Add to Cart</button>
            </div>
        </div>
        <SectionLast/>
        </>
        
    )
}
export default Proddetails; 
