import { useContext, useEffect, useState } from "react"
import { dataContext } from "../App"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

var RoutesProtector=({Compname,adminOnly=false})=>
{
    const {pdata}=useContext(dataContext); 
    const [allow,setallow]=useState(false); 
    const navigate=useNavigate();
    useEffect(()=>
    {
        if(pdata===null)
        {
            toast.info("Please login first")
              navigate('/login'); 
        }
        else if(adminOnly && pdata.usertype!=="admin")
        {
            navigate('/unauthorized')
            toast.error("You are not authorized to view this page")
        }
        else
        {
            setallow(true); 
        }
    },[pdata,adminOnly,navigate]); 
    return(
        <>
        {allow? <Compname/>:null}
        </>
    )
}
export default RoutesProtector