import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export function ApproveAdmin(props) {
    //map here
    const mentorApplication = props.appliedMentors;
    const mentorRows = mentorApplication.map((mentor, index) => {
        const returnTable = (
            <tr key={mentor.netId}>
            <th scope="row">{index + 1}</th>
            <td>{mentor.firstName}</td>
            <td>{mentor.lastName}</td>
            <td>
            <Button variant="success">Approve</Button>{' '}
            <Button variant="danger">Decline</Button>{' '}
            </td>
            <td>
                <Button variant="secondary">Transcript</Button>{' '}
            </td>
        </tr>
        )
        return returnTable;
        
    })


    return (
        <div>
            <h1 className="headingForMentor"> Mentor Applications </h1>
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
    )
}