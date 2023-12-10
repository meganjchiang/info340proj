import React, { useState } from 'react'; //import React Component
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

const firebaseUIConfig = {
  signInOptions: [ //array of sign in options supported
    //array can include just "Provider IDs", or objects with the IDs and options
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup', //don't redirect to authenticate
  credentialHelper: 'none', //don't show the email account chooser
  callbacks: { //"lifecycle" callbacks
    signInSuccessWithAuthResult: (authResult) => {

      const isNewUser = authResult.additionalUserInfo.isNewUser;

      if (isNewUser) {
        // User is signing in for the first time
        const user = authResult.user;
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.uid);

        firebaseSet(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: "",
        });
      }

      return false; //don't redirect after authentication


    }
  }
}




// function LoginForm() {

//     const handleSubmit = (event) => {
//         event.preventDefault();

//     }

//     const handleClick = (event) => {
//         console.log("clicked");
//     }

//     return (
//         <div className='form'>
//             {/*  action="login.php" method="POST" */}
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input type="email" className="form-control" placeholder="name@example.com" name="email" id="email" required></input>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" className="form-control" name="password" id="password" required></input>
//                 </div>

//                 <button className="submit btn tbn-primary" type="submit" onClick={handleClick}>Sign In</button>

//             </form>

//         </div>
//     )

// }

export function LoginPage() {

  return (
    <div>
      <div className="login-form">
        <h1>Login/Sign Up</h1>
        <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={firebaseUIConfig} />
      </div>
      <p className='login-p'>Don't have an account? Enter your email to start!</p>
    </div>
  )

}