import React, { useState, } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContactUsPageComponent.scss";

import emailjs from "@emailjs/browser";
//https://www.telerik.com/blogs/sending-emails-react-app-using-emailjs


const ContactUsPageComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);

  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);

    // Retrieve form data
    const formData = {
    user_name: e.target.user_name.value,
    user_email: e.target.user_email.value,
    message: e.target.message.value
    };

    // Check if any of the fields are empty
    if (!formData.user_name || !formData.user_email || !formData.message) {
      setStateMessage('Name, Email, or Message is not filled');
      setTimeout(() => {
        setStateMessage(null);
      }, 4000); // hide message after 5 seconds
      return; // Exit early if any field is empty
    }

    emailjs.sendForm( 
      process.env.REACT_APP_SERVICE_ID, 
      process.env.REACT_APP_TEMPLATE_ID, 
		  e.target, 
      process.env.REACT_APP_PUBLIC_KEY 
      
		  ).then(
        (result) => {
          setStateMessage('Message sent!');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        },
        (error) => {
          console.error('Error sending email:', error);
          setStateMessage('Something went wrong, please try again later');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });

      e.target.reset();
  };

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <div className="section-box">
            <h2>Contact Us</h2>
            <p>
            Θα θέλαμε να ακούσουμε νέα σας! Συμπληρώστε την παρακάτω φόρμα και 
            θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.
            </p>
          </div>
          <Form onSubmit={sendEmail}>
            <Form.Group className="" >
              <Form.Label >Name</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="" >
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email" 
              name="user_email"
              placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="" >
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                placeholder="Type your message here"
              />
            </Form.Group>
            <Button variant="primary" type="submit" value="Send">
            {stateMessage && <p>{stateMessage}</p>}
              Submit
              {/* KANE DISABLED TO BUTTON AN EXEI KENA FIELDS */}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUsPageComponent;