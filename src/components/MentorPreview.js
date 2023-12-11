import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

export function MentorPreview() {
    const params = useParams();
    const userKey = params.firebasekey;
    const [mentor, setMentor] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
        });

        const db = getDatabase();
        const mentorRef = ref(db, 'allMentors/' + userKey);
        
        onValue(mentorRef, function(snapshot) {
            const mentorObj = snapshot.val();
            setMentor(mentorObj);
        })
    }, []);


    return (
        <div>
            <Link className="btn back-to-mentors-btn btn-link text-decoration-none" to="/mentors">&larr; Back to mentors</Link>
            <h1 className="mentor-preview-name">{mentor.first} {mentor.lastn}</h1>
            <div className="row mentor-preview">
                <div className="col">
                    <img src={"/" + mentor.photo} alt={mentor.first + ' ' + mentor.lastn}></img>
                </div>
                <div className="col mentor-preview-info">
                    <p><span className="info-label">Career:</span> {mentor.career}</p>
                    <p><span className="info-label">Major:</span> {mentor.degree}</p>
                    <p><span className="info-label">Graduation Year:</span> {mentor.gradYear}</p>
                    <p className="mentor-description">{mentor.bio}</p>
                    {isLoggedIn ? (
                        <Link className="btn appt-btn" to={"./book-appointment"}>Book an appointment</Link>
                    ): (
                        <>
                        
                        <Link className="btn appt-btn" to={"/login"}>Login</Link>
                       
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    );
  }