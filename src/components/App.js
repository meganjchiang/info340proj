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
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebase, getDatabase, get, ref, set as firebaseSet, push as firebasePush, onValue, set } from 'firebase/database';



import mentorData from './MentorApplication.js';
import MENTORS from '../data/mentors.json';
import SAMPLE_MENTORS from '../data/mentorApp.json';
import SAMPLE_PROFILE from '../data/profileData.json';
import SAMPLE_MEETING from '../data/upcomingMeetings.json';



function App() {
    const [currentUser, setCurrentUser] = useState(null);
    console.log("after first useState():", currentUser);
    const [userData, setUserData] = useState();
    const [mentorData, setMentorData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, function (firebaseUser) {
            console.log("login status changed");

            if (firebaseUser) {

                setCurrentUser(firebaseUser);
                console.log('logged in as', firebaseUser.displayName);
                console.log('firebaseUser.uid:', firebaseUser.uid)
                navigate('/mentors');

            } else {
                console.log("logged out");
                setCurrentUser(null);
                navigate('/home')
            }


        });
        console.log("working");
  

    }, []);

    console.log("after first useEffect():", currentUser);


    useEffect(() => {

        if (!currentUser) return; // Don't proceed if no user

        const auth = getAuth();
        console.log(auth);
        // const user = auth.currentUser;
        // console.log(user.uid);
      
        const db = getDatabase();
        const userRef = ref(db, 'users/' + currentUser.uid);


        onValue(userRef, (snapshot) => {
            const fetchedData = snapshot.val();

            if (fetchedData != null) {
                console.log("is not null")
                // Check if the "role" field is an empty string
                if (fetchedData.role === "") {
                    // User is logging in for the first time, redirect to /choose-role
                    navigate('/choose-role');
                    console.log('role is empty');
                } else {
                    // User has a role, redirect accordingly
                    if (fetchedData.role === "student") {
                        console.log('role is student');
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





    // if (userRef) {

    //     onValue(userRef, (snapshot) => {
    //         const fetchedData = snapshot.val();
    //         setUserData(fetchedData);
    //         console.log(userData);

    //         if (fetchedData != null) {
    //             console.log("is not null")
    //             // Check if the "role" field is an empty string
    //             if (fetchedData.role === "") {
    //                 // User is logging in for the first time, redirect to /choose-role
    //                 navigate('/choose-role');
    //                 console.log('role is empty')
    //             } else {
    //                 // User has a role, redirect accordingly
    //                 if (fetchedData.role === "student") {
    //                     console.log('role is student');
    //                     navigate('/mentors');
    //                 } else if (fetchedData.role === "admin") {
    //                     navigate('/mentor-approval')
    //                 }
    //             }

    //         } else {
    //             navigate('/mentors');
    //         }
    //     })
    // } else if (mentorRef) {
    //     onValue(mentorRef, (snapshot) => {
    //         const fetchedData = snapshot.val();
    //         setMentorData(fetchedData);

    //         if (fetchedData != null) {
    //             // Check if the "role" field is an empty string
    //             if (fetchedData.role === "") {
    //                 // User is logging in for the first time, redirect to /choose-role
    //                 navigate('/choose-role');
    //             } else {
    //                 navigate('/mentor-profile')
    //             }
    //         }
    //     })
    // }








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
                    <Route path="/profile" element={<Profile meetingData={SAMPLE_MEETING} />} />
                    <Route path="/mentor-approval" element={<ApproveAdmin appliedMentors={SAMPLE_MENTORS} />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    <Route path="/mentor-profile" element={<MentorProfile profileData={mentorData} />} />
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