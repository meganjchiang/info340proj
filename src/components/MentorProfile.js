import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function MentorProfile(props) {
 
  // const params = useParams();
  // const userKey = params.firebasekey;
  const [mentor, setMentor] = useState('')
  const [meetingData, setMeetingData]= useState([])

  const auth = getAuth();
  const user = auth.currentUser;
  console.log("user", user);

  useEffect(() => {

    if (!user) return; // Don't proceed if no user
    

    // const auth = getAuth();
    const db = getDatabase();
    const mentorRef = ref(db, 'allMentors/' + user.uid);
    onValue(mentorRef, function(snapshot) {
      const mentorObj = snapshot.val();
      setMentor(mentorObj);
  })
  const appointmentRef = ref(db, 'appointments/' + user.uid);
    onValue(appointmentRef, function(snapshot){
      const appointmentObj = snapshot.val();
      setMeetingData(appointmentObj);
    })
    console.log(appointmentRef);
  }, [])


  

  const meetingSchedule = meetingData.map((meet, index) => {
    const returnMeetings = (
      <div key={index}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{meetingData[0].date}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {meetingData[0].mentor}
            </Card.Subtitle>
            <Card.Text>{meetingData[0].reason}</Card.Text>
            <Card.Link href={meetingData[0].link}>Meeting Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
    return returnMeetings;
  });

  return (
    <div className="mentor-profile">
      <div>
        <h1 className="profile-heading"> Profile</h1>
      </div>
      <div className="row container">
        <div className="about-me-all">
          <div className="extra-info col-md-6">
            <p className="name-profile special-title">{mentor.firstName}</p>
            <p>
              Major: <em>{mentor.major}</em>
            </p>
            <p>
              Grad Year: <em>{mentor.gradYear}</em>
            </p>
            <p>
              Career: <em>{mentor.career}</em>
            </p>
          </div>
          <div className="bio">
            <p className="special-title col-md-9">Bio!</p>
            <p>{mentor.bio}</p>
          </div>
        </div>
        <div>
          <div className="text-center">
            {/* <button className="submit btn tbn-primary" type="submit">Edit Profile</button> */}
            <Link to="/update_mentor_profile" className="submit btn tbn-primary">
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="row container ">
          <div className="upcoming-meetings col-md-11">
            <p className="special-title"> Upcoming Meetings </p>
            {/* Upcoming meetings */}
            {meetingSchedule}
          </div>
        </div>
      </div>
    </div>
  );
}
