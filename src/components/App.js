import React, { useState } from 'react'; //import React Component

// import statements
import { MentorGrid } from './Mentors.js';
import { LoginPage } from './LoginPage.js';
import { CreateAccountPage } from './CreateAccount.js';
import { MentorApplicationPage } from './Mentor_Application.js'
import { Appointment } from './Appointment.js';
import { ApproveAdmin } from './Approve_Admin.js';
import SAMPLE_MENTORS from '../data/mentorApp.json';

import MENTORS from '../data/mentors.json';




function App(props) {

    return (
        <div>

            <header>
                {/* {nav bar} */}
            </header>

            <main>
                {/* < LoginPage /> */}
                {/* <CreateAccountPage /> */}
                {/* <MentorGrid mentors={MENTORS} /> */}
                {/* <MentorApplicationPage /> */}
                {/* <Appointment /> */}
                <ApproveAdmin appliedMentors={SAMPLE_MENTORS} />

            </main>

            <footer>
                <p>&copy; 2023 INFO 340</p>
            </footer>
        </div>
    )
}

export default App;