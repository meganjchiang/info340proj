import React, { useState } from 'react'; //import React Component

export function NavBar() {
    return (
        <header className='header'>
            <div className='navbar-container'>
                <a href="home.html" className="logo"><img src="img/smile.png" alt="husky to husky logo"></img></a>
                <div className="navbar-profile">
                    <nav className="navbar">
                        <a href="mentor_application.html">Apply</a>
                        <a href="index.html">Mentors</a>
                        <a href="login.html">Login</a>
                    </nav>

                    <div className="hamburger-menu">
                        <img src="img/hamburger.png" alt="hamburger menu icon" className="hamburger"></img>
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="mentor_application.html">Apply</a></li>
                                <li><a href="index.html">Mentors</a></li>
                                <li><a href="login.html">Login</a></li>

                            </ul>
                        </div>
                    </div>

                    <div className="profile-container">
                        <img src="img/profile-user.png" className="profile" alt="profile icon"></img>
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="profile.html">Profile</a></li>
                                <li><a href="appointment.html">Make an Appointment</a></li>
                                <li><a href="mentor_approval.html">Admin</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}