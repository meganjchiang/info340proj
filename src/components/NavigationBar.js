import React, { useState, useEffect } from 'react'; //import React Component
import { NavLink, Routes, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';


export function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
        })
    }, []);

    const handleSignOut = (event) => {
        event.preventDefault();
        console.log("Signing Out");
        signOut(getAuth());
    }





    return (
        <header className='header'>
            <div className='navbar-container'>
                <NavLink to="/home" className="logo"><img src="img/smile.png" alt="husky to husky logo"></img></NavLink>
                <div className="navbar-profile">
                    <nav className="navbar">
                        <NavLink to="/mentor-application">Apply</NavLink>
                        <NavLink to="/mentors">Mentors</NavLink>
                        {/* https://legacy.reactjs.org/docs/conditional-rendering.html - referenced this website */}
                        {isLoggedIn ? (
                            <>
                                <div className="hamburger-menu">
                                    <img src="img/hamburger.png" alt="hamburger menu icon" className="hamburger"></img>
                                    <div className="dropdown-menu navbar">
                                        <ul>
                                            <li><NavLink className="navbar-brand apply-nav" to="/mentor-application">Apply</NavLink></li>
                                            <li><NavLink className="navbar-brand mentors-nav" to="/mentors">Mentors</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="profile-container">
                                    <img src="img/profile-user.png" className="profile" alt="profile icon"></img>
                                    <div className="dropdown-menu navbar">
                                        <ul>
                                            <NavLink className="navbar-brand profile-nav" to="/profile">Profile</NavLink>
                                            <NavLink className="navbar-brand admin-nav" to="/mentor-approval">Admin</NavLink>
                                            <NavLink to="/" onClick={handleSignOut}>Sign Out</NavLink>
                                        </ul>
                                    </div>
                                </div>

                            </>
                        ) : (
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <div className="hamburger-menu">
                                    <img src="img/hamburger.png" alt="hamburger menu icon" className="hamburger"></img>
                                    <div className="dropdown-menu navbar">
                                        <ul>
                                            <li><NavLink className="navbar-brand apply-nav" to="/mentor-application">Apply</NavLink></li>
                                            <li><NavLink className="navbar-brand mentors-nav" to="/mentors">Mentors</NavLink></li>
                                            <NavLink to="/login">Login</NavLink>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                    </nav>




                </div>
            </div>
        </header>
    )
}