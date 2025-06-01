import { useNavigate } from 'react-router-dom';
import '../css/sectionfour.css'; 

function Sectionfour() {
  const navigate=useNavigate(); 
  return (
    <div className="section-four">
      <div className="section-four__items">
        <div className="section-four__card">
          <img src="../images/snacks.webp" alt="Delicious Snacks" />
          <div className="image-text">Delicious Snacks</div>
          <button type="button" className="btn4" onClick={()=>navigate(`/proddetails?pid=683aee8e8723777ef52d48fa`)}>Order Now</button>
        </div>
        <div className="section-four__card">
          <img src="../images/drinks.webp" alt="Refreshing Drinks" />
          <div className="image-text">Refreshing Drinks</div>
          <button type="button" className="btn4" onClick={()=>navigate(`/proddetails?pid=681bb86789ffe613674c85e1`)}>Order Now</button>
        </div>
        <div className="section-four__card">
          <img src="../images/vegetarian.jpeg" alt="Pure Veg Delights" />
          <div className="image-text">Pure Veg Delights</div>
          <button type="button" className="btn4" onClick={()=>navigate('/products')}>Order Now</button>
        </div>
      </div>
    </div>
  );
}

export default Sectionfour;
