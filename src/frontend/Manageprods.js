import { useEffect, useRef, useState } from 'react';
import '../css/manageprods.css';
import axios from 'axios';
import { toast } from 'react-toastify';
function Manageprods() {
    const [pname, setpname] = useState("");
    const [descrip, setdescrip] = useState("");
    const [originalprice,setoriginalprice]=useState("");
    const [price, setprice] = useState("")
    const [img, setimg] = useState(null);
    const [loading, setloading] = useState(false);
    const [products,setproducts]=useState([]); 
    const [editmode,seteditmode]=useState(false);
    const [existingimage,setexistingimage]=useState(null); 
    const [editprodid,seteditprodid]=useState(null); 
    const [instock,setinstock]=useState(true); 
    const fileInputRef=useRef(null); 
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', pname);
        formData.append('description', descrip);
        formData.append('originalprice',originalprice); 
        formData.append('price', price);
        formData.append('instock', instock); 
        if(img) formData.append('image',img); 
        try {
            setloading(true);
            let apiresp; 
            if(editmode)
            {
               formData.append('productid',editprodid); 
               formData.append('existingimage',existingimage);

               apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/updateprod`,formData); 
            }
            else
            {
            apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/manageprod`, formData);
            }
            if (apiresp.data.success === true) {
                toast.success(editmode? "Product Updated Successfully": "Product Added Successfully")
                setpname("");
                setdescrip("");
                setoriginalprice("");
                setprice("");
                setimg(null); 
                setexistingimage(null);
                setinstock(true); 
                fileInputRef.current.value=null; 
                seteditmode(false); 
                seteditprodid(null); 
                fetchproducts(); 
            }
            else {
                toast.error(`${apiresp.data.message || "Failed to update/add"}`)
            }
        }
        catch (e) {
            console.error("Error while submitting product:", e);
            toast.error("Error Occurred: " + e.message)
        }
        finally{
            setloading(false); 
        }
    }
    const fetchproducts=async()=>{
        try
        {
            const apireq=await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchproducts`); 
            if(apireq.data.success===true)
            {
                setproducts(apireq.data.result)
            }
            else
            {
                toast.error("Error Fetching Products")
            }
        }
        catch(e)
        {
            toast.error("Error occured while fetching products"); 
            console.log("Error fetching products: ",e); 
        }
    }
    useEffect(()=>{
        fetchproducts(); 
    },[]); 
    const handleupdate=(product)=>{
        seteditmode(true); 
        setpname(product.name); 
        setdescrip(product.description); 
        setoriginalprice(product.originalprice); 
        setprice(product.price); 
        setimg(null);
        setexistingimage(product.image)
        seteditprodid(product._id); 
        if(fileInputRef.current) fileInputRef.current.value=null; 
    }
    const handledelete=async(id)=>{
        try
        {
        const confirm=window.confirm("Are you sure to delete this product?")
        if(confirm)
        {
                const apiresp=await axios.delete(`${process.env.REACT_APP_APIURL}/api/deleteprod/${id}`); 
                if(apiresp.data.success===true)
                {
                    toast.success("Product Deleted Successfully")
                    fetchproducts(); 
                }
                else
                {
                    toast.error(apiresp.data.message || "Failed to delete")
                }
            }
            }
            catch(e)
            {
                toast.error("Error Occured: "+e.message); 
                console.log("Error while deleting product: ",e); 
            }
        }
    return (
        <>
         <div className="backimg">
         <img src="../images/adminhome.jpeg" alt="manageproductsback"/>
         </div>
            <div className="manageprods">
                <form onSubmit={handlesubmit}>
                    <h2>Manage Products</h2>
                    <input type="text" name="product" placeholder="Product Name" value={pname} onChange={(e) => setpname(e.target.value)} /><br /><br />
                    <textarea name="description" placeholder="Describe Product" value={descrip} onChange={(e) => setdescrip(e.target.value)} /><br /><br />
                    <input type="number" placeholder="Original Price" name="oprice" value={originalprice} onChange={(e) => setoriginalprice(e.target.value)} /><br /><br />
                    <input type="number" placeholder="Price" name="price" value={price} onChange={(e) => setprice(e.target.value)} /><br /><br />
                    <select value={instock?"true":"false"} onChange={(e)=>setinstock(e.target.value==='true')}>
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </select>
                    {editmode && existingimage && (
                        <div className="imagepreview">
                            <p>Current Image: </p>
                            <img src={`uploads/${existingimage}`} alt="currentimage" style={{width:'100px', marginBottom: '10px'}}/>
                        </div>
                    )}
                    <input type="file" name="image" accept="image/*" ref={fileInputRef} onChange={(e) => setimg(e.target.files[0])} /><br /><br />
                    <button type="submit" disabled={loading}>{loading?(editmode?"Updating...":"Addig..."):(editmode?"Update Product":"Add Product")}</button>
                </form>
            </div>
            <div className="productlist">
                <h3>All Products</h3>
                <div className="products">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="product" key={product._id}>
                                <img src={`uploads/${product.image}`} alt={product.name} />
                                <div className="productinfo">
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                    <p><strong>Original Price: </strong>₹{product.originalprice}</p>
                                    <p><strong>Discounted Price: </strong>₹{product.price}</p>
                                    <p style={{color: product.instock ? 'green' : 'red'}}><strong>Status: </strong>{product.instock? "In Stock" : "Out of Stock"}</p>
                                    <button className="updateprodsbtn"onClick={()=>handleupdate(product)}>Update Product</button><br/><br/>
                                    <button className="delprodsbtn" onClick={()=>handledelete(product._id)}>Delete Product</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        </>
    )
}
export default Manageprods;