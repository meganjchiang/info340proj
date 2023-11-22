import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import { logo } from './project-draft/img/smile.png';
// // import { uwLogo } from './project-draft/img/uw-logo.png';
// // import { mentorGraphic } from './project-draft/img/mentor_graphic.png';


export function Home() {
  return (
    <div className="splash">
  
      <main className='home-page'>
        <h1 className="page-title">HUSKY2HUSKY</h1>
        <div className="text-center">
          <a href="login.html" class="btn btn-dark mt-auto">Login</a>
          <a href="student_application.html" class="btn btn-light mt-auto">Sign Up</a>
        </div>
      </main>
    <div className="description">
      <div className="about-us-section">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <img className="uw-logo" src='img/uw-logo.png' alt="UW logo" />
          </div>
    
          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="home-section-title">About us</h2>
            <p>Husky2Husky aims to provide connections between UW alumni and prospective/current students. Our alumni are here to be mentors, offer advice, and expand students' professional network.</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="become-mentor-section">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="home-section-title">Become a mentor</h2>

            <p>Apply to be a mentor today to encourage students' growth and give back to the UW community. As a mentor, you'll have the opportunity to share your expertise, provide guidance, and foster a supportive learning environment for students. </p>
            <p>
            Join our mentorship program to make a meaningful impact on students' journeys and contribute to the vibrant spirit of collaboration at the University of Washington!
            </p>
            <a href="mentor_application.html" class="btn btn-outline-dark mt-auto" id="apply-now">Apply Now</a>
          </div>

          <div className="mentor-img col-md-6 mt-4 mt-md-0">
            <img className="mentor-graphic" src='img/mentor_graphic.png' alt="graphic of people helping each other" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

