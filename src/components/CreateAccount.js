import React, { useState } from 'react'; //import React Component
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue} from 'firebase/database';

function CreateAccountForm() {

    const [firstn, setFirstN] = useState("");
    const [lastn, setLastN] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [major, setMajor] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // add data to database
        const db = getDatabase();
        const studentRef = ref(db, "allStudent");
        // firebaseSet(studentRef, {"email": email, "password":password});
        firebasePush(studentRef, {"firstn": firstn, "lastn": lastn, "gradYear": gradYear, "major": major, "email": email, "password":password})
        .then( () => {
            // for now, but it should redirect to... home page?
            alert('Account Created!');
        })
        .catch((error) => {
            alert(error)
        })

        // reset
        setFirstN("");
        setLastN("");
        setGradYear("");
        setMajor("");
        setEmail("");
        setPassword("");
    }

    const handleClick = () => {
        console.log('clicked');
    }

    return(
    <form className='application-form' onSubmit={handleSubmit}>
        <div className="container">
            <div className='row'>
                <div className="col">
                    <label htmlFor="first-name" className="form-label">First Name <span className="required"> *</span></label>
                    <input type="text" className="form-control" onChange={(e) => setFirstN(e.target.value)} value={firstn} name="first-name" id="first-name" required></input>
                </div>

                <div className="col">
                    <label htmlFor="last-name" className="form-label">Last Name<span className="required"> *</span></label>
                    <input type="text" className="form-control" onChange={(e) => setLastN(e.target.value)} value={lastn} id="last-name" required></input>
                </div>
            </div>

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

            <div className="row">
                <div className="col-12">
                    <label htmlFor="email-new" className="form-label">Email address<span className="required"> *</span></label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="name@example.com" name="email-new" id="email-new"
                        required></input>
                </div>
            </div>
            <div className="col-7 mb-3">
                <label htmlFor="password-new" className="form-label">Password<span className="required"> *</span></label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} name="password-new" id="password-new" required></input>
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