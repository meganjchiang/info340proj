import React from "react";
import Card from 'react-bootstrap/Card';

export function Profile(props) {
    const dataProfile = props.profileData;
    const name = dataProfile[0].name;
    const bio = dataProfile[0].bio;
    const interests = dataProfile[0].interests;
    const major = dataProfile[0].major;
    const gradYear = dataProfile[0].grad_year;

    
    
    
    const profileBio = dataProfile.map((mentor, index) => {
        const returnTable = (
            <div>hi </div>
        )
        return returnTable;
        
    })
    return (
        <div>
            <div>
                <h1 className="headingProfile"> Profile</h1>
            </div>
            <div className="aboutMeAll">


                <div className="extraInfo">
                    <p className="nameProfile">{name}</p>
                    <p>Freshman: <em>{major}</em></p>
                    <p>Interests: <em>{interests}</em></p>
                    <p>Grad Year: <em>{gradYear}</em></p>

                </div>



                <div className="aboutMe">
                    <p className="bio">About Me!</p>
                    <p>Hey, I'm Emily, and I'm at that crossroads where I need to figure out what major to dive into. Volleyball
                        and singing? They're my jam! Volleyball has taught me teamwork and discipline, and singing is where I
                        let loose. Now, I'm on a mission to find a major that lets me blend both of these worlds, whether it's
                        sports management, sports science, or maybe even music therapy. I'm all ears for any advice or insights
                        you've got, and let's tackle this academic journey together, with volleyball and singing as my trusty
                        guides.
                    </p>

                </div>


            </div>

            <div className="text-center">
                <button className="submit" type="submit"><a href="update_profile.html" >Update Profile</a></button>
            </div>

            <h2 className="upcomingMeeting"> Upcoming Meetings </h2>
            {/* Upcoming meetings */}
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>9/24/22</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Steve Singh</Card.Subtitle>
                    <Card.Text>
                        Advise on Career Path in Software Engineering
                    </Card.Text>
                    <Card.Link href="#">Meeting link</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}