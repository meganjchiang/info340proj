import React, { useState } from 'react';

export function MentorCard(props) {
    const mentorData = props.mentorData;
    const mentorName = mentorData.name;
    const mentorBio = mentorData.bio;
    const mentorImg = mentorData.img;
    const mentorIndustry = mentorData.industry;
    const mentorMajor = mentorData.major;
    const mentorGradYear = mentorData.grad_year;

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
            <div className="card h-100">
                <img src={mentorImg} className="card-img-top" alt={mentorName}></img>
                <div className="card-body d-flex flex-column">
                    <div className="card-text">
                        <p className="mentor-name">{mentorName}</p>
                        <div className="container mentor-info">
                            <p><span className="info-label">Industry:</span> {mentorIndustry}</p>
                            <p><span className="info-label">Major:</span> {mentorMajor}</p>
                            <p><span className="info-label">Graduation Year:</span> {mentorGradYear}</p>
                        </div>
                        <p className="mentor-description">{mentorBio}</p>
                    </div>
                    <button className="btn appt-btn mt-auto" type="button">Book an appointment</button>
                </div>
            </div>
        </div>
    );
}

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

            <div className="container select-options">
                {/* <form className="search-bar">
                    <label for="search" Search></label>
                    <input type="text" placeholder="Search..." name="search"></input>
                    <button className="search" type="submit"><img src="img/search.png" alt="magnifying glass icon"></img></button>
                </form> */}
                <span>
                    <select id="industrySelect" value={selectedIndustry} onChange={handleChangeSelectIndustry}>
                        <option value="">All industries</option>
                        {industryOptions}
                    </select>
                </span>

                <span>
                    <select id="MajorSelect" value={selectedMajor} onChange={handleChangeSelectMajor}>
                        <option value="">All majors</option>
                        {majorOptions}
                    </select>
                </span>

                <span>
                    <select id="gradYearSelect" value={selectedGradYear} onChange={handleChangeSelectGradYear}>
                        <option value="">All graduation years</option>
                        {gradYearOptions}
                    </select>
                </span>

                <span>
                    <button id="submitButton" type="submit" className="btn filter-btn" onClick={() =>
                        handleClick(selectedIndustry, selectedMajor, selectedGradYear)}>Apply Filters</button>
                </span>

            </div>

            <div className="row container mentor-cards">
                {cardArray}
            </div>
        </div>
    );
}