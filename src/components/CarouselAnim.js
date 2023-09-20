import React from "react";
//import Carousel from 'react-bootstrap/Carousel';
//import ExampleCarouselImage from './components/ExampleCarouselImage.jpg';
import ImageSlider from "./ImageSlider";

function CarouselAnim() {
  const slides = [
    {url: 'http://localhost:3000/image-1.jpg', title: 'Beach'},
    {url: 'http://localhost:3000/image-2.jpg', title: 'Boat'},
    {url: 'http://localhost:3000/image-3.jpg', title: 'Forest'},
    {url: 'http://localhost:3000/image-4.jpg', title: 'City'},
    {url: 'http://localhost:3000/image-5.jpg', title: 'Italy'}
  ];
const containerStyles = {
  width: '500px',
  height:'280px',
  margin: "0 auto",
}
  return (
    <div>
      <div style={containerStyles}>
      <ImageSlider slides = {slides}/>
      </div>    
    </div>
  ); 
}

export default CarouselAnim;

//<div>CarouselAnim</div>
/* 
<Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
*/