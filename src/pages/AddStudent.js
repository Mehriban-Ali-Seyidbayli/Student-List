import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [schoolName, setSchoolName] = useState("");


    const handleForm = (e) => {
        e.preventDefault();

        if (name === "" ||
            surname === "" ||
            studentNo === "" ||
            studentClass === "" ||
            schoolName === "") {
            alert("Filling all fields are required")
            return
        }

        const newStudent = {
            id: String(new Date().getTime()),
            name: name,
            surname: surname,
            studentNo: studentNo,
            studentClass: studentClass,
            schoolName: schoolName
        }
        axios.post("http://localhost:3004/students", newStudent)
            .then((res) => {
                navigate("/")

            })
            .catch((err) => {
                console.log(err);
                alert("You have an error")
            })
    }

    return (
        <div>
            <Header />

            <div className="container my-5">
                <form onSubmit={handleForm}>
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
                        <button type="submit" className="btn btn-primary w-25">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AddStudent;