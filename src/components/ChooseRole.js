import React, { useState } from 'react'; //import React Component
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function ChooseRole() {
    const [role, setRole] = useState("");
    const auth = getAuth();
    const user = auth.currentUser;

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // fetch userData from db
        const db = getDatabase();
        let userRef = null;

        if (role == "student") {
            userRef = ref(db, "users/" + user.uid);
        } else if (role == "mentor") {
            userRef = ref(db, "mentorApplicants/" + user.uid)
        }
        
        const userDataUpdate = {
            displayName: user.displayName,
            email: user.email,
            role: role,
            uid: user.uid
        };

        if (role !== "") {
            userDataUpdate.role = role;
        }

        // Use set with the updated data directly
        firebaseSet(userRef, userDataUpdate)
            .then(() => {
                if (role === "") {
                    alert("Please choose a role before proceeding");
                } else if (role == "student" ){
                    navigate('/create-account');
                } else if (role == "mentor") {
                    navigate('/mentor-application');
                }
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });



    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Are you a Student or a Mentor?</h1>

                <div className="role-buttons">
                    <input type="radio" className="btn-check" onChange={handleChange} value="student" name="options-base" id="option1" autoComplete="off"></input>
                    <label className="btn role" htmlFor="option1"><img src="img/student.png" alt="Student" /><p>Student</p></label>

                    <input type="radio" className="btn-check" onChange={handleChange} value="mentor" name="options-base" id="option2" autoComplete="off"></input>
                    <label className="btn role" htmlFor="option2"><img src="img/mentor.png" alt="Mentor" /><p>Mentor</p></label>
                </div>

                <div className="btn-link">
                    <button type="submit" class="btn btn-link">Next &raquo;</button>
                </div>

            </form>
        </div >

    )

}