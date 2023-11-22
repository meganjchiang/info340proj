import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function MentorCard(props) {
    const mentorData = props.mentorData;
    const mentorName = mentorData.name;
    const mentorBio = mentorData.bio;
    const mentorImg = mentorData.img;
    const mentorIndustry = mentorData.industry;
    const mentorMajor = mentorData.major;
    const mentorGradYear = mentorData.grad_year;

    return (
        <Card>
            <Card.Img variant="top" className="card-img-top" src={mentorImg} alt={mentorName} />
            <Card.Body>
                <Card.Title>{mentorName}</Card.Title>
                {/* <Card.Text> */}
                    <p>Industry: {mentorIndustry}</p>
                    <p>Major: {mentorMajor}</p>
                    <p>Graduation Year: {mentorGradYear}</p>
                    <p>{mentorBio}</p>
                {/* </Card.Text> */}
                <Button variant="dark mt-auto">Book an Appointment</Button>
            </Card.Body>
        </Card>
    );
}


// source: https://react-bootstrap.netlify.app/docs/components/cards/#grid-cards
export function MentorGrid(props) {
    // const numMentors = props.numMentors;
    const mentors = props.mentors;

    const cardArray = mentors.map((mentor) => {
        const card = <MentorCard key={mentor.netID} mentorData={mentor} />
        return card;
    });

    return (
        <div>
            <div className="mentor-heading">
                <h1 className="mentor-title">Meet Our Mentors </h1>

                <p className="mentor-page-description">These UW alumni will guide and support you in your academic and
                    professional endeavors. Schedule an appointment to learn more about their experiences.</p>
            </div>
            <div className="filter-search">
                <form className="search-bar">
                    {/* <label for="search" Search></label> */}
                    <input type="text" placeholder="Search..." name="search"></input>
                    <button className="search" type="submit"><img src="img/search.png" alt="magnifying glass icon"></img></button>
                </form>
                <span>
                    <select>
                        <option>All Industries</option>
                        <option>Software Engineer</option>
                        <option>Product Manager</option>
                        <option>Data Scientist</option>
                        <option>Web Developer</option>
                        <option>Engineer</option>
                        <option>Accountant</option>
                        <option>Analyst</option>
                    </select>
                </span>

                <span>
                    <select>
                        <option>All Majors</option>
                        <option>Informatics</option>
                        <option>Computer Science</option>
                        <option>Business</option>
                        <option>Psychology</option>
                        <option>Economics</option>
                        <option>Chemistry</option>
                    </select>
                </span>

                <span>
                    <select>
                        <option>All Graduation Years</option>
                        <option>In the past year</option>
                        <option>In the past 5 years</option>
                        <option>In the past 10 years</option>
                        <option>In the past 15 years</option>
                        <option>In the past 20 years</option>
                    </select>
                </span>

            </div>
            <Row xs={1} md={2} lg={4} className="g-4">
                {/* {cardArray} */}
                {/* {Array.from({ length: 4 }).map((_, idx) => (
            <Col>
                {cardArray}
            </Col>
            ))} */}
                    {cardArray}
            </Row>
        </div>
    );
}


// DELETE LATER
export function Mentors() {
    return (
        <div className="mentors-page">
            <div className="container mentor-cards">
                <div className="row gy-4 py-3">
                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/divya.jpeg" className="card-img-top" alt="Divya Ganesh"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Divya Ganesh</p>
                                <p className="mentor-description">Hi! I can help you with networking and choosing a career path.
                                </p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/lasya1.jpeg" className="card-img-top" alt="Lasya Suravajhela"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Lasya Suravajhela</p>
                                <p className="mentor-description">Hi! I can help you with work-life balance and making the most
                                    out of college.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
            
                        <div className="card mb-4 h-100">
                            <img src="img/megan1.jpg" className="card-img-top" alt="Megan Chiang"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Megan Chiang</p>
                                <p className="mentor-description">Hi! I can help you with academic planning.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">

                        <div className="card mb-4 h-100">
                            <img src="img/sunghee1.jpeg" className="card-img-top" alt="Sunghee Park"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Sunghee Park</p>
                                <p className="mentor-description">Hi! I can help you with picking and applying to a major.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">

                        <div className="card mb-4 h-100">
                            <img src="img/megan2.JPG" className="card-img-top" alt="Megan Chiang"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Megan Chiang</p>
                                <p className="mentor-description">Hi! I can help you with academic planning.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">

                        <div className="card mb-4 h-100">
                            <img src="img/divya.jpeg" className="card-img-top" alt="Divya Ganesh"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Divya Ganesh</p>
                                <p className="mentor-description">Hi! I can help you with networking and choosing a career path.
                                </p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/sunghee2.jpeg" className="card-img-top" alt="Sunghee Park"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Sunghee Park</p>
                                <p className="mentor-description">Hi! I can help you with picking and applying to a major.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/lasya2.jpeg" className="card-img-top" alt="Lasya Suravajhela"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Lasya Suravajhela</p>
                                <p className="mentor-description">Hi! I can help you with work-life balance and making the most
                                    out of college.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">

                        <div className="card mb-4 h-100">
                            <img src="img/sunghee1.jpeg" className="card-img-top" alt="Sunghee Park"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Sunghee Park</p>
                                <p className="mentor-description">Hi! I can help you with picking and applying to a major.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/megan3.JPG" className="card-img-top" alt="Megan Chiang"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Megan Chiang</p>
                                <p className="mentor-description">Hi! I can help you with academic planning.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/lasya3.jpeg" className="card-img-top" alt="Lasya Suravajhela"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Lasya Suravajhela</p>
                                <p className="mentor-description">Hi! I can help you with work-life balance and making the most
                                    out of college.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/divya.jpeg" className="card-img-top" alt="Divya Ganesh"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Divya Ganesh</p>
                                <p className="mentor-description">Hi! I can help you with networking and choosing a career path.
                                </p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">

                        <div className="card mb-4 h-100">
                            <img src="img/lasya1.jpeg" className="card-img-top" alt="Lasya Suravajhela"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Lasya Suravajhela</p>
                                <p className="mentor-description">Hi! I can help you with work-life balance and making the most
                                    out of college.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/sunghee2.jpeg" className="card-img-top" alt="Sunghee Park"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Sunghee Park</p>
                                <p className="mentor-description">Hi! I can help you with picking and applying to a major.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/divya.jpeg" className="card-img-top" alt="Divya Ganesh"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Divya Ganesh</p>
                                <p className="mentor-description">Hi! I can help you with networking and choosing a career path.
                                </p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card mb-4 h-100">
                            <img src="img/megan4.JPG" className="card-img-top" alt="Megan Chiang"></img>
                            <div className="card-body d-flex flex-column">
                                <p className="mentor-name">Megan Chiang</p>
                                <p className="mentor-description">Hi! I can help you with academic planning.</p>
                                <a href="appointment.html" className="btn btn-dark mt-auto">Book an appointment</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}