import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import logo from './project-draft/img/smile.png';
import uwLogo from './project-draft/img/uw-logo.png';
import mentorGraphic from './project-draft/img/mentor_graphic.png';

const HomePage = () => {
  return (
    <div className="splash">
      <header>
        <Link to="/" className="logo">
          <img src={logo} alt="husky to husky logo" />
        </Link>

        
      </header>

      <main>
        <h1 className="page-title">HUSKY2HUSKY</h1>

        <div className="text-center">
          <Link to="/login" className="btn btn-dark mt-auto">Login</Link>
          <Link to="/student_application" className="btn btn-light mt-auto">Sign Up</Link>
        </div>
      </main>

      <div className="container about-us-section">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <img className="uw-logo" src={uwLogo} alt="UW logo" />
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="home-section-title">About us</h2>
            <p>Husky2Husky aims to provide connections between UW alumni and prospective/current students. Our alumni are here to be mentors, offer advice, and expand students' professional network.</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="container become-mentor-section">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="home-section-title">Become a mentor</h2>
            <p>Apply to be a mentor today to encourage students' growth and give back to the UW community.</p>
            <Link to="/mentor_application" className="btn btn-outline-dark mt-auto" id="apply-now">Apply Now</Link>
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <img className="mentor-graphic" src={mentorGraphic} alt="graphic of people helping each other" />
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2023 INFO 340</p>
      </footer>
    </div>
  );
};

export default HomePage;