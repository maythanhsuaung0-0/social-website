import React, { useState, useEffect } from 'react'
import Nav from '../components/nav'
import Card from '../components/card'
import { useParams } from 'react-router'
import { GetData } from '../hooks/get'

function Wall() {
    let { id } = useParams()
    let { posts, getData } = GetData()
    const [postToDlt, setpostToDlt] = useState(null)
    const [confirmBox, setconfirmBox] = useState(false)
    let me = JSON.parse(sessionStorage.getItem('user'))
    useEffect(() => {
        getData(`posts?_user.id=${id}`)
    }, [])
    return (
        <>
            {posts.length > 0 ? <div className='min-h-screen w-full bg-gray-800'>
                <Nav />
                <div className='py-4  pt-24  w-11/12 md:w-4/6 m-auto flex flex-col gap-5'>
                    <div className='self-center cursor-pointer relative '>
                        {id == me.id ? <label htmlFor="img" className='hovering'>
                            <div className='text-4xl hidden cursor-pointer text-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                <span className="iconify" data-icon="fluent:image-edit-20-regular"></span>
                                <input type="file" id='img' className='hidden' />
                            </div>
                        </label> : <></>}
                        <img className='w-48 h-48   rounded-circle object-cover' src={posts[0].user.profile ? `http://localhost:1337${posts[0].user.profile.url}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU`} alt="" />
                    </div>
                    {posts.map((e) => <Card key={e.id} data={e} open={setconfirmBox} todlt={setpostToDlt} />)}

                </div>

            </div> : <></>}
        </>
    )
}

export default Wall
