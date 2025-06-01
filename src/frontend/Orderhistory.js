import { useContext, useEffect, useState } from "react";
import { dataContext } from "../App";
import '../css/orderhistory.css';
import axios from "axios";
import { toast } from "react-toastify";
import SectionLast from "./Sectionlast";
function Orderhistory() {
    const [loading, setloading] = useState(false);
    const [ordersdata, setordersdata] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { pdata } = useContext(dataContext);
    const fetchorders = async () => {
        try {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchusersorders?email=${pdata.email}`);
            if (apiresp.status >= 200 && apiresp.status < 300) {
                if (apiresp.data.success === false) {
                    setordersdata([]);
                    toast.info("No Orders Found");
                }
                else {
                    setordersdata(apiresp.data.orddata);
                }
            }
            else {
                toast.error("Some error occured, try again")
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
        finally {
            setloading(false);
        }
    }
    useEffect(() => {
        if (pdata !== null) {
            fetchorders();
        }
    }, [pdata]);
    const openModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    }
    const closeModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    }
    return (
        <>
        <div className="orderhistory">
            {loading && <h3>Processing...</h3>}
            {ordersdata.length > 0 &&
                <>
                    <h2>List of Orders</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Payment Mode</th>
                                <th>Total Bill</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ordersdata.map((odata, i) => {
                                    const readableDate = new Date(odata.orderDate).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    });
                                    const fullAddress = `${odata.address.house}, ${odata.address.street}, ${odata.address.city}, ${odata.address.state} - ${odata.address.pincode}`;
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <span
                                                    style={{ color: "#800000", cursor: "pointer", textDecoration: "underline" }}
                                                    onClick={() => openModal(odata)}
                                                >
                                                    {odata._id}
                                                </span>
                                            </td>
                                            <td>{odata.email}</td>
                                            <td>{fullAddress}</td>
                                            <td>{odata.pmethod}</td>
                                            <td>{odata.totalamount}</td>
                                            <td>{readableDate}</td>
                                            <td>{odata.status}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                </>}
                                    {showModal && (
  <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Order Details: {selectedOrder._id}</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
          <p><strong>Username:</strong> {selectedOrder.email}</p>
          <p><strong>Address:</strong> {Object.values(selectedOrder.address).join(", ")}</p>
          <p><strong>Payment Mode:</strong> {selectedOrder.pmethod}</p>
          <p><strong>Total Bill:</strong> ₹{selectedOrder.totalamount}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
        <SectionLast/>
        </>
    )
}
export default Orderhistory; 