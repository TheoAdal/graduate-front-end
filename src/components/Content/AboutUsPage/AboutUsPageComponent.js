// AboutUsPageComponent.js
import React from "react";
import "./AboutUsPageComponent.scss";
import { Container, Row, Col, Card } from "react-bootstrap";

function AboutUsPageComponent() {
  return (
    <Container >
      <Row>
        <Col lg={10}>
          <div className="section-box">
            <h3>
              <b>Καλώς ήρθατε στο Friendship at All Ages!</b>
            </h3>
            <p>
              Στο Friendship at All Ages, πιστεύουμε στη δύναμη των συνδέσεων
              και στον θετικό αντίκτυπο των φιλιών μεταξύ των γενεών. Η
              πλατφόρμα μας είναι αφιερωμένη στην καλλιέργεια ουσιαστικών
              σχέσεων μεταξύ εθελοντών και ατόμων της Τρίτης Ηλικίας.
            </p>
          </div>
          <div className="section-box">
            <h3>
              <b>Σκοπός:</b>
            </h3>
            <p>
              Ο σκοπός της εταιρείας είναι να δημιουργήσουμε μια κοινότητα όπου
              άτομα από διαφορετικές γενιές μπορούν να συναντηθούν, να
              μοιραστούν εμπειρίες και να δημιουργήσουν μόνιμες φιλίες.
              Προσπαθούμε να μειώσουμε την κοινωνική απομόνωση μεταξύ των
              ηλικιωμένων και να ενισχύσουμε την ευημερία τόσο των εθελοντών όσο
              και των δικαιούχων.
            </p>
          </div>
          <div className="section-box">
            <h3>
              <b>Πώς λειτουργεί:</b>
            </h3>
            <h4>Για Εθελοντές:</h4>
            <ul>
              <li>
                Γίνετε μέλος σε μικρές ομάδες αφιερωμένες στη σύνδεση με άτομα
                της Τρίτης Ηλικίας.
              </li>
              <li>
                Συμμετάσχετε σε φιλικές συνομιλίες μέσω της τηλεφωνικής μας
                γραμμής.
              </li>
              <li>
                Κανονίστε συναντήσεις, είτε πρόκειται για ένα απλό τηλεφώνημα
                είτε για μια προσωπική δραστηριότητα, όπως μια βόλτα στο πάρκο ή
                μια επίσκεψη σε μουσείο.
              </li>
            </ul>
            <h4>Για Άτομα Τρίτης Ηλικίας:</h4>
            <ul>
              <li>Συνδεθείτε με μια μικρή ομάδα αφοσιωμένων εθελοντών.</li>
              <li>
                Απολαύστε συνομιλίες και συντροφιά μέσω της τηλεφωνικής μας
                γραμμής.
              </li>
              <li>
                Συμμετέχετε σε κοινωνικές δραστηριότητες, ενισχύοντας την
                αίσθηση της κοινότητας και της ευημερίας.
              </li>
            </ul>
          </div>
          {/* <div className="section-box">
            <div className="card-box">
              <Row className="cards">
                <h3>Γνωρίστε την ομάδα μας:</h3>
                <Col lg={3} className="team-member-card">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="path/to/team-member-1.jpg"
                      alt="Team Member 1"
                    />
                    <Card.Body>
                      <Card.Title>Team Member 1</Card.Title>
                      <Card.Text>Role: [Role]</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} className="team-member-card">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="path/to/team-member-2.jpg"
                      alt="Team Member 2"
                    />
                    <Card.Body>
                      <Card.Title>Team Member 2</Card.Title>
                      <Card.Text>Role: [Role]</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3} className="team-member-card">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="path/to/team-member-3.jpg"
                      alt="Team Member 3"
                    />
                    <Card.Body>
                      <Card.Title>Team Member 3</Card.Title>
                      <Card.Text>Role: [Role]</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUsPageComponent;
