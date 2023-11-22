import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export function MentorCard(props) {
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
                <Card.Text>
                    <p>Industry: {mentorIndustry}</p>
                    <p>Major: {mentorMajor}</p>
                    <p>Graduation Year: {mentorGradYear}</p>
                    <p>{mentorBio}</p>
                </Card.Text>
                <Button className='appointment-btn mt-auto' variant="dark mt-auto">Book an Appointment</Button>
            </Card.Body>
        </Card>
    );
}


// source: https://react-bootstrap.netlify.app/docs/components/cards/#grid-cards
export function MentorGrid(props) {
    const mentors = props.mentors;
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedGradYear, setSelectedGradYear] = useState('');
    
    const handleChangeSelectIndustry = (event) => {
        let newIndustry = event.target.value;
        setSelectedIndustry(newIndustry);
    }

    const handleChangeSelectMajor = (event) => {
        let newMajor = event.target.value;
        setSelectedMajor(newMajor);
    }

    const handleChangeSelectGradYear = (event) => {
        let newGradYear = event.target.value;
        setSelectedGradYear(newGradYear);
    }

    const handleClick = (selectedIndustry, selectedMajor, selectedGradYear) => {
        props.applyFilterCallback(selectedIndustry, selectedMajor, selectedGradYear);
    }

    const industryOptions = props.industryOptions.map((industry) => {
        return <option key={industry} value={industry}>{industry}</option>
    });

    const majorOptions = props.majorOptions.map((major) => {
        return <option key={major} value={major}>{major}</option>
    });

    const gradYearOptions = props.gradYearOptions.map((gradYear) => {
        return <option key={gradYear} value={gradYear}>{gradYear}</option>
    });


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
                {/* <form className="search-bar">
                    <label for="search" Search></label>
                    <input type="text" placeholder="Search..." name="search"></input>
                    <button className="search" type="submit"><img src="img/search.png" alt="magnifying glass icon"></img></button>
                </form> */}
                <span>
                    <select id="industrySelect" value={selectedIndustry} onChange={handleChangeSelectIndustry}>
                        <option value="">All industries</option>
                        {industryOptions}
                        {/* <option>All Industries</option>
                        <option>Software Engineer</option>
                        <option>Product Manager</option>
                        <option>Data Scientist</option>
                        <option>Web Developer</option>
                        <option>Engineer</option>
                        <option>Accountant</option>
                        <option>Analyst</option> */}
                    </select>
                </span>

                <span>
                    <select id="MajorSelect" value={selectedMajor} onChange={handleChangeSelectMajor}>
                        <option value="">All majors</option>
                        {majorOptions}
                        {/* <option>All Majors</option>
                        <option>Informatics</option>
                        <option>Computer Science</option>
                        <option>Business</option>
                        <option>Psychology</option>
                        <option>Economics</option>
                        <option>Chemistry</option> */}
                    </select>
                </span>

                <span>
                    <select id="gradYearSelect" value={selectedGradYear} onChange={handleChangeSelectGradYear}>
                        <option value="">All graduation years</option>
                        {gradYearOptions}
                        {/* <option>All Graduation Years</option>
                        <option>In the past year</option>
                        <option>In the past 5 years</option>
                        <option>In the past 10 years</option>
                        <option>In the past 15 years</option>
                        <option>In the past 20 years</option> */}
                    </select>
                </span>

                <span>
                    <button id="submitButton" type="submit" className="btn btn-info" onClick={() => 
                        handleClick(selectedIndustry, selectedMajor, selectedGradYear)}>Apply Filters</button>
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