import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Features/postSlice';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

const FetchAllPosts = () => {

    const { status, posts, error } = useSelector((state) => state.postReducer)
    // console.log(status, posts, error, "...postsStore");

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const handlePost = (id) => {
        navigate(`/posts/${id}`)
    }

    if (status == "loading") return <p className='text-5xl h-screen bg-amber-800 text-amber-100 text-center pt-6'> ....loading </p>
    if (error) return <p className='text-5xl h-screen bg-amber-800 text-amber-100 text-center'> Error : {error} </p>

    return (
        <div className='w-full bg-black text-amber-100' >

            <h1 className='text-center p-4'> Scenario 1 – Fetch a list of posts </h1>

            <div className='p-3 rounded bg-cyan-400 w-24 text-nowrap text-black m-auto'>
                <NavLink to={'/posts/createPost'}> Create Post </NavLink>
            </div>

            <div className='flex items-center justify-center flex-wrap'>
                {
                    posts?.map(({ userId, id, title, body }) => (
                        <div key={id} onClick={() => handlePost(id)} className='w-96 p-3 m-4 rounded bg-blue-950 text-blue-200 cursor-pointer'>
                            <h1> UserId : {userId} </h1>
                            <h2> title : {title} </h2>
                            <h2> body : {body} </h2>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default FetchAllPosts;

