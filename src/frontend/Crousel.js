import '../css/crousel.css'; 
function Crousel(){
    return(
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="../images/banner1.jpg" className="d-block w-100" alt="First Slide"/>
      <div className="carousel-caption d-none d-md-block">
    <h2>Fast Food Seasoning</h2>
  </div>
    </div>
    <div className="carousel-item">
      <img src="../images/banner2.webp" className="d-block w-100" alt="Second Slide"/>
      <div className="carousel-caption d-none d-md-block">
    <h2>Fast Food Seasoning</h2>
  </div>
    </div>
    <div className="carousel-item">
      <img src="../images/banner3.jpeg" className="d-block w-100" alt="Third Slide"/>
      <div className="carousel-caption d-none d-md-block">
    <h2>Fast Food Seasoning</h2>
  </div>
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</div>
    )
}
export default Crousel