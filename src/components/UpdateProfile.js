import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set as firebaseSet, onValue, update, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function UpdateProfile() {

  
  const [loading, setLoading] = useState(true);


  // firstN lastN
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [major, setMajor] = useState("");
  const [interests, setInterests] = useState("");
  const [aboutMeSummary, setAboutMeSummary] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const db = getDatabase();
  const userRef = ref(db, "users/" + user.uid);

  // useEffect(() => {

  //   onValue(userRef, (snapshot) => {

  //     const fetchedData = snapshot.val();
  //     console.log(fetchedData)
  //     setFirstName(fetchedData.firstName);
  //     setLastName(fetchedData.lastName);
  //     setGradYear(fetchedData.gradYear);
  //     setMajor(fetchedData.major);
  //     setInterests(fetchedData.interests);
  //     setAboutMeSummary(fetchedData.bio);
  //     setLoading(false);

  //   })


  // })

  const handleClick = (event) => {
    console.log("clicked");
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("Submit form with:");
    // console.log("Name:", name);
    // console.log("Major:", major);
    // console.log("Interest:", interest);
    // console.log("About Me:", aboutMeSummary);

    setFirstName(firstName);
    setLastName(lastName);
    setGradYear(gradYear);
    setMajor(major);
    setInterests(interests);
    setAboutMeSummary(aboutMeSummary);

    const userData = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      role: "student",
      firstName: firstName,
      lastName: lastName,
      gradYear: gradYear,
      major: major,
      bio: aboutMeSummary,
      interests: interests
    }

    firebaseSet(userRef, userData)
      .then(() => {
        alert('Profile Updated');
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });



  }

  if (!loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }




  return (
    <div className="update_profile" onSubmit={handleSubmit}>
      <h1>Update Profile</h1>

      <form className="form">
        <div className="row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="first-name" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="last-name" name="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </div>
        </div>
        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="grad-year" className="form-label">Intended Graduation Year</label>
            <input type="text" className="form-control" onChange={(e) => setGradYear(e.target.value)} value={gradYear} name="grad-year" id="grad-year"></input>
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="major" className="form-label">
              Major
            </label>
            <input type="text" className="form-control" id="major" name="major" onChange={(e) => setMajor(e.target.value)} value={major} />
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="interests" className="form-label">
              Interests
            </label>
            <textarea className="form-control" id="interests" name="interests" rows="4" onChange={(e) => setInterests(e.target.value)} value={interests} />
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="aboutMeSummary" className="form-label">
              About Me Summary
            </label>
            <textarea className="form-control" id="aboutMeSummary" name="aboutMeSummary" rows="6" onChange={(e) => setAboutMeSummary(e.target.value)} value={aboutMeSummary} />
          </div>

          <div className="col-12 text-center">
            <button className="submit btn tbn-primary" type="submit" onClick={handleClick} >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

