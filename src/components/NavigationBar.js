import React, { useState } from 'react'; //import React Component
import { NavLink, Routes } from 'react-router-dom'

export function NavBar() {
    return (
        <header className='header'>
            <div className='navbar-container'>
                <NavLink to="/home" className="logo"><img src="img/smile.png" alt="husky to husky logo"></img></NavLink>
                {/* <a href="home.html" className="logo"><img src="img/smile.png" alt="husky to husky logo"></img></a> */}
                <div className="navbar-profile">
                    <nav className="navbar">
                        <NavLink to="/mentor-application">Apply</NavLink>
                        <NavLink to="/mentors">Mentors</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </nav>

                    <div className="hamburger-menu">
                        <img src="img/hamburger.png" alt="hamburger menu icon" className="hamburger"></img>
                        <div className="dropdown-menu">
                            <ul>
                                <li><NavLink to="/mentor-application">Apply</NavLink></li>
                                <li><NavLink to="/mentors">Mentors</NavLink></li>
                                <li><NavLink to="/login">Login</NavLink></li>

                            </ul>
                        </div>
                    </div>

                    <div className="profile-container">
                        <img src="img/profile-user.png" className="profile" alt="profile icon"></img>
                        <div className="dropdown-menu navbar">
                            <ul>
                                <NavLink className="navbar-brand profile-nav" to="/profile">Profile</NavLink>
                                {/* <NavLink to="/book-appointment">Make an Appointment</NavLink> */}
                                <NavLink className="navbar-brand admin-nav" to="/mentor-approval">Admin</NavLink>
                                {/* <li><a href="profile.html">Profile</a></li>
                                <li><a href="appointment.html">Make an Appointment</a></li>
                                <li><a href="mentor_approval.html">Admin</a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}