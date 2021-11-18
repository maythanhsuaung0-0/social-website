import React, { useEffect, useState } from 'react'
import Delete from '../hooks/delete'
import { GetData } from '../hooks/get'
import { api } from '../api'

function Comment({ datas }) {
    let me = JSON.parse(sessionStorage.getItem('user'))
    let { posts, getData } = GetData()
    let { dlt } = Delete()
    useEffect(() => {
        datas && getData(`users/${datas.user}`)
    }, [])
    const handleDlt = (e) => {
        dlt('interacts', e)
    }
    return (
        <>
            {posts ? <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-4 bg-gray-100  p-2 px-3 rounded-md '>
                    <div className='self-center'> <img
                        className='w-8 h-8
                        lg:w-10
                        lg:h-10
                        border-1 border-gray-200
                        rounded-circle 
                        object-cover' src={posts.profile ? `${api}${posts.profile.url}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU'} />
                    </div>
                    <div className='self-center flex flex-col'>
                        <span className='text-xs font-semibold text-gray-400'>{posts.username}</span>
                        <div className=' text-sm'>
                            {datas.comment}
                        </div>
                    </div>
                    {posts.id === me.id ? <div onClick={() => handleDlt(datas.id)} className=' self-center text-2xl ml-auto cursor-pointer'>

                        <span className="iconify" data-icon="icon-park-outline:delete-two"></span>

                    </div> : <></>}
                </div>


            </div> : <></>}
        </>

    )
}

export default Comment
