import '../css/about.css'; 
import Sectionfour from './Sectionfour';
import SectionLast from './Sectionlast';
import Sectionsmall from './Sectionsmall';
import Sectionthree from './Sectionthree';
function About()
{
    return(
        <>
        <div className="aboutcontainer">
            <div className="aboutimage">
        <h2>Crispy Bites, Real Delights!</h2>
        <img src="../images/about.webp" alt="aboutimage" />
        </div>
        <div className="aboutinner">
        <p>
  R.K Snacks is a popular local destination known for serving a wide variety of delicious fried foods and mouth-watering quick bites. From crispy, golden samosas to spicy vegetable pakodas, crunchy spring rolls, and flavorful bread snacks, R.K Snacks offers something for every snack lover. Each item is freshly prepared using high-quality ingredients and traditional recipes that capture the true essence of Indian street food.
  The snacks are crafted with care to deliver bold, authentic flavors that evoke memories of classic street corners and food stalls. Every bite reflects a commitment to freshness, taste, and hygiene. Whether you’re grabbing a quick bite between errands or enjoying an evening treat, R.K Snacks makes every moment more delightful.
  Complement your favorite snacks with a variety of refreshing beverages, perfect for cooling down and recharging. With friendly service, consistent quality, and affordable prices, R.K Snacks has become a beloved part of the local food culture.
</p>
            </div>
            <aside className="aboutvision">
                <h3><i class="fas fa-bullseye"></i> Our Mission</h3>
                <p>Our mission is to bring joy to every customer with delicious, crispy snacks made with love and high-quality ingredients. We are dedicated to providing a taste of authentic Indian street food that captures the essence of local culture while maintaining consistency, freshness, and hygiene in every bite.</p>
                <p>At R.K Snacks, we believe in the power of food to connect people and create memories. Whether you're enjoying a snack with friends or family, our goal is to deliver an experience that makes every moment memorable. We focus on sustainability by sourcing ingredients responsibly and ensuring that every meal we serve meets the highest standards of quality.</p>
                <p>We strive to continue growing, constantly improving, and evolving our menu to meet the changing needs and tastes of our customers. We aim to be more than just a snack shop — we want to be a community hub where people can gather, relax, and enjoy the best of street food in a welcoming atmosphere.</p>
            </aside>
            </div>
            <hr class="section-three__divider"></hr>
              <Sectionsmall/>
        <Sectionthree/>
        <Sectionfour/>
        <SectionLast/>
        </>
    )
}
export default About