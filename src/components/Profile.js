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
        <div>
            <div>
                <h1 className="headingProfile"> Profile</h1>
            </div>
            <div className="aboutMeAll">


                <div className="extraInfo">
                    <p className="nameProfile">{name}</p>
                    <p>Major: <em>{major}</em></p>
                    <p>Grad Year: <em>{gradYear}</em></p>
                    <p>Interests: <em>{interests}</em></p>
                    

                </div>
                <div className="aboutMe">
                    <p className="bio">About Me!</p>
                    <p>{bio}</p>

                </div>


            </div>

            <div className="text-center">
                <button className="submit" type="submit"><a href="update_profile.html" >Update Profile</a></button>
            </div>

            <h2 className="upcomingMeeting"> Upcoming Meetings </h2>
            {/* Upcoming meetings */}
            <div>
                {meetingSchedule}
            </div>
            
        </div>
    )
}