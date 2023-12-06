import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function MentorCard(props) {
    const mentorData = props.mentorData;
    const mentorFirstName = mentorData.first_name;
    const mentorLastName = mentorData.last_name;
    const mentorImg = mentorData.img;
    const mentorCareer = mentorData.career;
    const mentorMajor = mentorData.major;
    const mentorGradYear = mentorData.grad_year;
    const mentorNetID = mentorData.netID;

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
            <Link className="card h-100 text-decoration-none" to={"/mentors/" + mentorNetID}>
                <img src={mentorImg} className="card-img-top" alt={mentorFirstName + ' ' + mentorLastName}></img>
                <div className="card-body d-flex flex-column">
                    <div className="card-text">
                        <p className="mentor-name">{mentorFirstName + ' ' + mentorLastName}</p>
                        <div className="mentor-info">
                            <p><span className="info-label">Career:</span> {mentorCareer}</p>
                            <p><span className="info-label">Major:</span> {mentorMajor}</p>
                            <p><span className="info-label">Graduation Year:</span> {mentorGradYear}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export function MentorGrid(props) {
    const mentors = props.mentors;
    const [selectedCareer, setSelectedCareer] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedGradYear, setSelectedGradYear] = useState('');
    const [displayedMentors, setDisplayedMentors] = useState(mentors);
    const [typedValue, setTypedValue] = useState('');

    const handleChangeSearch = (event) => {
        const inputValue = event.target.value;
        setTypedValue(inputValue);
    }

    const handleClickSearch = () => {
        const matchedMentors = displayedMentors.filter((mentor) => {
            const mentorFullName = mentor.first_name + ' ' + mentor.last_name;
            const nameMatch = mentorFullName.toLowerCase().includes(typedValue.toLowerCase());
            return nameMatch;
        });

        applyFilters(matchedMentors);
    }

    const applyFilters = (mentors) => {
        let filteredMentors = mentors;

        if (typedValue !== '') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const mentorFullName = mentor.first_name + ' ' + mentor.last_name;
                const nameMatch = mentorFullName.toLowerCase().includes(typedValue.toLowerCase());
                return nameMatch;
            });
        }

        if (selectedCareer !== '') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const careers = mentor.career === selectedCareer;
                return careers;
            });
        }

        if (selectedMajor !== '') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const majors = mentor.major === selectedMajor;
                return majors;
            });
        }

        if (selectedGradYear !== '') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const gradYear = mentor.grad_year === selectedGradYear;
                return gradYear;
            });
        }

        setDisplayedMentors(filteredMentors);
    }

    const resetMentors = () => {
        // source for clearing input field: https://www.youtube.com/watch?v=v_m16oewrH0
        document.querySelector('input').value = '';
        setTypedValue('');
        setSelectedCareer('');
        setSelectedMajor('');
        setSelectedGradYear('');
        setDisplayedMentors(mentors);
    }

    const handleChangeSelectCareer = (event) => {
        const newCareer = event.target.value;
        setSelectedCareer(newCareer);
    }

    const handleChangeSelectMajor = (event) => {
        const newMajor = event.target.value;
        setSelectedMajor(newMajor);
    }

    const handleChangeSelectGradYear = (event) => {
        const newGradYear = event.target.value;
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

    let cardArray = displayedMentors.map((mentor) => {
        const card = <MentorCard key={mentor.netID} mentorData={mentor} />
        return card;
    });

    let showingResultsString = "Showing " + displayedMentors.length + " result";
    if (displayedMentors.length > 1) {
        showingResultsString += "s";
    }
    
    if (displayedMentors.length === 0) {
        showingResultsString = "";
        cardArray = "No mentors found";
    }

    return (
        <div>
            <div className="mentor-heading">
                <h1 className="mentor-title">Meet Our Mentors </h1>

                <p className="mentor-page-description">These UW alumni will guide and support you in your academic and
                    professional endeavors. Schedule an appointment to learn more about their experiences.</p>
            </div>

            <div className="row mentor-content">
                <div className="col-lg col-lg-2 select-options">
                    <form className="row search-bar">
                        <label htmlFor="search"></label>
                        <input className="col" id="searchInput" type="text" placeholder="Search for a mentor" name="search" onChange={handleChangeSearch}></input>
                    <Button className="search-btn" onClick={handleClickSearch}>Search</Button>
                    </form>
                    <form className="row filters">
                        <select className="col" id="careerSelect" value={selectedCareer} onChange={handleChangeSelectCareer}>
                            <option value="">All careers</option>
                            {careerOptions}
                        </select>
                        <select className="col" id="MajorSelect" value={selectedMajor} onChange={handleChangeSelectMajor}>
                            <option value="">All majors</option>
                            {majorOptions}
                        </select>
                        <select className="col" id="gradYearSelect" value={selectedGradYear} onChange={handleChangeSelectGradYear}>
                            <option value="">All graduation years</option>
                            {gradYearOptions}
                        </select>
                        <Button className="filter-btn" onClick={() => applyFilters(mentors)}>Apply Filters</Button>
                    </form>
                    <Button className="row reset-btn" onClick={resetMentors}>Reset</Button>
                </div>

                <div className="row col-lg col-xl-10 container mentor-cards">
                    <p className='showing-results'>{showingResultsString}</p>
                    {cardArray}
                </div>
            </div>
        </div>
    );
}