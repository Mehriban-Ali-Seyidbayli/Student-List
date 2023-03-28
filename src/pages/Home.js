import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import ListStudents from "../components/ListStudents";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [students, setStudents] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3004/students")
            .then((res) => {
                setStudents(res.data)

            })
            .catch((err) => { })
    }, [])


    if (students === null) {
        return null
    }

    return (

        <div>
            <Header />
            <div className="container mt-4 d-flex justify-content-end">
                <button onClick={() => navigate("/add-student")} className="btn btn-danger">
                    Add Student
                </button>
            </div>

            <ListStudents students={students} setStudents={setStudents} />

        </div>
    )

}

export default Home