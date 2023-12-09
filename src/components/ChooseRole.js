import React, { useState } from 'react'; //import React Component
import { NavLink } from 'react-router-dom'

export function ChooseRole() {
    const [role, setRole] = useState("");

    return (
        <div>
            <div className="choose-role">
                <h1>Are you a Student or a Mentor?</h1>

                <div className="role-buttons">
                    <input type="radio" className="btn-check" onChange={() => setRole("student")} name="options-base" id="option1" autoComplete="off"></input>
                    <label className="btn role btn-outline-primary" htmlFor="option1">Student</label>

                    <input type="radio" className="btn-check" onChange={() => setRole("mentor")}name="options-base" id="option2" autoComplete="off"></input>
                    <label className="btn role btn-outline-primary" htmlFor="option2">Mentor</label>
                </div>

                <NavLink to="/create-account" className="next">Next &raquo;</NavLink>


            </div>


        </div>
    )

}