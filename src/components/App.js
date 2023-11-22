import React, { useState } from 'react'; //import React Component

// import statements
import { MentorGrid } from './Mentors.js';
import { LoginPage } from './LoginPage.js';
import { CreateAccountPage } from './CreateAccount.js';
import { MentorApplicationPage } from './Mentor_Application.js'
import { Appointment } from './Appointment.js';
import { ApproveAdmin } from './Approve_Admin.js';
import { Profile } from './Profile.js';
import SAMPLE_MENTORS from '../data/mentorApp.json';
import SAMPLE_PROFILE from '../data/profileData.json'

import MENTORS from '../data/mentors.json';




function App(props) {
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedGradYear, setSelectedGradYear] = useState('');

    // source: problem-c from Problem Set 07
    const uniqueIndustries = [...new Set(MENTORS.reduce((all, current) => {
        return all.concat([current.industry]);
      }, []))].sort();

    const uniqueMajors = [...new Set(MENTORS.reduce((all, current) => {
        return all.concat([current.major]);
      }, []))].sort();

    const uniqueGradYears = [...new Set(MENTORS.reduce((all, current) => {
        return all.concat([current.grad_year]);
      }, []))].sort();
    
    let displayedMentors = MENTORS;

    if (selectedIndustry != '') {
        displayedMentors = MENTORS.filter((mentor) => {
            const industries = mentor.industry == selectedIndustry;
            return industries;
        });
    }

    if (selectedMajor != '') {
        displayedMentors = displayedMentors.filter((mentor) => {
            const majors = mentor.major == selectedMajor;
            return majors;
        });
    }

    if (selectedGradYear != '') {
        displayedMentors = displayedMentors.filter((mentor) => {
            const gradYear = mentor.grad_year == selectedGradYear;
            return gradYear;
        });
    }

    const applyFilter = (selectedIndustry, selectedMajor, selectedGradYear) => {
        setSelectedIndustry(selectedIndustry);
        setSelectedMajor(selectedMajor);
        setSelectedGradYear(selectedGradYear);
    };

    return (
        <div>

            <header>
                {/* {nav bar} */}
            </header>

            <main>
                {/* < LoginPage /> */}
                {/* <CreateAccountPage /> */}
                <MentorGrid
                    mentors={displayedMentors}
                    industryOptions={uniqueIndustries}
                    majorOptions={uniqueMajors}
                    gradYearOptions={uniqueGradYears}
                    applyFilterCallback={applyFilter} />
                {/* <MentorApplicationPage /> */}
                {/* <Appointment /> */}
                {/* <ApproveAdmin appliedMentors={SAMPLE_MENTORS} /> */}
                {/* <Profile profileData={SAMPLE_PROFILE}/> */}
            </main>

            <footer>
                <p>&copy; 2023 INFO 340</p>
            </footer>
        </div>
    )
}

export default App;