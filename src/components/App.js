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




function App(props) {
    const [selectedCareer, setSelectedCareer] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedGradYear, setSelectedGradYear] = useState('');

    // source: problem-c from Problem Set 07
    const uniqueCareers = [...new Set(MENTORS.reduce((all, current) => {
        return all.concat([current.career]);
    }, []))].sort();

    const uniqueMajors = [...new Set(MENTORS.reduce((all, current) => {
        return all.concat([current.major]);
    }, []))].sort();

    const uniqueGradYears = [...new Set(MENTORS.reduce((all, current) => {
        return all.concat([current.grad_year]);
    }, []))].sort();

    let displayedMentors = MENTORS;

    if (selectedCareer !== '') {
        displayedMentors = MENTORS.filter((mentor) => {
            const careers = mentor.career === selectedCareer;
            return careers;
        });
    }

    if (selectedMajor !== '') {
        displayedMentors = displayedMentors.filter((mentor) => {
            const majors = mentor.major === selectedMajor;
            return majors;
        });
    }

    if (selectedGradYear !== '') {
        displayedMentors = displayedMentors.filter((mentor) => {
            const gradYear = mentor.grad_year === selectedGradYear;
            return gradYear;
        });
    }

    const applyFilter = (selectedCareer, selectedMajor, selectedGradYear) => {
        setSelectedCareer(selectedCareer);
        setSelectedMajor(selectedMajor);
        setSelectedGradYear(selectedGradYear);
    };

    return (
        <div>

            <header>
                <NavBar />
            </header>

            <main>
                {/* < Home /> */}
                {/* < LoginPage /> */}
                {/* <CreateAccountPage /> */}
                <MentorGrid
                    mentors={displayedMentors}
                    careerOptions={uniqueCareers}
                    majorOptions={uniqueMajors}
                    gradYearOptions={uniqueGradYears}
                    applyFilterCallback={applyFilter} />
                {/* <MentorApplicationPage />
                <Appointment />
                <ApproveAdmin appliedMentors={SAMPLE_MENTORS} />*/}
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