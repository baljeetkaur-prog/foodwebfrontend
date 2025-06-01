import { useEffect, useState } from 'react';
import '../css/fetchallusers.css';
import axios from 'axios';
import { toast } from 'react-toastify';
function Fetchallusers() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    const fetchallusers = async () => {
        try {
            setloading(true);
            const apireq = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchallusers`)
            if (apireq.data.success === true) {
                toast.success("All Users Fetched!")
                setusers(apireq.data.users)
            }
            else {
                toast.error("Error while fetching users")
            }
        }
        catch (e) {
            toast.error("Error fetching users: ", e.message)
        }
        finally {
            setloading(false);
        }
    }
    useEffect(() => {
        fetchallusers();
    }, []);
    const ondeluser=async(id)=>{
        try
        {
            const confirm=window.confirm(`Are you sure to delete this user`)
            if(!confirm) return; 
                const apiresp=await axios.delete(`${process.env.REACT_APP_APIURL}/api/deluser/${id}`)
                if(apiresp.data.success===true)
                {
                    toast.success("User Deleted Successfully!"); 
                    setusers(users.filter(user=>user._id!==id))
                }
                else{
                    toast.error("Error Deleting User")
                }
            }
            catch(e)
            {
                toast.error("Server error while deleting user")
            }

        }
    return (
        <div className="userscontainer">
            <img src="../images/adminhome.jpeg" alt="adminhomepic" className="bgimage" />
            <div className="usercontent">
                <h2>All Registered Users</h2>
                {loading && <p style={{ color: '#d84315', fontWeight: 'bold' }}>Fetching Users...</p>}
                <div className="tablewrapper">
                <table className="usertable">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td><button type="submit" onClick={()=>ondeluser(user._id)} className="deluserbutton">Delete User</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <p style={{ marginTop: "15px", color: "#ff6f00", fontWeight: "bold", textAlign: "left"}}>
                    <em>Total Users Found: {users.length}</em>
                </p>
            </div>
        </div>
    )
}
export default Fetchallusers;