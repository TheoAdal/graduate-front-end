import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Img1 from "../../../images/img1.jpg";
import Img2 from "../../../images/img2.jpg";
import Img3 from "../../../images/img3.webp";

function CarouselAnimation() {
  return (
    <Carousel fade>
      <Carousel.Item className="">
        <img
          className="carousel-image"
          src={Img1}
          alt="img1"
          text="First slide"
        />
        <Carousel.Caption>
          <h3>Καταπολέμησε την μοναξιά</h3>
          <p>Πάρε και εσύ μέρος στην πλατφόρμα μας</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image"
          src={Img2}
          alt="img1"
          text="Second slide"
        />
        <Carousel.Caption>
          <h3>Κάνε εγγραφή ως εθελοντής</h3>
          <p>Γίνετε μέλος σε μικρές ομάδες αφιερωμένες στη σύνδεση με άτομα της Τρίτης Ηλικίας.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image"
          src={Img3}
          alt="img1"
          text="Third slide"
        />
        <Carousel.Caption>
          <h3>Κάνε εγγραφή ως άτομο τρίτης ηλικίας</h3>
          <p>
          Συνδεθείτε με μια μικρή ομάδα αφοσιωμένων εθελοντών.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselAnimation;
