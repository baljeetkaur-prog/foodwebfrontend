import '../css/sectionsmall.css'; 
function Sectionsmall()
{
    return(
        <div className="smallgallery">
            <div className="imagetextwrap">
            <div className="imagecontainer">
                <img src="../images/section1.webp" alt="Food 1" height="150"/>
                <img src="../images/section2.webp" alt="Food 2" height="150"/>
                <img src="../images/section3.webp" alt="Food 3" height="150"/>
                <img src="../images/section4.webp" alt="Food 4" height="150"/>
            </div>
            <div className="galleryinner">
                <h3 className="smallsechead3">Our Best Food Types</h3>
                <p>Welcome to our restaurant! Enjoy our delicious range of foods, 
                    including our signature samosas filled with rich, spicy flavors, 
                    crispy bread pieces perfect for a quick bite, golden fries seasoned to perfection, 
                    and juicy rolls that are sure to satisfy your hunger.</p>
            </div>
            </div>
        </div>
    )
}
export default Sectionsmall