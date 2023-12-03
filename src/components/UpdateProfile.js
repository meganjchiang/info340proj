import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set as firebaseSet, onValue} from 'firebase/database';


export function UpdateProfile() {

  const handleClick = (event) => {
    console.log("clicked");
  }

  // firstN lastN
  // const [firstn, setFirstN] = useState("");
  // const [lastn, setLastN] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");
  const [aboutMeSummary, setAboutMeSummary] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    alert('Profile Updated');

    console.log("Submit form with:");
    console.log("Name:", name);
    console.log("Major:", major);
    console.log("Interest:", interest);
    console.log("About Me:", aboutMeSummary);

    // setName("");
    // setMajor("");
    // setExtracurriculars("");
    // setAboutMeSummary("");

  }

  // set up database listeners
  useEffect(() => {

    const db = getDatabase();
    const majorRef = ref(db, "allStudent");
    firebaseSet(majorRef, {"firstn": name, "gradYear": gradYear, "major": major, "interest": interest, "aboutMe": aboutMeSummary, "email": email, "password":password});

    onValue(majorRef, function(snapshot) {
      const data = snapshot.val();
      console.log("database changed");

      // update the state
      setMajor([data]);
    })

  }, [])

  return (
    <div className="update_profile" onSubmit={handleSubmit}>
      <h1>Update Profile</h1>

      <form>
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <select className="form-select" id="year" name="year" onChange={handleChange} >
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
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
            <textarea className="form-control" id="interest" name="interest" rows="4" onChange={(e) => setInterest(e.target.value)} value={interest} />
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="aboutMeSummary" className="form-label">
              About Me Summary
            </label>
            <textarea className="form-control" id="aboutMeSummary" name="aboutMeSummary" rows="6" onChange={(e) => setAboutMeSummary(e.target.value)} value={aboutMeSummary} />
          </div>

          <div className="col-12 text-center">
            <button className="submit" type="submit" onClick={handleClick} >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

