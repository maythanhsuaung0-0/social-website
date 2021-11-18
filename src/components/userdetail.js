import React from 'react'
import { useHistory } from 'react-router-dom'
import { api } from '../api'
function Userdetail({ open }) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    let history = useHistory()
    let loggingOut = () => {
        sessionStorage.removeItem('jwt')
        history.push('/signin')
    }
    return (
        <div className='fixed top-0 right-0 h-screen p-5 bg-gray-100   shadow-md w-48   '>
            <div className='self-start text-3xl absolute top-0 left-0 cursor-pointer' onClick={() => open(false)}>
                <span className="iconify" data-icon="bx:bxs-chevrons-right"></span>
            </div>
            <div className='flex flex-col gap-2 text-center pt-4'>

                <div onClick={() => history.push(`/user/${user.id}`)} className='self-center cursor-pointer'>
                    <img className='w-12  h-12  rounded-circle object-cover' src={user.profile ? `${api}${user.profile.url}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU`} alt="" />
                </div>
                <h5 className='font-semibold'>{user.username}</h5>
                <span className='text-sm'>{user.email}</span>
                <button onClick={() => loggingOut()} className='py-1 px-2 hover:bg-blue-500 bg-blue-400 text-white cursor-pointer'>Log Out</button>
            </div>
        </div>
    )
}

export default Userdetail
