import { useNavigate } from 'react-router-dom';
import '../css/sectionthree.css'; 

function Sectionthree() {
  const navigate=useNavigate(); 
  return (
    <div className="section-three">
        <hr class="section-three__divider"></hr>
      <div className="section-three__content">
        <div className="section-three__text">
          <h3 className="headthree">Golden Crunch</h3>
          <p>
            Our fried food haven, where every bite is a burst of crispy,
            golden perfection! Our specialty pakodas are made fresh with a 
            variety of ingredients like onions, potatoes, and spinach, dipped
            in a spiced gram flour batter and deep-fried to a perfect crunch. 
            Whether you’re craving something light or want to indulge in a 
            delicious treat, our pakodas offer the perfect balance of
            flavor and texture. Pair them with our homemade chutneys 
            and enjoy the authentic taste of comfort food, just like home.
          </p>
          <button type="button" className="threebtn" onClick={()=>navigate(`/products`)}>Order Now</button>
        </div>
        <div className="section-three__image">
          <img src="../images/sectionthree.webp" alt="Golden Crunch Food" />
        </div>
      </div>
      <hr class="section-three__divider"></hr>
    </div>
  );
}

export default Sectionthree;