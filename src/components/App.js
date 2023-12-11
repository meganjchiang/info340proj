import React, { useEffect, useState } from 'react'; //import React Component


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
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebase, getDatabase, get, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';



import mentorData from './MentorApplication.js';
import MENTORS from '../data/mentors.json';
import SAMPLE_MENTORS from '../data/mentorApp.json';
import SAMPLE_PROFILE from '../data/profileData.json';
import SAMPLE_MEETING from '../data/upcomingMeetings.json';






function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState(null);
    const [mentorData, setMentorData] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, function (firebaseUser) {
            console.log("login status changed");
            setCurrentUser(firebaseUser);
            if (firebaseUser) {
                const db = getDatabase();
                const userRef = ref(db, 'users/' + firebaseUser.uid);
                const mentorRef = ref(db, 'allMentors/' + firebaseUser.uid);

                if (userRef) {
                    onValue(userRef, (snapshot) => {
                        const fetchedData = snapshot.val();
                        setUserData(fetchedData);

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
                                }
                            }

                        } else {
                            navigate('/mentors');
                        }
                    })
                } else if (mentorRef) {
                    onValue(mentorRef, (snapshot) => {
                        const fetchedData = snapshot.val();
                        setMentorData(fetchedData);

                        if (fetchedData != null) {
                            // Check if the "role" field is an empty string
                            if (fetchedData.role === "") {
                                // User is logging in for the first time, redirect to /choose-role
                                navigate('/choose-role');
                            } else {
                                navigate('/mentor-profile')
                            }
                        }
                    })
                }

            } else {
                navigate('/home');
            }
        })

    }, [])





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
                    <Route path="/profile" element={<Profile profileData={userData} meetingData={SAMPLE_MEETING} />} />
                    <Route path="/mentor-approval" element={<ApproveAdmin appliedMentors={SAMPLE_MENTORS} />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    <Route path="/mentor-profile" element={<MentorProfile profileData={mentorData}/>} />
                    <Route path="update-mentor-profile" element={<UpdateMentorProfile />} />
                    <Route path="*" element={<Navigate to="/home" />} />
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