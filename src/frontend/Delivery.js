import { useNavigate } from 'react-router-dom';
import '../css/delivery.css';
import SectionLast from './Sectionlast';

function Delivery() {
    const navigate = useNavigate();
    const handleOrderClick = () => {
        navigate('/products');
    };

    return (
        <>
            <div className="gallery">
                <h1>Fried, Flaky & Flavorful – Snack Gallery</h1>
                <div className="galleryimg">
                    <div className="imgwrapper">
                        <img src="../images/gallery1.webp" alt="Gallery 1" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/gallery2.jpeg" alt="Gallery 2" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/gallery3.webp" alt="Gallery 3" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/gallery4.webp" alt="Gallery 4" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/gallery5.jpeg" alt="Gallery 5" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/gallery6.webp" alt="Gallery 6" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/samosa.webp" alt="Samosa" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/vegetarian.jpeg" alt="Vegetarian Platter" />
                    </div>
                    <div className="imgwrapper">
                        <img src="../images/snacks.webp" alt="Snacks Platter" />
                    </div>

                </div>
            </div>

            <div className="whychooseus">
                <h2 className="chooseushead">Why Choose R.K. Snacks</h2>
                <div className="reasons">
                    <div className="reasonbox">
                        <h4>Freshly Fried, Always Crispy</h4>
                        <p>We fry everything to order – ensuring crispy samosas, golden kachoris, and crunchy pakoras.</p>
                    </div>
                    <div className="reasonbox">
                        <h4>Traditional Taste, Modern Delivery</h4>
                        <p>Authentic flavors passed down generations, now just a click away!</p>
                    </div>
                    <div className="reasonbox">
                        <h4>Custom Fried Combos</h4>
                        <p>Mix & match your favorite fried snacks – samosas, bread rolls, mirchi pakoras, and more!</p>
                    </div>
                    <div className="reasonbox">
                        <h4>Oil-Free Packaging</h4>
                        <p>Absorbent sheets in packaging ensure your food is crisp, not soggy.</p>
                    </div>
                </div>
            </div>
            <div className="testimonials">
  <h2 className="testimonialhead">What Our Customers Say</h2>
  <div className="testimonialseach">
      <div className="testimonial">
        <p>"RK Snacks delivers the crispiest samosas I've ever had! Every time I order, they arrive piping hot, golden brown, and bursting with flavor. They’ve truly mastered the art of frying."</p>
        <h6 className="testimonialfeed">– Mandy S.</h6>
      </div>
      <div className="testimonial">
        <p>"RK Snacks makes the fluffiest kachoris around! Crispy outside and perfectly spiced inside, they always hit the spot. Every bite takes me back to my grandmother’s homemade treats."</p>
        <h6 className="testimonialfeed">– Sukhleen K.</h6>
      </div>
      <div className="testimonial">
        <p>"I’ve tried many places, but RK Snacks stands out! Their paneer rolls are stuffed generously and taste absolutely divine. The flavors are authentic, rich, and incredibly satisfying every time."</p>
        <h6 className="testimonialfeed">– Kirat K.</h6>
      </div>
      <div className="testimonial">
        <p>"RK Snacks delivers more than just food – it’s an experience! Their packaging keeps everything fresh and warm. The chutneys are a flavorful bonus that complete every delicious meal."</p>
        <h6 className="testimonialfeed">– Harleen K.</h6>
      </div>
      <div className="testimonial">
        <p>"Every visit to RK Snacks feels rewarding. Their moong dal halwa is comforting, aromatic, and melts in your mouth. I always look forward to my next sweet indulgence here."</p>
        <h6 className="testimonialfeed">– Helen M.</h6>
      </div>
      <div className="testimonial">
        <p>"RK Snacks' pav bhaji is unbeatable! The buttery pav and spicy bhaji combo never disappoints. It’s hearty, fresh, and served just the way I like – hot and flavorful."</p>
        <h6 className="testimonialfeed">– Jean K.</h6>
      </div>
      <div className="testimonial">
        <p>"RK Snacks has quickly become my go-to place! Their hygiene, taste, and timely service are unmatched. Even during rush hours, the food arrives perfect – hot and delicious!"</p>
        <h6 className="testimonialfeed">– Kim J.</h6>
      </div>
      <div className="testimonial">
        <p>"What I admire most about RK Snacks is freshness. Nothing feels stale or over-fried. From crunchy bites to soft desserts, their entire menu is a treat worth savoring and wonderful!"</p>
        <h6 className="testimonialfeed">– Marry G.</h6>
      </div>
      </div>
      </div>
            <div className="orderbtncontainer">
                <button onClick={handleOrderClick} className="orderbtn">
                    Order Your Favorite Fried Snack Now
                </button>
            </div>
            <SectionLast/>
        </>
    );
}

export default Delivery;
