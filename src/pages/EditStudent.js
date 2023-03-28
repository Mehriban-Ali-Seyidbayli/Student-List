import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {

    const { studentId } = useParams();
    const navigate = useNavigate();
    const [willEditStudent, setWillEditStudent] = useState(null)
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [schoolName, setSchoolName] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:3004/students/${studentId}`)
            .then((res) => {
                console.log(res.data);
                setWillEditStudent(res.data)
                setName(res.data.name)
                setSurname(res.data.surname)
                setStudentNo(res.data.studentNo)
                setStudentClass(res.data.studentClass)
                setSchoolName(res.data.schoolName)

            })
            .catch((err) => {
                alert("You have an error")
                navigate("/")

            })
    }, [])

    const handleEdit = (e) => {
        e.preventDefault()

        if (name === "" ||
            surname === "" ||
            studentNo === "" ||
            studentClass === "" ||
            schoolName === "") {
            alert("Filling all fields are required")
            return
        }

        const updatedStudent = {
            id: willEditStudent.id,
            name: name,
            surname: surname,
            studentNo: studentNo,
            studentClass: studentClass,
            schoolName: schoolName
        }

        axios.put(`http://localhost:3004/students/${willEditStudent.id}`, updatedStudent)
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err);
                alert("Error")
            })




    }




    if (willEditStudent === null) {
        return null
    }
    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleEdit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Surname</label>
                        <input type="text" className="form-control" id="surname" placeholder="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="studentNo" className="form-label">Student Number</label>
                        <input type="number" className="form-control" id="studentNo" placeholder="student no" value={studentNo} onChange={(e) => setStudentNo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="studentClass" className="form-label">Student Class</label>
                        <input type="text" className="form-control" id="studentClass" placeholder="student class" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">School Name</label>
                        <input type="text" className="form-control" id="schoolName" placeholder="school name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                    </div>
                    <div className="container d-flex justify-content-center my-5">
                        <button type="submit" className="btn btn-success w-25">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudent;