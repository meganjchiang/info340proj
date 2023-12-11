import React, { useState } from 'react'; //import React Component
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';


export function LoginPage() {

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

     

          return '/choose-role';
        }

        return false; //don't redirect after authentication

      }
    }
  }


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