import { useNavigate } from 'react-router-dom';
import '../css/sectionlast.css'; 
const SectionLast = () => {
  const navigate=useNavigate(); 
    return (
      <div className="sectionlast-container">
        <hr class="section-three__divider"></hr>
        <div className="sectionlast-wrapper">
          <div className="card">
          <i className="fas fa-utensils"></i>
            <h2>Bold Flavors</h2>
            <p>Explore dishes that bring warmth and nostalgia to your plate. We combine traditional recipes with modern flair, offering meals that comfort and excite. Whether you're discovering new tastes or revisiting old favorites, each bite is crafted to satisfy your cravings.</p>
            <button type="button" className="footerbtn" onClick={()=>navigate(`/products`)}>Explore Flavours</button>
          </div>
  
          <div className="card">
          <i className="fas fa-drumstick-bite"></i>
            <h2>Kitchen Inspiration</h2>
            <p>Get inspired with ideas to elevate your cooking. Our guides, tips, and seasonal favorites help you break routine and bring joy back to your kitchen. Whether you're a beginner or an expert, you’ll always find something new to try and share with the people you love.</p>
            <button type="button" className="footerbtn" onClick={()=>navigate(`/about`)}>Get Inspired</button>
          </div>
  
          <div className="card">
          <i className="fas fa-coffee"></i>
            <h2>Fresh Choices</h2>
            <p>Enjoy meals made with real, honest ingredients. We focus on fresh produce and local flavors to give you food that’s both wholesome and delicious. Every dish reflects our passion for quality and health, ensuring your body and taste buds are treated with care and love.</p>
            <button type="button" className="footerbtn" onClick={()=>navigate(`/products`)}>See Fresh Picks</button>
          </div>
  
          <div className="card">
          <i className="fas fa-bowl-food"></i>
            <h2>Easy Dining</h2>
            <p>Skip the hassle and enjoy good food fast. Our smooth ordering and delivery service brings fresh meals right to your door. Whether you're dining alone or feeding a crowd, we make it easy to enjoy quality food whenever and wherever you need it the most.</p>
            <button type="button" className="footerbtn"onClick={()=>navigate(`/contact`)}>Contact Us</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SectionLast;