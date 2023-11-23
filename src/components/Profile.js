import React from "react";
import Card from 'react-bootstrap/Card';

export function Profile(props) {
    const dataProfile = props.profileData;
    const name = dataProfile[0].name;
    const bio = dataProfile[0].bio;
    const interests = dataProfile[0].interests;
    const major = dataProfile[0].major;
    const gradYear = dataProfile[0].grad_year;


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
                        <p className="name-profile special-title">{name}</p>
                        <p>Major: <em>{major}</em></p>
                        <p>Grad Year: <em>{gradYear}</em></p>
                        <p>Interests: <em>{interests}</em></p>


                    </div>
                    <div className="bio">
                        <p className="special-title col-md-9">About Me!</p>
                        <p>{bio}</p>


                    </div>

                </div>
                <div>
                    <div className="text-center">
                        <button className="submit btn tbn-primary" type="submit">Edit Profile</button>
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