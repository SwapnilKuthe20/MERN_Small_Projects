import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../Features/createPost";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [postData, setPostData] = useState({
        userId: "",
        id: "",
        title: "",
        body: ""
    })

    // console.log(postData, "...postData");

    const navigate = useNavigate()

    const { status, post, error } = useSelector((state) => state.createPostReducer)

    // console.log(post, "...post");

    const dispatch = useDispatch()

    useEffect(() => {
        if (status === "fulfilled") {
            navigate('/posts')
        }
    }, [post, navigate])


    const handleChange = (e) => {
        const { name, value } = e.target

        setPostData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCreatePost = (e) => {
        e.preventDefault()

        if (!postData.userId || !postData.id || !postData.title || !postData.body) {
            alert("Please fill all fields!");
            return;
        }

        dispatch(createPost(postData))
    }


    if (status == "Loading") return <p style={{ width: "100%", height: "100vh", backgroundColor: "black", color: "yellow", marginTop: "20px", fontSize: "24px" }}> ....pending </p>
    if (error) return <p style={{ width: "100%", height: "100vh", backgroundColor: "black", color: "yellow", marginTop: "20px", fontSize: "24px" }}> ....Errorr -- {error} </p>


    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "black", color: "yellow", display: "flex", justifyContent: "center", alignItems: "center" }}>

            <form action="" onSubmit={handleCreatePost} style={{ width: "500px" }}>

                <label htmlFor="userId"> userId </label>
                <div >
                    <input type="text" id="userId" onChange={handleChange} name="userId" value={postData.userId} style={{ width: "50%", padding: "7px", marginBottom: "10px", backgroundColor: "white", color: "black" }} />
                </div>

                <label htmlFor="id"> Id </label>
                <div>
                    <input type="text" id="id" onChange={handleChange} name="id" value={postData.id} style={{ width: "50%", padding: "7px", marginBottom: "10px", backgroundColor: "white", color: "black" }} />
                </div>

                <label htmlFor="title"> title </label>
                <div>
                    <input type="text" id="title" onChange={handleChange} name="title" value={postData.title} style={{ width: "50%", padding: "7px", marginBottom: "10px", backgroundColor: "white", color: "black" }} />
                </div>

                <label htmlFor="body"> body </label>
                <div>
                    <input type="text" id="body" onChange={handleChange} name="body" value={postData.body} style={{ width: "50%", padding: "7px", marginBottom: "10px", backgroundColor: "white", color: "black" }} />
                </div>

                <button type="submit" style={{ width: "100px", padding: "12px", borderRadius: "10px", backgroundColor: "yellow", color: "black", marginLeft: '10%' }} > Submit </button>
            </form>
        </div>
    );
}

export default CreatePost;
