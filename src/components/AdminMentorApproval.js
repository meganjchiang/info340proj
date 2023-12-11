import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getDatabase, ref, onValue, set as firebaseSet, push as firebasePush } from 'firebase/database';

export function ApproveAdmin(props) {
    const [mentorStateArray, setMentorStateArray] = useState([]);
    
    
    useEffect(() => {
      const db = getDatabase();
      const allMentorRef = ref(db, "mentorApplicants");

      onValue(allMentorRef, function (snapshot) {
          const allMentorsObj = snapshot.val();
          const keyArray = Object.keys(allMentorsObj);
          const allMentorsArray = keyArray.map((keyString) => {
              const mentorObj = allMentorsObj[keyString];
              mentorObj.firebasekey = keyString;
              return mentorObj
          })
      
          // //update the state
          setMentorStateArray(allMentorsArray);
      })
    }, [])
    
    const handleApprove = (userKey) => {
        const db = getDatabase();
        const mentorRef = ref(db, 'mentorApplicants/'+userKey);
        console.log(mentorRef);
        onValue(mentorRef, function(snapshot){
            const mentorObj = snapshot.val();
            
            const allMentorsRef = ref(db, "allMentors")
            firebasePush(allMentorsRef, mentorObj )
        
        })
        console.log(userKey);
    }


    const mentorRows = mentorStateArray.map((mentor, index) => {
        return (
            <tr key={mentor.firebasekey}>
            <th scope="row">{index + 1}</th>
            <td>{mentor.first}</td>
            <td>{mentor.lastn}</td>
            <td>
            <Button variant="success" onClick={()=> handleApprove(mentor.firebasekey)}>Approve</Button>{' '}
            <Button variant="danger">Decline</Button>{' '}
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
                {/* {mentorStateArray} */}
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
                <tbody>
                    {mentorRows}
                </tbody>
            </Table>
            </div>
        </div>
    )
}