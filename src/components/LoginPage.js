import React, { useState } from 'react'; //import React Component
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm() {
    return (
        <div>
            <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" name="email" id="email" required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" name="password" id="password" placeholder="Password" required/>
            </Form.Group>
            <Button className="submit btn tbn-primary" type="submit">Sign In</Button>
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