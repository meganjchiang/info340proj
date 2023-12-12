import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth';

let mentorData = {};

const timeOptions = [];
for (let hour = 8; hour <= 21; hour++) {
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const hourString = hour > 12 ? hour - 12 : hour;
  const nextHourString = (hour + 1) > 12 ? (hour + 1) - 12 : (hour + 1);

  const timeLabel = `${hourString}:00 ${amPm} - ${nextHourString}:00 ${amPm}`;
  const value = `${hour}:00`;

  console.log("value time", value);

  timeOptions.push({
    value,
    label: timeLabel,
  });
}

export function MentorApplicationPage(props) {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [major, setMajor] = useState("");
  const [career, setCareer] = useState("");
  const [bio, setBio] = useState("");
  const [zoomLink, setZoomLink] = useState("");

  const [imageFile, setImageFile] = useState(undefined);
  const [transcriptFile, setTranscriptFile] = useState(undefined);

  const [dailyAvailability, setDailyAvailability] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  const handleChangeImage = (event) => {
    if (event.target.files.length > 0 && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setImageFile(imageFile);
    }
  }

  const handleChangeTranscript = (event) => {
    if (event.target.files.length > 0 && event.target.files[0]) {
      const transcriptFile = event.target.files[0];
      setTranscriptFile(transcriptFile);
    }
  }

  const handleDailyAvailabilityChange = (day, selectedOptions) => {
    const selectedTimes = selectedOptions.map((option) => option.value);
    setDailyAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: selectedTimes,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = getDatabase();
    const storage = getStorage();

    // Transcript
    const transcriptRef = storageRef(storage, "mentorTranscripts/" + user.uid + ".pdf");
    await uploadBytes(transcriptRef, transcriptFile);
    const transcriptUrl = await getDownloadURL(transcriptRef);

    // Photo
    const imgFileType = imageFile.name.substring(imageFile.name.indexOf('.'), imageFile.name.length);
    const imageRef = storageRef(storage, "mentorImages/" + user.uid + imgFileType);
    await uploadBytes(imageRef, imageFile);
    const photoUrl = await getDownloadURL(imageRef);

    const mentorRef = ref(db, "mentorApplicants");

    const mentorData = {
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
      photo: photoUrl,
      transcript: transcriptUrl,
      availability: dailyAvailability,
    };

    firebasePush(mentorRef, mentorData)
    .then(() => {
      alert('Application Submitted');
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
    });

    // Reset form fields
    setFirstName("");
    setLastName("");
    setGradYear("");
    setMajor("");
    setCareer("");
    setBio("");
    setZoomLink("");
    setImageFile(null);
    setTranscriptFile(null);

    alert('Application Submitted');
    navigate('/mentors');
  }

  return (
    <div className="application-form">
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


        {/* Transcript */}
        <Form.Group className="mb-3" controlId="transcript">
          <Form.Label>Please upload your transcript <span className="required"> *</span></Form.Label>
          <Form.Control type="file" required onChange={handleChangeTranscript} />
        </Form.Group>

        {/* Photo */}
        <Form.Group className="mb-3" controlId="photo">
          <Form.Label>Please upload a photo of yourself <span className="required"> *</span></Form.Label>
          <Form.Control type="file" name="image" required onChange={handleChangeImage} />
        </Form.Group>

        {/* Daily Availability */}
        <div className="row">
          <div className="col">
            <label htmlFor="mondayAvailability" className="form-label">
              Monday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={dailyAvailability.monday.map((time) => ({ value: time, label: time }))}
              onChange={(selectedOptions) => handleDailyAvailabilityChange('monday', selectedOptions)}
            />
          </div>
          <div className="col">
            <label htmlFor="tuesdayAvailability" className="form-label">
              Tuesday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={dailyAvailability.tuesday.map((time) => ({ value: time, label: time }))}
              onChange={(selectedOptions) => handleDailyAvailabilityChange('tuesday', selectedOptions)}
            />
          </div>
          <div className="col">
            <label htmlFor="wednesdayAvailability" className="form-label">
              Wednesday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={dailyAvailability.wednesday.map((time) => ({ value: time, label: time }))}
              onChange={(selectedOptions) => handleDailyAvailabilityChange('wednesday', selectedOptions)}
            />
          </div>
          <div className="col">
            <label htmlFor="thursdayAvailability" className="form-label">
              Thursday Availability
            </label>
            <Select
             isMulti
             options={timeOptions}
             value={dailyAvailability.thursday.map((time) => ({ value: time, label: time }))}
             onChange={(selectedOptions) => handleDailyAvailabilityChange('thursday', selectedOptions)}
            />
          </div>
          <div className="col">
            <label htmlFor="fridayAvailability" className="form-label">
              Friday Availability
            </label>
            <Select
             isMulti
             options={timeOptions}
             value={dailyAvailability.friday.map((time) => ({ value: time, label: time }))}
             onChange={(selectedOptions) => handleDailyAvailabilityChange('friday', selectedOptions)}
            />
          </div>
        </div>
        
        <div className="col-12 text-center">
          <Button className="submit btn tbn-primary" type="submit">
            Submit application
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default MentorApplicationPage;
