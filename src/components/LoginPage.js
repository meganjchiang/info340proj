import React, { useState } from 'react'; //import React Component

function LoginForm() {
    return (
        <div>
             <form id="login-form" action="login.php" method="POST">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" placeholder="name@example.com" name="email" id="email"
                    required></input>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" id="password" required></input>
            </div>
            <button class="submit" type="submit">Sign In</button>
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