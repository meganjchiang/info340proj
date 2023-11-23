import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function Appointment() {
    
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");

    const handleChange = (event) => {
        const inputValue = event.target.value;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit form with:");
        console.log("Reason:", reason);
        console.log("Notes:", notes);

        setReason("");
        setNotes("");
        
    }

    const handleClick = () => {
        console.log('clicked');
    }

  return (
    <div className="appointment-form" onSubmit={handleSubmit}>
      <h1>Schedule an Appointment</h1>
      <Form>
        <Form.Group className="mb-3" controlId="mentor">
          <Form.Label>Select a Mentor<span className="required">*</span></Form.Label>
          <Form.Select className="form-select" required onChange={handleChange} >
            <option disabled>Select a Mentor</option>
            <option value="mentor1">Mentor 1</option>
            <option value="mentor2">Mentor 2</option>
            <option value="mentor3">Mentor 3</option>
          </Form.Select>
        </Form.Group>

        <div className="row">
          <Form.Group className="col-6 mb-3" controlId="date">
            <Form.Label>Select Date<span className="required"> *</span></Form.Label>
            <Form.Control type="date" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="col-6 mb-3" controlId="time">
            <Form.Label>Select Time<span className="required"> *</span></Form.Label>
            <Form.Select className="form-select" required onChange={handleChange} >
              <option disabled>Select Time</option>
              <option value="time1">10:00 AM</option>
              <option value="time2">2:00 PM</option>
              <option value="time3">4:00 PM</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="reason">
          <Form.Label>What do you want to discuss in the appointment?<span className="required"> *</span></Form.Label>
          <Form.Control as="textarea" rows={4} required onChange={(e) => setReason(e.target.value)} value={reason}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="notes">
          <Form.Label>Add any notes for your mentor</Form.Label>
          <Form.Control as="textarea" rows={4} onChange={(e) => setNotes(e.target.value)} value={notes}/>
        </Form.Group>

        <div className="col-12 text-center">
          <Button className="submit" type="submit" onClick={handleClick}  >
            Schedule Appointment
          </Button>
        </div>
      </Form>
    </div>
  );
}
