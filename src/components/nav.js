import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import brand from '../assets/brand.svg'
import ErrorPage from '../page/error'
import Userdetail from './userdetail'
import { api } from '../api'
function Nav({ search }) {
    let history = useHistory()
    let keyword = useRef()
    const [open, setopen] = useState(false)
    let user = JSON.parse(sessionStorage.getItem('user'))
    const searchHandle = (e) => {
        if (e.code === 'Enter') {
            search(keyword.current.value)
        }
    }
    const openDetail = () => {
        open ? setopen(false) : setopen(true)
        console.log(open)
    }

    return (
        <>
            {
                user ? <div className='w-full h-17 fixed bg-white z-10 py-3 lg:py-4'>
                    <nav className='w-11/12 lg:w-5/6 m-auto'>
                        <ul className='list-none flex gap-4 lg:gap-10'>
                            <li className='self-center'>
                                <img src={brand} alt="" className='w-24   lg:w-28  cursor-pointer  h-10' />
                            </li>
                            {history.location.pathname === '/results' ?
                                <li className='w-full'>
                                    <div className='  relative border-1 border-gray-400 py-2 px-3 rounded-full pl-4'>
                                        <input ref={keyword} onKeyDown={(e) => searchHandle(e)} type="text" className='h-full w-full focus:outline-none' />

                                        <div className=' text-3xl cursor-pointer absolute right-3 top-1'>
                                            <span className="iconify" data-icon="eva:search-outline"></span>
                                        </div>
                                    </div>
                                </li>

                                : <><li onClick={() => history.push('/')} className='ml-auto self-center'>
                                    <div className=' text-3xl cursor-pointer'>
                                        <span className="iconify" data-icon="bx:bx-home-heart"></span>
                                    </div>
                                </li>
                                    <li onClick={() => history.push('/friends')} className='self-center'>
                                        <div className=' text-3xl cursor-pointer'>
                                            <span className="iconify" data-icon="ri:user-heart-line"></span>
                                        </div>
                                    </li>
                                    <li onClick={() => history.push('/write')} className='self-center hidden lg:block'>
                                        <div className=' text-3xl cursor-pointer'>
                                            <span className="iconify" data-icon="jam:write"></span>
                                        </div>
                                    </li>
                                    <li onClick={() => history.push('/results')} className=' md:mr-auto lg:mr-0 lg:ml-auto self-center '>
                                        <div className=' text-3xl cursor-pointer'>
                                            <span className="iconify" data-icon="eva:search-outline"></span>
                                        </div>
                                    </li>
                                    <li className='self-center'>
                                        <div className='w-9 z-0 relative' onClick={() => openDetail()}>
                                            <img src={user.profile ? `${api}${user.profile.url}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU`} className='w-9 h-9 cursor-pointer border-1 border-gray-600  rounded-circle object-cover' alt="user" />
                                        </div>

                                    </li></>}
                        </ul>
                    </nav>
                    {open ? <Userdetail open={setopen} /> : <></>}
                </div> : <>
                    <ErrorPage />
                </>
            }
        </>
    )
}

export default Nav
