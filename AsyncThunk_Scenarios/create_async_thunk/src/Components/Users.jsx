import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './Features/userSlice';

const Users = () => {

    const dispatch = useDispatch()

    const { data, error, status } = useSelector((state) => state.users)
    console.log(data, "...data");
    console.log(error, "...error");


    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    if (status === "pending") return <p> Loading.......</p>
    if (error) return <p style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>{error}</p>

    return (
        <div style={{ width: "80%", backgroundColor: "green", margin: "auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center", padding: "20px" }}> Users Component </h2>

            <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap", listStyle: "none" }}>
                {
                    data.map(({ id, name, username, email, }) => (
                        <li key={id} style={{ width: "500px", padding: "12px", backgroundColor: "blueviolet" }}>
                            <h1>name : {name} </h1>
                            <h2>username : {username} </h2>
                            <h2>Email : {email}</h2>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Users;
