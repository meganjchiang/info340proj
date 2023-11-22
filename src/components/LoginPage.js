import React, { useState } from 'react'; //import React Component

function LoginForm() {

    const handleClick = (event) => {
        console.log("clicked");
    }

    return (
        <div className='form'>
            <form id="login-form" action="login.php" method="POST">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="name@example.com" name="email" id="email"
                        required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" required></input>
                </div>

                <button className="submit btn tbn-primary" type="submit" onClick={handleClick}>Sign In</button>
     
            </form>
           
        </div>
    )

}

export function LoginPage() {

    return (
        <div>
            <div className="login-form">
                <h1>Login</h1>
                <LoginForm />
            </div>
            <p className='login-p'>Don't have an account? Sign up as a <a href="student_application.html">student</a> or apply to be a <a href="mentor_application.html">mentor</a></p>
        </div>
    )

}