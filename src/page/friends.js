import React, { useEffect } from 'react'
import { GetData } from '../hooks/get'
import Nav from '../components/nav'
import ErrorPage from './error'
import { Link } from 'react-router-dom'
import { api } from '../api'
function Friends() {
    let token = JSON.parse(sessionStorage.getItem('jwt'))
    let { getData, posts } = GetData()

    useEffect(() => {
        getData(`users`)
    }, [])
    console.log(posts)
    return (
        <>
            {token ? <div className=''>
                <Nav />
                <div className='bg-gray-800'>
                    <div className='w-2/3 pt-24 m-auto flex flex-col gap-5 min-h-screen'>
                        {posts.map((e, i) =>
                            <UserCard e={e} />
                        )}
                    </div>
                </div>
            </div> : <div>
                <ErrorPage />
            </div>}
        </>
    )
}

export default Friends

const UserCard = ({ e }) => {
    return (
        <div className='flex flex-row gap-3 md:gap-6 bg-white text-black p-3 rounded-md shadow-md'>
            <Link to={`/user/${e.id}`}>
                <img className=' cursor-pointer self-center w-8 h-8 lg:w-10 lg:h-10 object-cover border-gray-400 border-1 rounded-circle'
                    src={e.profile ? `${api}/${e.profile.url}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU`} alt="" />
            </Link>
            <div className='self-center'>
                <h5 className=' font-semibold capitalize text-lg'>{e.username}</h5>
                {e.posts ? <p className='text-gray-400'><span className='text-blue-500'>{e.posts.length}</span> posts</p> : <></>}
            </div>
        </div>
    )
}
