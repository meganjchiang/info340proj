import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Appointment() {
    return (
        <div className="appointment-form">
          <h1>Schedule an Appointment</h1>
          <Form>
            <Form.Group className="mb-3" controlId="mentor">
              <Form.Label>Select a Mentor<span className="required">*</span></Form.Label>
              <Form.Select className="form-select" required>
                <option disabled>Select a Mentor</option>
                <option value="mentor1">Mentor 1</option>
                <option value="mentor2">Mentor 2</option>
                <option value="mentor3">Mentor 3</option>
              </Form.Select>
            </Form.Group>
    
            <div className="row">
              <Form.Group className="col-6 mb-3" controlId="date">
                <Form.Label>Select Date<span className="required"> *</span></Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
    
              <Form.Group className="col-6 mb-3" controlId="time">
                <Form.Label>Select Time<span className="required"> *</span></Form.Label>
                <Form.Select className="form-select" required>
                  <option disabled>Select Time</option>
                  <option value="time1">10:00 AM</option>
                  <option value="time2">2:00 PM</option>
                  <option value="time3">4:00 PM</option>
                </Form.Select>
              </Form.Group>
            </div>
    
            <Form.Group className="mb-3" controlId="reason">
              <Form.Label>What do you want to discuss in the appointment?<span className="required"> *</span></Form.Label>
              <Form.Control as="textarea" rows={4} required />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Add any notes for your mentor</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
    
            <div className="col-12 text-center">
              <Button className="submit" type="submit">
                Schedule Appointment
              </Button>
            </div>
          </Form>
        </div>
      );
  }
  
  export default Appointment;