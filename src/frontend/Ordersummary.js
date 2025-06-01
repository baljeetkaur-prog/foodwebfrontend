import '../css/ordersummary.css';
import { dataContext } from "../App";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SectionLast from './Sectionlast';
function OrderSummary() {
    const [loading, setloading] = useState(false);
    const [odata, setodata] = useState({});
    const { pdata } = useContext(dataContext);
    const fetchorderdetails = async () => {
        try {
            setloading(true);
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchorderinfo?email=${pdata.email}`);
            if (apiresp.status >= 200 && apiresp.status < 300) {
                if (apiresp.data.success === false) {
                    toast.error("Some error occured, try again")
                }
                else if (apiresp.data.success === true) {
                    setodata(apiresp.data.orderdata)
                }
            }
            else {
                toast.error("Some error occured try again")
            }
        }
        catch (e) {
            toast.error("Error occurred " + e.message)
        }
        finally {
            setloading(false);
        }
    }
    useEffect(() => {
        if (pdata && pdata.email) {
            fetchorderdetails();
        }
    }, [pdata])
    return (
        <>
                <div className="ordersummarycontainer">
                    <h2 className="ordersum">Order Summary</h2>
                    <p>Thanks for shopping on our website.</p>
                     <p>Your order number is <span className="oid">{odata._id}</span></p>
                </div>
                <SectionLast/>
                </>
    )
}
export default OrderSummary