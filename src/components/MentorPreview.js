import React from 'react';
import { useParams, Link } from 'react-router-dom';
import _ from 'lodash';

import mentors from '../data/mentors.json';

export function MentorPreview(props) {
    const params = useParams();
    const mentorNetID = params.mentorNetID;
  
    // source: problem-a from Problem Set 8
    let mentor =  _.find(mentors, {netID: mentorNetID}); 
    if(!mentor) {
        return <h2>No mentor specified</h2> //if unspecified
    }

    return (
        <div>
            <Link className="btn back-to-mentors-btn btn-link text-decoration-none" to="/mentors">&larr; Back to mentors</Link>
            <h1 className="mentor-preview-name">{mentor.first_name} {mentor.last_name}</h1>
            <div className="row mentor-preview">
                <div className="col">
                    <img src={"/" + mentor.img} alt={mentor.first_name + ' ' + mentor.last_name}></img>
                </div>
                <div className="col mentor-preview-info">
                    <p><span className="info-label">Career:</span> {mentor.career}</p>
                    <p><span className="info-label">Major:</span> {mentor.major}</p>
                    <p><span className="info-label">Graduation Year:</span> {mentor.grad_year}</p>
                    <p className="mentor-description">{mentor.bio}</p>
                    <Link className="btn appt-btn" to={"./book-appointment"}>Book an appointment</Link>
                </div>
            </div>
        </div>
    );
  }