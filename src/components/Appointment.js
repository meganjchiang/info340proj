import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, push } from 'firebase/database';

export function Appointment() {
  const params = useParams();
  const userKey = params.firebasekey;

  const [mentor, setMentor] = useState(null);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // Initialize with null
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user !== null);
    });

    const db = getDatabase();
    const mentorRef = ref(db, 'allMentors/' + userKey);

    onValue(mentorRef, (snapshot) => {
      const mentorObj = snapshot.val();
      setMentor(mentorObj);

      // Update timeOptions based on mentor's availability
      if (mentorObj && mentorObj.availability) {
        const mentorAvailability = mentorObj.availability;

        const newTimeOptions = Object.entries(mentorAvailability).reduce((options, [day, times]) => {
          const dayOptions = times.map((time) => ({
            value: time,
            label: time,
          }));
          return { ...options, [day]: dayOptions };
        }, {});

        setTimeOptions(newTimeOptions);
      }
    });
  }, [userKey]);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const dayOfWeek = selectedDate.getDay();

    setSelectedDate(selectedDate);
    setSelectedDay(""); // Reset selected day when date changes
    setSelectedTime(""); // Reset selected time when date changes
  };

  const handleTimeChange = (selectedOption) => {
    setSelectedTime(selectedOption.value);
  };

  const handleDayChange = (event) => {
    const day = event.target.value;
    setSelectedDay(day);

    // Retrieve available times for the selected day
    const availableTimesForDay = timeOptions[day] || [];
    setAvailableTimes(availableTimesForDay);
    setSelectedTime(""); // Reset selected time when day changes
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userKey && mentor && selectedDate !== null && selectedTime !== "") {
      const appointmentsRef = ref(getDatabase(), `appointments/${userKey}`);
      const newAppointment = {
        date: selectedDate.toISOString(),
        time: selectedTime,
        reason,
        notes,
      };
  
      push(appointmentsRef, newAppointment);
  
      // Additional logic if needed after submitting the appointment
      alert('Appointment submitted');
      console.log('Appointment submitted:', newAppointment);

      // Clear form fields
      setReason("");
      setNotes("");
      setSelectedDate(null); // Reset selectedDate to null
      setSelectedTime("");
      setSelectedDay("");
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="appointment-form">
      <h1>Schedule an Appointment with {mentor && mentor.firstName}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Select Date<span className="required"> *</span></Form.Label>
          <Form.Control type="date" required onChange={handleDateChange} />
        </Form.Group>

        <div className="row">
          <Form.Group className="col-6 mb-3" controlId="day">
            <Form.Label>Select the Day<span className="required"> *</span></Form.Label>
            <Form.Select className="form-select" required onChange={handleDayChange} disabled={!selectedDate}>
              <option disabled>Select the Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-6 mb-3" controlId="time">
            <Form.Label>Select Time<span className="required"> *</span></Form.Label>
            <Select
              isSearchable
              options={availableTimes}
              onChange={handleTimeChange}
              value={availableTimes.find((option) => option.value === selectedTime)}
              required
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="reason">
          <Form.Label>What do you want to discuss in the appointment?<span className="required"> *</span></Form.Label>
          <Form.Control as="textarea" rows={4} required onChange={(e) => setReason(e.target.value)} value={reason} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="notes">
          <Form.Label>Add any notes for your mentor</Form.Label>
          <Form.Control as="textarea" rows={4} onChange={(e) => setNotes(e.target.value)} value={notes} />
        </Form.Group>

        <div className="col-12 text-center">
          <Button className="submit" type="submit">
            Schedule Appointment
          </Button>
        </div>
      </Form>
    </div>
  );
}