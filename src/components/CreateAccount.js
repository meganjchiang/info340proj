import React, { useEffect, useState } from 'react'; //import React Component
import { useNavigate, useLocation } from 'react-router-dom'
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function CreateAccountForm() {

    const navigate = useNavigate();

    const [firstn, setFirstN] = useState("");
    const [lastn, setLastN] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [major, setMajor] = useState("");
    const [bio, setBio] = useState("");
    const [interests, setInterests] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;

    const handleSubmit = (event) => {
        event.preventDefault();

       // add data to database
        const db = getDatabase();
        const userRef = ref(db, "users/" + user.uid);

        const userData = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            role: "student",
            firstName: firstn,
            lastName: lastn,
            gradYear: gradYear,
            major: major,
            bio: bio,
            interests: interests
        };

        console.log(userData);

        // Use set with the updated data
        firebaseSet(userRef, userData)
            .then(() => {
                navigate('/mentors');
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    }

    const handleClick = () => {
        console.log('clicked');
    }

    return (
        <form className='application-form' onSubmit={handleSubmit}>
            {/* <div className="container"> */}
                <div className='row'>
                    <div className="col">
                        <label htmlFor="first-name" className="form-label">First Name <span className="required"> *</span></label>
                        <input type="text" className="form-control" onChange={(e) => setFirstN(e.target.value)} value={firstn} name="first-name" id="first-name" required></input>
                    </div>

                    <div className="col">
                        <label htmlFor="last-name" className="form-label">Last Name<span className="required"> *</span></label>
                        <input type="text" className="form-control" onChange={(e) => setLastN(e.target.value)} value={lastn} id="last-name" required></input>
                    </div>
                {/* </div> */}

                <div className='row'>
                    <div className="col">
                        <label htmlFor="grad-year" className="form-label">Intended Graduation Year<span className="required"> *</span></label>
                        <input type="text" className="form-control" onChange={(e) => setGradYear(e.target.value)} value={gradYear} placeholder="example: 2024" name="grad-year" id="grad-year"
                            required></input>
                    </div>

                    <div className="col">
                        <label htmlFor="major-new" className="form-label">Major/Intended Major<span className="required">
                            *</span></label>
                        <input type="text" className="form-control" onChange={(e) => setMajor(e.target.value)} value={major} name="major-new" id="major-new" required></input>
                    </div>
                </div>

                    <div className="col-12 mb-3">
                        <label htmlFor="interests" className="form-label">Interests<span className="required">
                            *</span></label>
                        <input type="text" className="form-control" onChange={(e) => setInterests(e.target.value)} value={interests} name="interests" id="interests" required></input>
                    </div>

                    <div className="col-12 mb-3">
                        <label htmlFor="bio" className="form-label">About Me Summary<span className="required">
                            *</span></label>
                        <input type="text" className="form-control" onChange={(e) => setBio(e.target.value)} value={bio} name="bio" id="bio" required></input>
                    </div>
          

                <div className="col-12 text-center">
                    <button className="submit btn tbn-primary" type="submit" onClick={handleClick}>Submit</button>
                </div>
            </div>
        </form >
    );

}



export function CreateAccountPage() {

    return (
        <div className="create-acount">
            <h1>Create an account!</h1>
            <CreateAccountForm />
        </div>
    )


}