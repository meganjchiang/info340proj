import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getDatabase, ref, onValue, push as firebasePush, remove } from 'firebase/database';

export function ApproveAdmin(props) {
    const [mentorStateArray, setMentorStateArray] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const db = getDatabase();
        const allMentorRef = ref(db, "mentorApplicants");

        if (allMentorRef === null) {
            setIsEmpty(true);
        }
        onValue(allMentorRef, function (snapshot) {
            const allMentorsObj = snapshot.val();
            if (allMentorsObj) {
                const keyArray = Object.keys(allMentorsObj);
                const allMentorsArray = keyArray.map((keyString) => {
                    const mentorObj = allMentorsObj[keyString];
                    mentorObj.firebasekey = keyString;
                    return mentorObj
                })
                setMentorStateArray(allMentorsArray);
            } else {
                setIsEmpty(true);
            }


        })
    }, [])

    const handleApprove = (userKey) => {
        const db = getDatabase();
        const mentorRef = ref(db, 'mentorApplicants/' + userKey);
        onValue(mentorRef, function (snapshot) {
            const mentorObj = snapshot.val();
            const allMentorsRef = ref(db, "allMentors")
            firebasePush(allMentorsRef, mentorObj)
            remove(mentorRef);
        })

    }

    const handleDecline = (userKey) => {
        const db = getDatabase();
        const mentorRef = ref(db, 'mentorApplicants/' + userKey);
        remove(mentorRef);
    }




    const mentorRows = mentorStateArray.map((mentor, index) => {
        return (
            <tr key={mentor.firebasekey}>
                <th scope="row">{index + 1}</th>
                <td>{mentor.firstName}</td>
                <td>{mentor.lastName}</td>
                <td>
                    <Button variant="success" onClick={() => handleApprove(mentor.firebasekey)}>Approve</Button>{' '}
                    <Button variant="danger" onClick={() => handleDecline(mentor.firebasekey)}>Decline</Button>{' '}
                </td>
                <td>
                    <Button variant="secondary">Transcript</Button>{' '}
                </td>
            </tr>



        );
    })


    return (
        <div>
            <h1 className="headingForMentor"> Mentor Applications </h1>

            <div className="table-style">
                <Table striped="columns">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Approve/Deny</th>
                            <th scope="col">Transcript</th>
                        </tr>
                    </thead>
                    {isEmpty ? (
                        <></>
                    ) : (
                        <>
                            <tbody>
                                {mentorRows}
                            </tbody>
                        </>
                    )}

                </Table>
            </div >

        </div >
    )
}