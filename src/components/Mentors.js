import React, { useState } from 'react';

export function MentorCard(props) {
    const mentorData = props.mentorData;
    const mentorName = mentorData.name;
    const mentorBio = mentorData.bio;
    const mentorImg = mentorData.img;
    const mentorCareer = mentorData.career;
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
                            <p><span className="info-label">Career:</span> {mentorCareer}</p>
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
    const [selectedCareer, setSelectedCareer] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedGradYear, setSelectedGradYear] = useState('');

    let displayedMentors = mentors;

    if (selectedCareer !== '') {
        displayedMentors = mentors.filter((mentor) => {
            const careers = mentor.career === selectedCareer;
            return careers;
        });
    }

    if (selectedMajor !== '') {
        displayedMentors = displayedMentors.filter((mentor) => {
            const majors = mentor.major === selectedMajor;
            return majors;
        });
    }

    if (selectedGradYear !== '') {
        displayedMentors = displayedMentors.filter((mentor) => {
            const gradYear = mentor.grad_year === selectedGradYear;
            return gradYear;
        });
    }

    const handleChangeSelectCareer = (event) => {
        let newCareer = event.target.value;
        setSelectedCareer(newCareer);
    }

    const handleChangeSelectMajor = (event) => {
        let newMajor = event.target.value;
        setSelectedMajor(newMajor);
    }

    const handleChangeSelectGradYear = (event) => {
        let newGradYear = event.target.value;
        setSelectedGradYear(newGradYear);
    }

    // source: problem-c from Problem Set 07
    const uniqueCareers = [...new Set(mentors.reduce((all, current) => {
        return all.concat([current.career]);
    }, []))].sort();

    const uniqueMajors = [...new Set(mentors.reduce((all, current) => {
        return all.concat([current.major]);
    }, []))].sort();

    const uniqueGradYears = [...new Set(mentors.reduce((all, current) => {
        return all.concat([current.grad_year]);
    }, []))].sort();

    const careerOptions = uniqueCareers.map((career) => {
        return <option key={career} value={career}>{career}</option>
    });

    const majorOptions = uniqueMajors.map((major) => {
        return <option key={major} value={major}>{major}</option>
    });

    const gradYearOptions = uniqueGradYears.map((gradYear) => {
        return <option key={gradYear} value={gradYear}>{gradYear}</option>
    }).reverse();

    const cardArray = displayedMentors.map((mentor) => {
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
                <form>
                    <select id="careerSelect" value={selectedCareer} onChange={handleChangeSelectCareer}>
                        <option value="">All careers</option>
                        {careerOptions}
                    </select>
                    <select id="MajorSelect" value={selectedMajor} onChange={handleChangeSelectMajor}>
                        <option value="">All majors</option>
                        {majorOptions}
                    </select>
                    <select id="gradYearSelect" value={selectedGradYear} onChange={handleChangeSelectGradYear}>
                        <option value="">All graduation years</option>
                        {gradYearOptions}
                    </select>
                </form>

            </div>

            <div className="row container mentor-cards">
                {cardArray}
            </div>
        </div>
    );
}