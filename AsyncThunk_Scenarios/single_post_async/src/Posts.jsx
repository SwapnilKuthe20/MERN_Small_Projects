import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postFetch } from './App/features/postSlice';

const Posts = () => {

    const dispatch = useDispatch()

    const { post, status, error } = useSelector(state => state.post)

    // console.log(post, "...post");
    // console.log({ ...postFetch }, "...postFetch");

    useEffect(() => {
        dispatch(postFetch(2))
    }, [])

    if (status == "pending") return <p style={{ color: "white" }}> pending...... </p>
    if (error) return <p style={{ color: "white" }}> {error} </p>

    return (
        <div >
            <h1> Post Component </h1>
            {(post?.id) ?
                (<div style={{ width: "700px", backgroundColor: "yellowgreen", color: "white", textAlign: "center", fontSize: "5px", padding: "15px" }}>
                    <h1> userId : {post?.userId}</h1>
                    <h1> id : {post?.id}</h1>
                    <h1> title : {post?.title}</h1>
                    <h1> body : {post?.body}</h1>
                </div>)
                :
                <p> No post found </p>
            }

        </div>
    );
}

export default Posts;
