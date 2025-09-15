import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='w-full h-screen bg-amber-950 text-amber-50 text-center text-5xl'>
                <h1 className='mb-3'> Home Component </h1>
                <div className=' flex justify-center items-center flex-col text-3xl'>

                    <div className='mt-5'>
                        <NavLink to={'/about'} className='cursor-pointer text-yellow-500 mb-2 block' > About </NavLink>
                        <NavLink to={'/posts'} className='cursor-pointer text-yellow-500 mb-2 block' > Post </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
