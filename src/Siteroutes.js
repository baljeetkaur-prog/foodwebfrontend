import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signup from "./frontend/Signup";
import Login from "./frontend/Login";
import About from "./frontend/About";
import Adminhome from "./frontend/Adminhome";
import Fetchallusers from "./frontend/Fetchallusers";
import Searchuser from "./frontend/Searchuser";
import Adminlogin from "./frontend/Adminlogin";
import Manageprods from "./frontend/Manageprods";
import Products from "./frontend/Products";
import Pricing from "./frontend/Pricing";
import Proddetails from "./frontend/Proddetails";
import Cart from "./frontend/Cart";
import Checkout from "./frontend/Checkout";
import Ordersummary from "./frontend/Ordersummary";
import ViewOrder from "./frontend/ViewOrder";
import Orderhistory from "./frontend/Orderhistory";
import Delivery from "./frontend/Delivery";
import Contactus from "./frontend/Contactus";
import Searchresult from "./frontend/Searchresult"; 
import Adminnav from "./frontend/Adminnav";
import Changepass from "./frontend/Changepass";
import RoutesProtector from "./frontend/RoutesProtector";
import Unauthorized from "./frontend/Unauthorized";

function Siteroutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/adminhome" element={<RoutesProtector Compname={Adminhome} adminOnly={true}/>}/>
            {/* <Route path="/adminhome" element={<Adminhome/>}/> */}
            <Route path="/fetchallusers" element={<RoutesProtector Compname={Fetchallusers} adminOnly={true}/>}/>
            {/* <Route path="/fetchallusers" element={<Fetchallusers/>}/> */}
            <Route path="/searchuser" element={<RoutesProtector Compname={Searchuser} adminOnly={true}/>}/>
            {/* <Route path="/searchuser" element={<Searchuser/>}/> */}
            <Route path="/createadmin" element={<RoutesProtector Compname={Adminlogin} adminOnly={true}/>}/>
            {/* <Route path="/createadmin" element={<Adminlogin/>}/> */}
            <Route path="/manageproducts" element={<RoutesProtector Compname={Manageprods} adminOnly={true}/>}/>
            {/* <Route path="/manageproducts" element={<Manageprods/>}/> */}
            <Route path="/products" element={<Products/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
            <Route path="/proddetails" element={<Proddetails/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/ordersummary" element={<Ordersummary/>}/>
            <Route path="/vieworders" element={<RoutesProtector Compname={ViewOrder} adminOnly={true}/>}/>
            {/* <Route path="/vieworders" element={<ViewOrder/>}/> */}
            <Route path="/orderhistory" element={<Orderhistory/>}/>
            <Route path="/delivery" element={<Delivery/>}/>
            <Route path="/searchresults" element={<Searchresult/>}/>
            <Route path="/contact" element={<Contactus/>}/>
            <Route path="/adminnav" element={<Adminnav/>}/>
            <Route path="/changepass" element={<Changepass/>}/>
            <Route path="/unauthorized" element={<Unauthorized/>}/>
        </Routes>
    )
}
export default Siteroutes