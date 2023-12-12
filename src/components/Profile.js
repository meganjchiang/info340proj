import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';


export function Profile(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [major, setMajor] = useState("");
    const [interests, setInterests] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const user = props.currentUser;

    useEffect(() => {

        if (!user) return; // Don't proceed if no user

        const db = getDatabase();
        const userRef = ref(db, "users/" + user.uid);

        onValue(userRef, (snapshot) => {
            const dataProfile = snapshot.val();
            console.log("?", dataProfile);
            setFirstName(dataProfile.firstName);
            setLastName(dataProfile.lastName);
            setGradYear(dataProfile.gradYear);
            setMajor(dataProfile.major);
            setInterests(dataProfile.interests);
            setAboutMe(dataProfile.bio);
        },);
    
    
    }, [user]);


  


    const meetingData = props.meetingData;
    console.log(meetingData);

    const meetingSchedule = meetingData.map((meet, index) => {
        const returnMeetings = (
            <div key={index}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{meetingData[0].date}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{meetingData[0].mentor}</Card.Subtitle>
                        <Card.Text>
                            {meetingData[0].reason}
                        </Card.Text>
                        <Card.Link href={meetingData[0].link}>Meeting Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        )
        return returnMeetings;

    })


    return (
        <div className="profile-page">
            <div>
                <h1 className="profile-heading"> Profile</h1>
            </div>
            <div className="row container">
                <div className="about-me-all">
                    <div className="extra-info col-md-6">
                        <p className="name-profile special-title">{firstName + " " + lastName}</p>
                        <p>Major: <em>{major}</em></p>
                        <p>Grad Year: <em>{gradYear}</em></p>
                        <p>Interests: <em>{interests}</em></p>


                    </div>
                    <div className="bio">
                        <p className="special-title col-md-9">About Me!</p>
                        <p>{aboutMe}</p>


                    </div>

                </div>
                <div>
                    <div className="text-center">
                        {/* <button className="submit btn tbn-primary" type="submit">Edit Profile</button> */}
                        <Link to="/update-profile" className="submit btn tbn-primary">Edit Profile</Link>
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
    )
}