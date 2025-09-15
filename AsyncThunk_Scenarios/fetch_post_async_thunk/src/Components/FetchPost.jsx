import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singlePost } from '../Features/singlePostSlice';
import { useParams } from 'react-router-dom';

const FetchPost = () => {

    const { status, post, error } = useSelector((state) => state.singlePostReducer)
    // console.log(post, "...post");

    const dispatch = useDispatch()

    const { id } = useParams()
    // console.log(id, "...param");

    useEffect(() => {
        dispatch(singlePost(id))
    }, [dispatch, id])

    if (status === "pending") return <p style={{ width: "100%", height: "100vh", backgroundColor: "black", color: "yellow", marginTop: "20px", fontSize: "24px" }}> ....pending </p>
    if (error) return <p style={{ width: "100%", height: "100vh", backgroundColor: "black", color: "yellow", marginTop: "20px", fontSize: "24px" }}> ....Errorr -- {error} </p>

    return (
        <>
            <div style={{ width: "100%", height: "100vh", backgroundColor: "black", color: "yellow" }}>

                <h1 style={{ textAlign: "center" }}> Scenario 2 – Fetch a single post by ID </h1>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>

                    <div style={{ width: "400px", backgroundColor: "purple", padding: "10px", fontSize: "10px" }}>
                        <h1 style={{ marginBottom: "10px" }}> userId : {post.userId} </h1>
                        <h1 style={{ marginBottom: "10px" }}> Id : {post.id} </h1>
                        <h1 style={{ marginBottom: "10px" }}> title : {post.title} </h1>
                        <h1 style={{ marginBottom: "10px" }}> body : {post.body} </h1>
                    </div>

                </div>
            </div>
        </>
    );
}

export default FetchPost;
