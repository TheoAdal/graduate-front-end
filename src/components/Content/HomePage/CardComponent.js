import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import Img4 from "../../../images/tepak.png";
import "./HomePageStyles.scss";

function CardComponent() 
{
    return (
        <div className="card-container"> {/* */}
          <Card className="card">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Εγγραφή ως εθελοντής</Card.Title>
              <Card.Text>
                Μπες και εσύ στην ομάδα και πάρε μέρος στο έργο μας
              </Card.Text>
              <Button className="button" href="/volunteer">Πάρε μέρος</Button>
            </Card.Body>
          </Card>
    
          <Card className="card">
            <Card.Img variant="top" src="another-image-url.jpg" /> {/*src={Img4} */}
            <Card.Body>
              {/* <Card.Title>Καταπολέμησε την μοναξιά</Card.Title> */}
              <Card.Title>Εγγραφή ως άτομο τρίτης ηλικίας</Card.Title>
              <Card.Text>
                Πάρε μέρος στο πρόγραμμα μας για να καταπολεμήσεις την μοναξιά
              </Card.Text>
              <Button className="button" href="/olduser">Πάρε μέρος</Button>
            </Card.Body>
          </Card>
        </div>
      );
}

export default CardComponent;