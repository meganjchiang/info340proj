import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom'
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
  // const [transcript, setTranscript] = useState("");


  const [imageFile, setImageFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(' ');


  const handleChange = (event) => {
    if(event.target.files.length > 0 && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setImageFile(imageFile);
      setImageUrl(URL.createObjectURL(imageFile));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = getDatabase();

    const storage = getStorage();
    const imgFileType = imageFile.name.substring(imageFile.name.indexOf('.'), imageFile.name.length);
    const imageRef = storageRef(storage, "mentorImages/"+user.uid+imgFileType)
    
    await uploadBytes(imageRef, imageFile)
    const url = await getDownloadURL(imageRef)

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
      photo: url
      // transcript: transcript
    };

    firebasePush(mentorRef, mentorData)

    setFirstName("");
    setLastName("");
    setEmail("");
    setGradYear("");
    setMajor("");
    setCareer("");
    setImageFile("")
    // setTranscript("");
    setBio("")
    setZoomLink("")

  }
  return (
    <div className="application-form" onSubmit={handleSubmit}>
      <h1>Become a Mentor!</h1>
      <Form onSubmit={handleSubmit}>
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

        {/* <Form.Group className="mb-3" controlId="transcript">
          <Form.Label>Please upload your transcript <span className="required"> *</span></Form.Label>
          <Form.Control type="file" required onChange={(e) => setImageFile(e.target.files)} value={imageFile} onClick={handleChange} />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="photo">
          <Form.Label>Please upload a photo of yourself <span className="required"> *</span></Form.Label>
          <Form.Control type="file" name="image" required onChange={handleChange} />
        </Form.Group>

        <div className="col-12 text-center">
          <button className="submit btn tbn-primary" type="submit" onSubmit={handleSubmit} >Submit application</button>
        </div>
      </Form>
    </div>
  );
};

export default mentorData;