import React, { useState } from 'react';

export function UpdateProfile ()  {
    
    const handleClick = (event) => {
        console.log("clicked");
    }
    
      const [name, setName] = useState("");
      const [major, setMajor] = useState("");
      const [extracurriculars, setExtracurriculars] = useState("");
      const [aboutMeSummary, setAboutMeSummary] = useState("");
    
      const handleChange = (event) => {
        const inputValue = event.target.value;
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();

        alert('Profile Updated');

        console.log("Submit form with:");
        console.log("Name:", name);
        console.log("Major", major);
        console.log("Extracurriculars:", extracurriculars);
        console.log("About Me:", aboutMeSummary);

        setName("");
        setMajor("");
        setExtracurriculars("");
        setAboutMeSummary("");
    
    }

    return (
      <div className="update_profile" onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
  
        <form>
          <div className="row">
            <div className="col-12 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" name="name" onChange={(e) => setName(e.target.value)} value={name}/>
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
              <input type="text" className="form-control" id="major" name="major" onChange={(e) => setMajor(e.target.value)} value={major}/>
            </div>
  
            <div className="col-12 mb-3">
              <label htmlFor="extracurriculars" className="form-label">
                Extracurriculars
              </label>
              <textarea className="form-control" id="extracurriculars" name="extracurriculars" rows="4" onChange={(e) => setExtracurriculars(e.target.value)} value={extracurriculars}/>
            </div>
  
            <div className="col-12 mb-3">
              <label htmlFor="aboutMeSummary" className="form-label">
                About Me Summary
              </label>
              <textarea className="form-control" id="aboutMeSummary" name="aboutMeSummary" rows="6" onChange={(e) => setAboutMeSummary(e.target.value)} value={aboutMeSummary}/>
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
  
