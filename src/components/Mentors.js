import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function MentorCard(props) {
    const mentorData = props.mentorData;
    const mentorFirstName = mentorData.firstName;
    const mentorLastName = mentorData.lastName;
    const mentorImg = mentorData.photo;
    const mentorCareer = mentorData.career;
    const mentorMajor = mentorData.major;
    const mentorGradYear = mentorData.gradYear;
    const mentorFirebaseKey = mentorData.firebasekey;

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
            <Link className="card h-100 text-decoration-none" to={"/mentors/" + mentorFirebaseKey}>
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

export function MentorGrid() {
    const [mentors, setMentors] = useState([]);
    const [displayedMentors, setDisplayedMentors] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const allMentorRef = ref(db, "allMentors");

        onValue(allMentorRef, function(snapshot) {
            const allMentorsObj = snapshot.val();
            const keyArray = Object.keys(allMentorsObj);
            const allMentorsArray = keyArray.map((keyString) => {
                const mentorObj = allMentorsObj[keyString];
                mentorObj.firebasekey = keyString;
                return mentorObj
            })
            setMentors(allMentorsArray);
            setDisplayedMentors(allMentorsArray);
        })
    }, [])

    const [selectedCareer, setSelectedCareer] = useState('All Careers');
    const [selectedMajor, setSelectedMajor] = useState('All Majors');
    const [selectedGradYear, setSelectedGradYear] = useState('All Graduation Years');
    const [typedValue, setTypedValue] = useState('');

    const handleChangeSearch = (event) => {
        const inputValue = event.target.value;
        setTypedValue(inputValue);
    }

    const handleClickSearch = () => {
        const matchedMentors = mentors.filter((mentor) => {
            const mentorFullName = mentor.firstName + ' ' + mentor.lastName;
            const nameMatch = mentorFullName.toLowerCase().includes(typedValue.toLowerCase());
            return nameMatch;
        });

        applyFilters(matchedMentors);
    }

    const applyFilters = (mentors) => {
        let filteredMentors = mentors;

        if (typedValue !== '') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const mentorFullName = mentor.firstName + ' ' + mentor.lastName;
                const nameMatch = mentorFullName.toLowerCase().includes(typedValue.toLowerCase());
                return nameMatch;
            });
        }

        if (selectedCareer !== 'All Careers') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const careers = mentor.career === selectedCareer;
                return careers;
            });
        }

        if (selectedMajor !== 'All Majors') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const majors = mentor.major === selectedMajor;
                return majors;
            });
        }

        if (selectedGradYear !== 'All Graduation Years') {
            filteredMentors = filteredMentors.filter((mentor) => {
                const gradYear = mentor.gradYear === selectedGradYear;
                return gradYear;
            });
        }

        setDisplayedMentors(filteredMentors);
    }

    const resetMentors = () => {
        // source for clearing input field: https://www.youtube.com/watch?v=v_m16oewrH0
        document.querySelector('input').value = '';
        setTypedValue('');
        setSelectedCareer('All Careers');
        setSelectedMajor('All Majors');
        setSelectedGradYear('All Graduation Years');
        setDisplayedMentors(mentors);
    }

    const handleChangeSelectCareer = (event) => {
        const newCareer = event.currentTarget.name;
        setSelectedCareer(newCareer);
    }

    const handleChangeSelectMajor = (event) => {
        const newMajor = event.currentTarget.name;
        setSelectedMajor(newMajor);
    }

    const handleChangeSelectGradYear = (event) => {
        const newGradYear = event.currentTarget.name;
        setSelectedGradYear(newGradYear);
    }

    // source: problem-c from Problem Set 07
    const uniqueCareers = [...new Set(displayedMentors.reduce((all, current) => {
        return all.concat([current.career]);
    }, []))].sort();

    const uniqueMajors = [...new Set(displayedMentors.reduce((all, current) => {
        return all.concat([current.major]);
    }, []))].sort();

    const uniqueGradYears = [...new Set(displayedMentors.reduce((all, current) => {
        return all.concat([current.gradYear]);
    }, []))].sort();

    const careerOptions = uniqueCareers.map((career) => {
        return (
            <Dropdown.Item key={career} name={career} onClick={handleChangeSelectCareer}>
                {career}
            </Dropdown.Item>
        )
    })

    const majorOptions = uniqueMajors.map((major) => {
        return (
            <Dropdown.Item key={major} name={major} onClick={handleChangeSelectMajor}>
                {major}
            </Dropdown.Item>
        )
    })

    const gradYearOptions = uniqueGradYears.map((gradYear) => {
        return (
            <Dropdown.Item key={gradYear} name={gradYear} onClick={handleChangeSelectGradYear}>
                {gradYear}
            </Dropdown.Item>
        )
    }).reverse()

    let cardArray = displayedMentors.map((mentor) => {
        const card = <MentorCard key={mentor.firebasekey} mentorData={mentor} />
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
                        <Dropdown>
                            <Dropdown.Toggle>
                                <Dropdown.Item>{selectedCareer}</Dropdown.Item>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item key='All Careers' name='All Careers' onClick={handleChangeSelectCareer}>All Careers</Dropdown.Item>
                                {careerOptions}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle>
                                <Dropdown.Item>{selectedMajor}</Dropdown.Item>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item key='All Majors' name='All Majors' onClick={handleChangeSelectMajor}>All Majors</Dropdown.Item>
                                {majorOptions}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle>
                                <Dropdown.Item>{selectedGradYear}</Dropdown.Item>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item key='All Graduation Years' name='All Graduation Years' onClick={handleChangeSelectGradYear}>All Graduation Years</Dropdown.Item>
                                {gradYearOptions}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className="apply-filter-btn" onClick={() => applyFilters(mentors)}>Apply Filters</Button>
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