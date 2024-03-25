import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContactUsPageComponent.scss";

import emailjs from "@emailjs/browser";
//https://www.telerik.com/blogs/sending-emails-react-app-using-emailjs
function ContactUsPageComponent() {

  
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <div className="section-box">
            <h2>O STELIOS TON PAIRNEI</h2>
            <p>
              We'd love to hear from you! Please fill out the form below, and
              we'll get back to you as soon as possible.
            </p>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>O STELIOS TON PAIRNEI</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value=""
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Type your message here"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUsPageComponent;
