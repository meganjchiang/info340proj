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

            <header>
                <NavBar />
            </header>

            <main>
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