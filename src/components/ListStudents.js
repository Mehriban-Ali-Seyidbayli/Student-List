import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListStudents = (props) => {
    const { students, setStudents } = props

    const handleDelete = (student) => {
        axios.delete(`http://localhost:3004/students/${student.id}`)
            .then((res) => {
                const filteredStudents = students.filter(item => item.id !== student.id)
                setStudents(filteredStudents)

            })
            .catch((err) => {
                alert("Error")

            })

    }

    return (
        <div className="container my-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Student Number</th>
                        <th scope="col">Student Class</th>
                        <th scope="col">School Name</th>
                        <th scope="col">Addition</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td className="text-center" colSpan={7}>You don't have any items</td>
                        </tr>

                    ) : (
                        <>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <th scope="row"> {index + 1} </th>
                                    <td>{student.name}</td>
                                    <td>{student.surname}</td>
                                    <td>{student.studentNo}</td>
                                    <td>{student.studentClass}</td>
                                    <td>{student.schoolName}</td>
                                    <td><div className="btn-group" role="group" aria-label="Basic example">
                                        <button onClick={() => handleDelete(student)} type="button" className="btn btn-sm btn-secondary">Delete</button>
                                        <Link to={`/edit-student/${student.id}`} type="button" className="btn btn-sm btn-success">Edit</Link>
                                    </div></td>
                                </tr>
                            ))}
                        </>

                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListStudents;