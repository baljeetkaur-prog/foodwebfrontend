import { useEffect, useState } from 'react';
import SectionLast from './Sectionlast';
import '../css/products.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Products()
{
    const [products,setproducts]=useState([]); 
    const navigate=useNavigate(); 
    const fetchproducts=async()=>{
        try
        {
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchproducts`); 
            if(apiresp.data.success===true)
            {
                setproducts(apiresp.data.result); 
            }
            else
            {
                console.error("Failed to fetch products")
            }
        }
        catch(e)
        {
            console.error("Error: ", e); 
        }
    }
    useEffect(()=>
    {
        fetchproducts(); 
    },[]); 
    const handleproductclick=(productid)=>{
        navigate(`/proddetails?pid=${productid}`)
    }
    return(
        <>
        <div className="proddisplay">
            <div className="prodgrid">
                {products.map(product=>(
                    <div className="prodcard" key={product._id} onClick={()=>handleproductclick(product._id)}>
                        <div className="prodimg">
                            <img src={`uploads/${product.image}`} alt="productimage"/>
                            </div>
                            <h2 className="proddishead">{product.name}</h2>
                            <p>{product.description}</p>
                            <div className="pricesection">
                                <span className="originalprice">₹{product.originalprice}</span>
                                <span className="offerprice">₹{product.price}</span>
                                <span className="discountbadge">
                                {Math.round(((product.originalprice - product.price) / product.originalprice) * 100)}% OFF
                                </span>
                            </div>
                            </div>
                ))}
            </div>
        </div>
         <SectionLast/>
         </>
    )
}
export default Products
