import { useState } from 'react';
import '../css/vieworder.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewOrder() {
    const [loading, setloading] = useState(false);
    const [odata, setodata] = useState([]);
    const [odate, setodate] = useState();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [nstatus, setnstatus] = useState("");

    const fetchorders = async () => {
        try {
            setloading(true);
            const apireq = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchorders?odate=${odate}`);
            if (apireq.status >= 200 && apireq.status < 300) {
                if (apireq.data.success === false) {
                    setodata([]);
                    toast.info("No orders found");
                } else if (apireq.data.success === true) {
                    setodata(apireq.data.orddata);
                }
            } else {
                toast.error("Some error occurred. Try again.");
            }
        } catch (e) {
            toast.error("Error occurred: " + e.message);
        } finally {
            setloading(false);
        }
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    const closeModals = () => {
        setShowViewModal(false);
        setShowUpdateModal(false);
        setSelectedOrder(null);
    };

    const updateOrderStatus = async () => {
        if (!nstatus) {
            toast.warning("Please select a new status.");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_APIURL}/api/updatestatus`, {
                orderId: selectedOrder._id,
                nstatus: nstatus,
            });
            if (response.data.success) {
                toast.success("Status updated successfully");
                fetchorders();
                closeModals();
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status: " + error.message);
        }
    };

    return (
        <div className="vieworders">
            <div className="ordercontainer">
                Choose Date:{" "}
                <input type="date" name="odate" onChange={(e) => setodate(e.target.value)} />
                <button onClick={fetchorders}>Submit</button>
                {loading && <h3>Processing...</h3>}

                {Array.isArray(odata) && odata.length > 0 && (
                    <>
                        <h2>List of Orders</h2>
                        <br />
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
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {odata.map((odata, i) => {
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
                                                    style={{ color: "#800000", textDecoration: "underline", cursor: "pointer" }}
                                                    onClick={() => handleView(odata)}
                                                >
                                                    {odata._id}
                                                </span>
                                            </td>
                                            <td>{odata.email}</td>
                                            <td>{fullAddress}</td>
                                            <td>{odata.pmethod}</td>
                                            <td>₹{odata.totalamount}</td>
                                            <td>{readableDate}</td>
                                            <td>{odata.status}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setSelectedOrder(odata);
                                                    setnstatus(odata.status);
                                                    setShowUpdateModal(true);
                                                }}>
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}

                {/* View Modal */}
                {showViewModal && selectedOrder && (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Order Details: {selectedOrder._id}</h5>
                </div>
                <div className="modal-body">
                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                    <p><strong>Address:</strong> {Object.values(selectedOrder.address).join(", ")}</p>
                    <p><strong>Payment Mode:</strong> {selectedOrder.pmethod}</p>
                    <p><strong>Total Bill:</strong> ₹{selectedOrder.totalamount}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModals}>Close</button>
                </div>
            </div>
        </div>
    </div>
)}

                {/* Update Modal */}
                {showUpdateModal && selectedOrder && (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update Status for Order: {selectedOrder._id}</h5>
                </div>
                <div className="modal-body">
                    <select className="form-select" value={nstatus} onChange={(e) => setnstatus(e.target.value)}>
                        <option value="">-- Select Status --</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={updateOrderStatus}>Update</button>
                    <button className="btn btn-secondary" onClick={closeModals}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
)}
            </div>
        </div>
    );
}

export default ViewOrder;

