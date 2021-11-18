import React, { useState, useEffect } from 'react'
import Nav from '../components/nav'
import Card from '../components/card'
import Confirmation from '../components/confirmation'
import { GetData } from '../hooks/get'
import Post from '../hooks/post'
import { api } from '../api'
function UserWall() {
    let user = JSON.parse(sessionStorage.getItem('user'))
    const [confirmBox, setconfirmBox] = useState(false)
    const [postToDlt, setpostToDlt] = useState(null)
    const [filtered, setfiltered] = useState([])
    let { posts, getData } = GetData()
    let { img, getImage, sendData } = Post()
    const form = new FormData
    let filtered_post = []
    const [userImg, setuserImg] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU`)
    useEffect(() => {
        getData(`posts`)
        user.profile && setuserImg(`${api}/${user.profile.url}`)
    }, [])
    const handleImg = (e) => {
        // Object.keys(e.target.files).forEach((key) => setuserImg(URL.createObjectURL(e.target.files[key])))
        // console.log(userImg)
        console.log(e.target.files[0])
        form.append('files', e.target.files[0])
        if (!img) {
            getImage(form)
        }
        else {
            console.log('img', img)
            setuserImg(`${api}/${img[0].url}`)
        }
    }
    filtered_post = posts.filter(e => e.user.id === user.id)
    // img ? console.log(`${api}/${img.url}`) : console.log('no')
    return (
        <>
            {
                user ? <div className='min-h-screen w-full bg-gray-800'>
                    <Nav />
                    <div className='py-4  pt-24  w-11/12 md:w-4/6 m-auto flex flex-col gap-5'>
                        <div className='self-center cursor-pointer img-hover relative '>
                            <div className='hidden w-full h-full transition-opacity rounded-circle absolute bg-black opacity-50'></div>
                            <label htmlFor="img">
                                <div className='text-4xl text-white  hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <span className="iconify" data-icon="fluent:image-edit-20-regular"></span>
                                    <input onChange={(e) => handleImg(e)} type="file" id='img' className='hidden' />
                                </div>
                            </label>
                            {/* <div className='w-48 h-48 bg-cover rounded-circle' style={{ background: `url(${userImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div> */}
                            <img className='w-48 h-48   rounded-circle object-cover' src={userImg} alt="" />
                        </div>
                        {filtered_post.length > 0 ? filtered_post.map((e, i) => <Card key={e.id} data={e} open={setconfirmBox} todlt={setpostToDlt} />) : <div className='text-white'>Oops...there's no posts. <br />
                            check your internet connection again</div>}

                    </div>
                    {confirmBox && <Confirmation close={setconfirmBox} data={postToDlt} />}
                </div> : <></>
            }
        </>
    )
}

export default UserWall
