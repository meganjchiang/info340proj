import React from "react";

export function UpdateProfile ()  {
    return (
      <div className="update_profile">
        <h1>Update Profile</h1>
  
        <form>
          <div className="row">
            <div className="col-12 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" name="name" />
            </div>
  
            <div className="col-6 mb-3">
              <label htmlFor="year" className="form-label">
                Year
              </label>
              <select className="form-select" id="year" name="year">
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
              <input type="text" className="form-control" id="major" name="major" />
            </div>
  
            <div className="col-12 mb-3">
              <label htmlFor="extracurriculars" className="form-label">
                Extracurriculars
              </label>
              <textarea className="form-control" id="extracurriculars" name="extracurriculars" rows="4" />
            </div>
  
            <div className="col-12 mb-3">
              <label htmlFor="aboutMeSummary" className="form-label">
                About Me Summary
              </label>
              <textarea className="form-control" id="aboutMeSummary" name="aboutMeSummary" rows="6" />
            </div>
  
            <div className="col-12 text-center">
              <button className="submit" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
  
