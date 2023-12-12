import React, { useEffect, useReducer, useState } from 'react'; //import React Component
import { useParams } from 'react-router-dom';


// import statements
import { MentorGrid } from './Mentors.js';
import { MentorPreview } from './MentorPreview.js';
import { LoginPage } from './LoginPage.js';
import { ChooseRole } from './ChooseRole.js';
import { CreateAccountPage } from './CreateAccount.js';
import { MentorApplicationPage } from './MentorApplication.js'
import { Appointment } from './Appointment.js';
import { ApproveAdmin } from './AdminMentorApproval.js';
import { Profile } from './Profile.js';
import { Home } from './Home.js';
import { NavBar } from './NavigationBar';
import { UpdateProfile } from "./UpdateProfile.js"
import { UpdateMentorProfile } from './UpdateMentorProfile.js';
import { MentorProfile } from './MentorProfile.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';



import mentorData from './MentorApplication.js';
import MENTORS from '../data/mentors.json';
import SAMPLE_MENTORS from '../data/mentorApp.json';
import SAMPLE_PROFILE from '../data/profileData.json';
import SAMPLE_MEETING from '../data/upcomingMeetings.json';



function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, function (firebaseUser) {

            if (firebaseUser) {
                setCurrentUser(firebaseUser);
                navigate('/mentors');

            } else {
                setCurrentUser(null);
                navigate('/home')
            }


        });


    }, []);



    useEffect(() => {

        if (!currentUser) return; // Don't proceed if no user

        const auth = getAuth();

        const db = getDatabase();
        const userRef = ref(db, 'users/' + currentUser.uid);


        onValue(userRef, (snapshot) => {
            const fetchedData = snapshot.val();

            if (fetchedData != null) {

                // Check if the "role" field is an empty string
                if (fetchedData.role === "") {
                    // User is logging in for the first time, redirect to /choose-role
                    navigate('/choose-role');
                } else {
                    // User has a role, redirect accordingly
                    if (fetchedData.role === "student") {
                        navigate('/mentors');
                    } else if (fetchedData.role === "admin") {
                        navigate('/mentor-approval')
                    } else if (fetchedData.role === "mentor") {
                        navigate('/mentor-profile')
                    }
                }

            } else {
                navigate('/mentors');
            }
        })


    }, [currentUser]);






    return (
        <div>
            <NavBar currentUser={currentUser} />

            <main>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/mentor-application" element={<MentorApplicationPage />} />
                    <Route path="/mentors" element={<MentorGrid />} />
                    <Route path="/mentors/:firebasekey" element={<MentorPreview />} />
                    <Route path="/mentors/:firebasekey/book-appointment" element={<Appointment />} />
                    <Route path="/login" element={< LoginPage />} />
                    <Route path="/choose-role" element={< ChooseRole />} />
                    <Route path="/profile" element={<Profile currentUser={currentUser} meetingData={SAMPLE_MEETING} />} />
                    <Route path="/mentor-approval" element={<ApproveAdmin appliedMentors={SAMPLE_MENTORS} />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                    <Route path="/update-profile" element={<UpdateProfile currentUser={currentUser} />} />
                    <Route path="/mentor-profile" element={<MentorProfile />} />
                    <Route path="update-mentor-profile" element={<UpdateMentorProfile />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>


            </main>

            <footer>
                <p>&copy; 2023 INFO 340</p>
            </footer>
        </div>
    )
}

export default App;