import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function MentorApplicationPage() {
  return (
    <div className="application-form">
      <h1>Become a Mentor!</h1>
      <Form>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name <span className="required"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Enter your first name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name <span className="required"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Enter your last name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address <span className="required"> *</span></Form.Label>
          <Form.Control type="email" placeholder="name@example.com" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender <span className="required"> *</span></Form.Label>
          <Form.Select aria-label="Select Gender" required>
            <option disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Preferred not to say">Preferred not to say</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="gradYear">
          <Form.Label>Graduation Year <span className="required"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Example: 2015" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="degree">
          <Form.Label>Degree obtained and Discipline <span className="required"> *</span></Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="career">
          <Form.Label>Current career <span className="required"> *</span></Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <div className="col-12 text-center">
          <button className="submit btn tbn-primary" type="submit">Submit application</button>
        </div>
      </Form>
    </div>
  );
};

// export default Mentor_Application;