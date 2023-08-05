import React from 'react'
import '../styles/carousel.css'
function Carousel() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain"}} >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" id='carousel'>
                <div className="carousel-caption d-flex justify-content-center" style={{ zIndex: 1 }}>
                    <div className="input-group w-50">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary text-white btn-primary">search</button>
                    </div>
                </div>
                <div className="carousel-item active">
                    <img src="https://source.unsplash.com/random/100×100/?burger" className="carousel-img d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/100×100/?pastry" className="carousel-img d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/100×100/?pizza" className="carousel-img d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel