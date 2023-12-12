import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getDatabase, ref, onValue, update as firebaseUpdate } from 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuth, GoogleAuthProvider, EmailAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';



const timeOptions = [];
for (let hour = 8; hour <= 21; hour++) {
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const hourString = hour > 12 ? hour - 12 : hour;
  const nextHourString = (hour + 1) > 12 ? (hour + 1) - 12 : (hour + 1);

  const timeLabel = `${hourString}:00 ${amPm} - ${nextHourString}:00 ${amPm}`;
  const value = `${hour}:00`;

  timeOptions.push({
    value,
    label: timeLabel,
  });
}

export function UpdateMentorProfile() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    gradYear: '',
    major: '',
    career: '',
    bio: '',
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    },
  });



  const [user] = useAuthState(getAuth());
  const userKey = user ? user.uid : null;

  useEffect(() => {
    if (userKey) {
      const db = getDatabase();
      const mentorRef = ref(db, 'allMentors/' + userKey);

      onValue(mentorRef, (snapshot) => {
        const mentorObj = snapshot.val();
        if (mentorObj) {
          setUserData({
            firstName: mentorObj.firstName || '',
            lastName: mentorObj.lastName || '',
            gradYear: mentorObj.gradYear || '',
            major: mentorObj.major || '',
            career: mentorObj.career || '',
            bio: mentorObj.bio || '',
            availability: mentorObj.availability || {
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
            },
          });
        }
      });
    }
  }, [userKey]);

  const handleAvailabilityChange = (day, selectedOptions) => {
    const selectedTimes = selectedOptions.map((option) => option.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      availability: {
        ...prevUserData.availability,
        [day]: selectedTimes,
      },
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user) {
      const mentorId = user.uid;
      const db = getDatabase();
      const mentorRef = ref(db, `allMentors/${mentorId}`);

      firebaseUpdate(mentorRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        gradYear: userData.gradYear,
        major: userData.major,
        career: userData.career,
        bio: userData.bio,
        availability: userData.availability,
      });

    }
  };



  return (
    <div className="update-mentor-profile" onSubmit={handleSubmit}>
      <h1>Update Mentor Profile</h1>

      <form className="form">
        <div className="row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              name="firstName"
              onChange={handleChange}
              value={userData.firstName}
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              name="lastName"
              onChange={handleChange}
              value={userData.lastName}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="grad-year" className="form-label">
              Graduation Year
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={userData.gradYear}
              name="gradYear"
              id="grad-year"
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="major" className="form-label">
              Major
            </label>
            <input
              type="text"
              className="form-control"
              id="major"
              name="major"
              onChange={handleChange}
              value={userData.major}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="career" className="form-label">
              Career
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={userData.career}
              name="career"
              id="career"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              rows="6"
              onChange={handleChange}
              value={userData.bio}
            />
          </div>
        </div>

        {/* Availability */}
        <div className="row">
          <div className="col">
            <label htmlFor="mondayAvailability" className="form-label">
              Monday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={
                (userData.availability?.monday || []).map((time) => ({
                  value: time,
                  label: time,
                }))
              }
              onChange={(selectedOptions) =>
                handleAvailabilityChange('monday', selectedOptions)
              }
            />
          </div>
          <div className="col">
            <label htmlFor="tuesdayAvailability" className="form-label">
              Tuesday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={
                (userData.availability?.tuesday || []).map((time) => ({
                  value: time,
                  label: time,
                }))
              }
              onChange={(selectedOptions) =>
                handleAvailabilityChange('tuesday', selectedOptions)
              }
            />
          </div>
          <div className="col">
            <label htmlFor="wednesdayAvailability" className="form-label">
              Wednesday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={
                (userData.availability?.wednesday || []).map((time) => ({
                  value: time,
                  label: time,
                }))
              }
              onChange={(selectedOptions) =>
                handleAvailabilityChange('wednesday', selectedOptions)
              }
            />
          </div>
          <div className="col">
            <label htmlFor="thursdayAvailability" className="form-label">
              Thursday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={
                (userData.availability?.thursday || []).map((time) => ({
                  value: time,
                  label: time,
                }))
              }
              onChange={(selectedOptions) =>
                handleAvailabilityChange('thursday', selectedOptions)
              }
            />
          </div>
          <div className="col">
            <label htmlFor="fridayAvailability" className="form-label">
              Friday Availability
            </label>
            <Select
              isMulti
              options={timeOptions}
              value={
                (userData.availability?.friday || []).map((time) => ({
                  value: time,
                  label: time,
                }))
              }
              onChange={(selectedOptions) =>
                handleAvailabilityChange('friday', selectedOptions)
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <button className="submit btn tbn-primary" type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
