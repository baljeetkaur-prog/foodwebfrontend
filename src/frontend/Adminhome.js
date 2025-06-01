import { Link } from 'react-router-dom';
import '../css/adminhome.css'; 
function Adminhome(){
    return(
        <div className="admincontainer">
            <img src="../images/adminhome.jpeg" alt="adminhomepic" className="bgimage"/> 
            <div className="admincontent">
                <h2>Admin Home</h2>
        <table className="admintable">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Fetch Registered Users</td>
                    <td><Link to="/fetchallusers">Go</Link></td>
                </tr>
                <tr>
                    <td>Search Users by Email</td>
                    <td><Link to="/searchuser">Go</Link></td>
                </tr>
                <tr>
                    <td>Create New Admin</td>
                    <td><Link to="/createadmin">Go</Link></td>
                </tr>
                <tr>
                    <td>Manage Products</td>
                    <td><Link to="/manageproducts">Go</Link></td>
                </tr>
                <tr>
                    <td>View Placed Orders</td>
                    <td><Link to="/vieworders">Go</Link></td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>

    )
}
export default Adminhome