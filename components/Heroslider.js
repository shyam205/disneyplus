import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/Link';

function Heroslider(props) {
  
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true, // enable center mode
        centerPadding: '20px'
      };
    
  return (
      
    <>
      <div className='heroslider'>
            <div className='heroslider-container'>
                <Slider {...settings}>
                     { props.videos.map((x,i) => {
                         return <div key={i} className="img-card">
                             <div className='herosliderinfo'>
                             <h2>{x.title}</h2>
                             <p>{x.description}</p>
                             <Link href={`/video/${x.slug}`}>Watch Now</Link>
                         </div>
                         <div className='backgroungimg'>
                              <img src={x.thumbnail.url} alt={x.slug} />
                         </div>
                         
                     </div>
                     }
                         
                   )}
                </Slider>
            </div>
      </div>
    </>
  )
}

export default Heroslider