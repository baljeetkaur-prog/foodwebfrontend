import '../css/notauthorized.css'
import { useNavigate } from "react-router-dom"

function Unauthorized()
{
    const navigate=useNavigate(); 
    return(
        <div className="notauthcontainer">
            <div className="notauthcard">
                <h1 className="notauthhead">403- Unauthorized</h1>
                <p className="nothauthmessage">You do not have permission to view this page</p>
                <button className="notauthbtn" onClick={()=>navigate("/")}>Go To Home</button>
            </div>

        </div>
    )
}
export default Unauthorized