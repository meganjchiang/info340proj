import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue} from 'firebase/database';


export function MentorApplicationPage() {

  const handleClick = (event) => {
    console.log("clicked");
  }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [degree, setDegree] = useState("");
  const [career, setCareer] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit form with");

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Graduation Year:", gradYear);
    console.log("Degree:", degree);
    console.log("Career:", career);
    console.log("Path to Transcript", transcript);

    const db = getDatabase();
    const mentorRef = ref(db, "allMentor");
    // firebaseSet(studentRef, {"email": email, "password":password});
    firebasePush(mentorRef, {"first": firstName, "lastn": lastName, "email": email, "gradYear": gradYear, "degree": degree, "career": career, "transcript":transcript});

    setFirstName("");
    setLastName("");
    setEmail("");
    setGradYear("");
    setDegree("");
    setCareer("");
    setTranscript("");

  }
  return (
    <div className="application-form" onSubmit={handleSubmit}>
      <h1>Become a Mentor!</h1>
      <Form>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name <span className="required"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Enter your first name" required onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name <span className="required"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Enter your last name" required onChange={(e) => setLastName(e.target.value)} value={lastName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email-mentor">
          <Form.Label>Email address <span className="required"> *</span></Form.Label>
          <Form.Control type="email" placeholder="name@example.com" required onChange={(e) => setEmail(e.target.value)} value={email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender <span className="required"> *</span></Form.Label>
          <Form.Select aria-label="Select Gender" required onChange={handleChange} >
            <option disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Preferred not to say">Preferred not to say</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="gradYear">
          <Form.Label>Graduation Year <span className="required"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Example: 2015" required onChange={(e) => setGradYear(e.target.value)} value={gradYear} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="degree">
          <Form.Label>Degree obtained and Discipline <span className="required"> *</span></Form.Label>
          <Form.Control type="text" required onChange={(e) => setDegree(e.target.value)} value={degree} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="career">
          <Form.Label>Current career <span className="required"> *</span></Form.Label>
          <Form.Control type="text" required onChange={(e) => setCareer(e.target.value)} value={career} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="transcript">
          <Form.Label>Please upload your transcript <span className="required"> *</span></Form.Label>
          <Form.Control type="file" required onChange={(e) => setTranscript(e.target.value)} value={transcript} />
        </Form.Group>

        <div className="col-12 text-center">
          <button className="submit btn tbn-primary" type="submit" onClick={handleClick} >Submit application</button>
        </div>
      </Form>
    </div>
  );
};
