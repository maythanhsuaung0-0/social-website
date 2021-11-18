import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Post from '../hooks/post'
import Comment from './comment'
import { api } from '../api'
function Card({ data, open, todlt }) {

    let time = moment(data.created_at).startOf('hour').fromNow()
    let user = JSON.parse(sessionStorage.getItem('user'))
    let i_liked = data.likes ? data.likes.filter(e => e.user === user.id) : []
    const [cmt, setcmt] = useState('')
    const [holdcmt, setholdcmt] = useState(data.interacts)
    const [cmtSection, setcmtSection] = useState(false)
    const [liked, setliked] = useState(false)
    const [likeCount, setlikeCount] = useState([])
    let { sendData } = Post()
    const handleDlt = (e) => {
        open(true)
        todlt(e)
        console.log(e)
    }
    const handleCmtSection = () => {
        cmtSection ? setcmtSection(false) : setcmtSection(true)
    }
    const handleCmt = (e) => {
        setcmt(e.target.value)
    }
    const comment = (e) => {
        if (e && user && cmt) {
            let data = {
                comment: cmt,
                posts: e,
                user: user
            }
            setholdcmt([...holdcmt, data])
            sendData(data, 'interacts')

        }

        setcmt('')
    }
    const likey = () => {
        if (liked) {
            setliked(false)
        }
        else {
            setliked(true)
            let new_likes = data.likes.filter(e => e.user !== user.id)
            console.log('imm', i_liked)
            console.log('likes', data.likes)
            if (i_liked) {
                if (i_liked.length === 0) {
                    let added_like = {
                        like: true,
                        post: data,
                        user: user,
                    }
                    setlikeCount([...new_likes, added_like])
                    sendData(added_like, 'likes')
                    console.log(added_like)
                }
            }
            else {
                console.log('you already liked this')
            }


        }

    }
    const viewImg = (path) => {
        window.open(`${api}${path}`);
    }
    useEffect(() => {
        if (data) {
            setlikeCount(data.likes)
            console.log('i', i_liked)
            if (i_liked[0]) {
                setliked(true)
            }
            console.log(liked)
        }
    }, [data.likes])
    return (
        <>
            {(data.user && data) ?
                <div className='w-full bg-white shadow-sm p-4 lg:p-6 flex flex-col gap-3 lg:gap-4'>
                    <div className='flex gap-3'>
                        <img className='w-10 h-10
                        lg:w-12
                        lg:h-12
                        cursor-pointer
                        border-1 border-gray-600
                        rounded-circle 
                        object-cover'
                            src={data.user.profile ? `${api}${data.user.profile.url}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU`}
                            alt="user" />
                        <div className='self-center'>
                            <strong>{data.user.username}</strong>
                            <span className='text-xs text-gray-600 block lg:inline lg:ml-2.5'>{time}</span>
                        </div>
                        {user.email === data.user.email ? <div
                            onClick={() => handleDlt(data)} className='ml-auto cursor-pointer'>
                            <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38.5 7.33333H14.6667L1.83334 22L14.6667 36.6667H38.5C39.4725 36.6667 40.4051 36.2803 41.0927 35.5927C41.7804 34.9051 42.1667 33.9725 42.1667 33V11C42.1667 10.0275 41.7804 9.0949 41.0927 8.40727C40.4051 7.71964 39.4725 7.33333 38.5 7.33333V7.33333Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M33 16.5L22 27.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 16.5L33 27.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div> : <></>}
                    </div>
                    <p>{data.text}</p>
                    {data.image ? <div className='grid grid-cols-responsive gap-1 content-center'>
                        {data.image.map((e, i) =>
                            <img onClick={() => viewImg(e.url)} key={i} className='object-cover w-full h-full' src={`${api}${e.url}`} alt="img" />)}
                    </div> : <div>no img</div>}
                    <div className='flex justify-between border-t-1 border-gray-300 pt-4'>
                        <div className='flex flex-row gap-2'>

                            <div onClick={() => likey()}>
                                {liked ? <FilledHeart /> : <OutlinedHeart />}
                            </div>

                            <span className='text-blue-500'>{likeCount.length}</span>
                        </div>

                        <div className='flex flex-row gap-2'>
                            <span className='text-blue-500'>{data.interacts.length}</span>
                            <div className='cursor-pointer text-3xl' onClick={() => handleCmtSection()}>
                                <span className="iconify" data-icon="fa-regular:comment-dots"></span>
                            </div>

                        </div>
                    </div>
                    {cmtSection === true ?
                        <>
                            {holdcmt.map((e, i) =>
                                <Comment datas={e} key={e.id} fullData={data} />)}
                            <div className='flex flex-row   py-2 pl-3 pr-0 rounded-md '>
                                <div> <img className='w-8 h-8
                        lg:w-10
                        lg:h-10
                        border-1 border-gray-200
                        rounded-circle 
                        object-cover mr-4' src={user.profile ? `${api}${user.profile.url}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUEx5fkvy_FygtNLVuMOy7fBl0EhHtIGfXQ&usqp=CAU'} /></div>
                                <input placeholder='enter your comment ...' onChange={(e) => handleCmt(e)} type="text" value={cmt} className='bg-gray-100 rounded-md p-2 pl-3 w-full   focus:outline-none' />
                                <div onClick={() => comment(data)} className='self-center ml-auto text-3xl cursor-pointer hover:text-blue-800 '>
                                    <span className="iconify" data-icon="carbon:send-filled"></span>
                                </div>
                            </div></>
                        : <div></div>}

                </div> :

                <div></div>}
        </>
    )
}

export default Card

const OutlinedHeart = () => {
    return (
        <div className='text-3xl cursor-pointer'>
            <span className="iconify" data-icon="ant-design:heart-outlined"></span>
        </div>
    )
}
const FilledHeart = () => {
    return (

        <div className='text-3xl cursor-pointer text-red-700'>
            <span className="iconify" data-icon="ant-design:heart-filled"></span>
        </div>

    )
}
