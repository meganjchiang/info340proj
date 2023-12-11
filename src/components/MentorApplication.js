import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom'
import { upload } from '@testing-library/user-event/dist/upload';
import { getAuth } from 'firebase/auth';

let mentorData = {};

export function MentorApplicationPage(props) {

  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [major, setMajor] = useState("");
  const [career, setCareer] = useState("");
  const [bio, setBio] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [photo, setPhoto] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleClick = (event) => {
    // const storage = getStorage();
    // const imageRef = storageRef(storage, "mentorImages/" + props.currentUser.uid / +"img")
    // uploadBytes(imageRef, photo);
  }

  const handleChange = (event) => {
    const inputValue = event.target.value;
  }

  // const handleImage = (event) => {

  // }
  const handleSubmit = (event) => {
    event.preventDefault();

    const db = getDatabase();
    const mentorRef = ref(db, "mentorApplicants");

    mentorData = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      role: "mentor",
      firstName: firstName,
      lastName: lastName,
      gradYear: gradYear,
      career: career,
      major: major,
      bio: bio,
      zoomLink: zoomLink,
      photo: photo,
      transcript: transcript
  };

  console.log(mentorData);

  // Use set with the updated data
  // firebaseSet(mentorRef, mentorData)
  //     .then(() => {
  //         navigate('/mentor-profile');
  //     })
  //     .catch((error) => {
  //         console.error("Error updating user data:", error);
  //     });
    // firebaseSet(studentRef, {"email": email, "password":password});
    firebasePush(mentorRef, { "firstName": firstName, "lastName": lastName, "email": email, "gradYear": gradYear, "major": major, "career": career, "transcript": transcript, "photo": photo, "bio": bio, "zoomLink": zoomLink, "uid": user.uid });

    setFirstName("");
    setLastName("");
    setEmail("");
    setGradYear("");
    setMajor("");
    setCareer("");
    setPhoto("");
    setTranscript("");
    setBio("")
    setZoomLink("")

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

        {/* <Form.Group className="mb-3" controlId="email-mentor">
          <Form.Label>Email address <span className="required"> *</span></Form.Label>
          <Form.Control type="email" placeholder="name@example.com" required onChange={(e) => setEmail(e.target.value)} value={email} />
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender <span className="required"> *</span></Form.Label>
          <Form.Select aria-label="Select Gender" required onChange={handleChange} >
            <option disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Preferred not to say">Preferred not to say</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="gradYear">
          <Form.Label>Graduation Year <span className="required"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Example: 2015" required onChange={(e) => setGradYear(e.target.value)} value={gradYear} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="major">
          <Form.Label>Major <span className="required"> *</span></Form.Label>
          <Form.Control type="text" required onChange={(e) => setMajor(e.target.value)} value={major} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="career">
          <Form.Label>Current career <span className="required"> *</span></Form.Label>
          <Form.Control type="text" required onChange={(e) => setCareer(e.target.value)} value={career} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="zoomLink">
          <Form.Label>Personal Zoom Link<span className="required"> *</span></Form.Label>
          <Form.Control type="text" required onChange={(e) => setZoomLink(e.target.value)} value={zoomLink} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Bio<span className="required"> *</span></Form.Label>
          <Form.Control type="text" required onChange={(e) => setBio(e.target.value)} value={bio} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="transcript">
          <Form.Label>Please upload your transcript <span className="required"> *</span></Form.Label>
          <Form.Control type="file" required onChange={(e) => setTranscript(e.target.value)} value={transcript} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="photo">
          <Form.Label>Please upload a photo of yourself <span className="required"> *</span></Form.Label>
          <Form.Control type="file" required onChange={(e) => setPhoto(e.target.value)} value={photo} />
        </Form.Group>

        <div className="col-12 text-center">
          <button className="submit btn tbn-primary" type="submit" onClick={handleClick} >Submit application</button>
        </div>
      </Form>
    </div>
  );
};

export default mentorData;
