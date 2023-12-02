import React, { useState } from 'react'; //import React Component


// import statements
import { MentorGrid } from './Mentors.js';
import { LoginPage } from './LoginPage.js';
import { CreateAccountPage } from './CreateAccount.js';
import { MentorApplicationPage } from './MentorApplication.js'
import { Appointment } from './Appointment.js';
import { ApproveAdmin } from './AdminMentorApproval.js';
import { Profile } from './Profile.js';
import { Home } from './Home.js';
import { NavBar } from './NavigationBar';
import { UpdateProfile } from "./UpdateProfile.js"
import { Routes, Route, Link, Navigate } from 'react-router-dom'


import MENTORS from '../data/mentors.json';
import SAMPLE_MENTORS from '../data/mentorApp.json';
import SAMPLE_PROFILE from '../data/profileData.json';
import SAMPLE_MEETING from '../data/upcomingMeetings.json';


// function UserLayout() {
//     return ( 
//         <div className="user-layout">
//         <NavBar />
//         < Home />
//         </div>
//     )
// }

function App() {
    return (
        <div>
            <NavBar />

            <main>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/mentor-application" element={<MentorApplicationPage />} />
                    <Route path="/mentors" element={<MentorGrid mentors={MENTORS} />} />
                    <Route path="/login" element={< LoginPage />} />
                    <Route path="/profile" element={<Profile profileData={SAMPLE_PROFILE} meetingData={SAMPLE_MEETING} />} />
                    <Route path="/book-appointment" element={<Appointment />} />
                    <Route path="/mentor-approval" element={<ApproveAdmin appliedMentors={SAMPLE_MENTORS} />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                </Routes>

                {/* < Home /> */}
                {/* < LoginPage /> */}
                {/* <CreateAccountPage /> */}
                {/* <MentorGrid mentors={MENTORS} /> */}
                {/* <MentorApplicationPage /> */}
                {/* <Appointment /> */}
                {/* <ApproveAdmin appliedMentors={SAMPLE_MENTORS} /> */}
                {/* <Profile profileData={SAMPLE_PROFILE} meetingData={SAMPLE_MEETING}/>  */}
                {/* <UpdateProfile/>  */}


            </main>

            <footer>
                <p>&copy; 2023 INFO 340</p>
            </footer>
        </div>
    )
}

export default App;