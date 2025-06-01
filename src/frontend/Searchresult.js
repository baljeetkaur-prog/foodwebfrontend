import axios from "axios";
import '../css/searchresult.css';
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function Searchresult() {
    const [loading, setloading] = useState(false); 
    const [prodsdata, setprodsdata] = useState([]); 
    const [params] = useSearchParams(); 
    const query = params.get("q"); 

    const searchprodsbyname = async () => {
        try {
            setloading(true); 
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getprodsbyname/${query}`); 
            if (apiresp.status >= 200 && apiresp.status < 300) {
                setprodsdata(Array.isArray(apiresp.data.pdata) ? apiresp.data.pdata : []); 
            } else {
                setprodsdata([]); 
            }
        } catch (e) {
            toast.error("Error Occurred " + e.message);
        } finally {
            setloading(false); 
        }
    }

    useEffect(() => {
        if (query !== null) {
            searchprodsbyname(); 
        }
    }, [query]);

    return (
        <div className="searchprodcontainer">
            <h1 className="searchhead">Search Results</h1>
            <div className="prodone">
                {loading ? (
                    <p>Loading...</p>
                ) : prodsdata.length > 0 ? (
                    prodsdata.map((pdata, i) => (
                        <Link to={`/proddetails?pid=${pdata._id}`} key={i} className="searchresultcontainer">
                            <img src={`/uploads/${pdata.image}`} alt={pdata.name} className="searchprodimg" />
                            <h4 className="searchheadname">{pdata.name}</h4>
                        </Link>
                    ))
                ) : (
                    <h2>No Matching Results</h2>
                )}
            </div>
        </div>
    );
}

export default Searchresult;

