import { Link } from 'react-router-dom';
import '../css/pricing.css';
import SectionLast from './Sectionlast';

function Pricing() {
    return (
        <>
            <div className="pricingsection">
                <div className="leftcontent">
                    <h2 className="chefheading">Chef of the week</h2>
                    <p>
                    Meet our Chef of the Week, a true culinary artist whose passion for flavor and innovation has
                     been delighting guests and food lovers alike. Known for signature fusion dishes and meticulous
                      attention to detail, this chef brings creativity and heart to every plate. This week features a 
                      specially curated menu made with fresh seasonal ingredients and a unique twist that showcases the 
                      chef’s exceptional skills. Don’t miss the opportunity to enjoy these exclusive creations and
                       experience culinary excellence at its best.
                    </p>
                </div>
                <div className="rightofferbox">
                    <div className="offerbg">
                        <img src="../images/vegetarian.jpeg" alt="Pricingimage"/>
                        <div className="offeroverlay">
                            <h4>Today's Offer–20% Off</h4>
                            <p>
                            Satisfy your cravings and enjoy your favorites for less—today only, get 20% off your 
                            entire order! Whether you're dining in or ordering online, it's the perfect time to try 
                            something new or indulge in your go-to dishes. 
                            </p>
                            <Link to="/products"><button className="orderbtn">ORDER NOW</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="menuhead">Our Special Menu</h2>
            <div class="menu-section">
  <div class="menu-category">
    <h2>Snacks and Starters</h2>
    <ul>
      <li><span>Samosa (2pcs) </span><span>₹20</span></li>
      <li><span>Aloo Tikki</span><span>₹25</span></li>
      <li><span>Bread Pakoda</span><span>₹30</span></li>
      <li><span>Veg Spring Roll</span><span>₹40</span></li>
      <li><span>Chilli Potato</span><span>₹50</span></li>
    </ul>
  </div>

  <div class="menu-category">
    <h2>Pakoda Specials</h2>
    <ul>
      <li><span>Onion Pakoda</span><span>₹25</span></li>
      <li><span>Paneer Pakoda</span><span>₹40</span></li>
      <li><span>Mix Veg Pakoda</span><span>₹30</span></li>
      <li><span>Bread Pakoda Stuffed</span><span>₹35</span></li>
      <li><span>Gobhi Pakoda</span><span>₹30</span></li>
    </ul>
  </div>

  <div class="menu-category">
    <h2>Tandoori & Rolls</h2>
    <ul>
      <li><span>Paneer Tikka Roll</span><span>₹60</span></li>
      <li><span>Aloo Tikki Wrap</span><span>₹50</span></li>
      <li><span>Veg Seekh Kebab Roll</span><span>₹70</span></li>
      <li><span>Malai Chaap Roll</span><span>₹80</span></li>
      <li><span>Soya Chaap Tikka</span><span>₹85</span></li>
    </ul>
  </div>
  <div class="menu-category">
    <h2>Sandwiches & Burgers</h2>
    <ul>
      <li><span>Veg Grilled Sandwich</span><span>₹40</span></li>
      <li><span>Cheese Sandwich</span><span>₹50</span></li>
      <li><span>Aloo Patty Burger</span><span>₹45</span></li>
      <li><span>Paneer Burger</span><span>₹60</span></li>
      <li><span>Double Cheese Burger</span><span>₹70</span></li>
    </ul>
  </div>
  <div class="menu-category">
    <h2>Chaat Corner</h2>
    <ul>
      <li><span>Dahi Bhalla</span><span>₹35</span></li>
      <li><span>Papdi Chaat</span><span>₹30</span></li>
      <li><span>Bhel Puri</span><span>₹25</span></li>
      <li><span>Golgappa (6 pcs) </span><span>₹20</span></li>
      <li><span>Raj Kachori</span><span>₹45</span></li>
    </ul>
  </div>
  <div class="menu-category">
    <h2>Sides & Extras</h2>
    <ul>
      <li><span>French Fries</span><span>₹30</span></li>
      <li><span>Cheese Fries</span><span>₹50</span></li>
      <li><span>Masala Maggi</span><span>₹40</span></li>
      <li><span>Butter Pav (2 pcs) </span><span>₹15</span></li>
      <li><span>Green Chutney Dip</span><span>₹10</span></li>
    </ul>
  </div>
  <div class="menu-category">
    <h2>Drinks & Beverages</h2>
    <ul>
      <li><span>Cold Coffee</span><span>₹50</span></li>
      <li><span>Fresh Lime Soda</span><span>₹30</span></li>
      <li><span>Masala Chaas</span><span>₹20</span></li>
      <li><span>Mango Shake </span><span>₹40</span></li>
      <li><span>Bottled Water</span><span>₹15</span></li>
    </ul>
  </div>
   <div class="menu-category">
    <h2>Crispy Fried Delights</h2>
    <ul>
      <li><span>Paneer Pakoda</span><span>₹40</span></li>
      <li><span>Aloo Bhonda</span><span>₹50</span></li>
      <li><span>Chilli Cheese Nuggets</span><span>₹20</span></li>
      <li><span>Masala Samosa</span><span>₹30</span></li>
      <li><span>Corn Cutlet</span><span>₹25</span></li>
    </ul>
  </div>
</div>
<SectionLast/>
        </>
    );
}

export default Pricing;
