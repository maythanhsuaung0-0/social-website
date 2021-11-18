import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../components/card'
import Nav from '../components/nav'
import { GetData } from '../hooks/get'
import Confirmation from '../components/confirmation'
// import { Login } from '../hooks/login'
function Homepage() {
    let token = JSON.parse(sessionStorage.getItem('jwt'))
    const [confirmBox, setconfirmBox] = useState(false)
    const [postToDlt, setpostToDlt] = useState(null)
    let history = useHistory()
    let { posts, getData } = GetData()
    useEffect(() => {
        getData(`posts`)
    }, [])
    return (
        <>
            {token ? <div className='min-h-screen w-full bg-gray-800'>
                <Nav />
                <div className='py-4  pt-24  w-11/12 md:w-4/6 m-auto flex flex-col gap-5'>
                    {posts ? posts.map((e, i) => <Card key={e.id} data={e} open={setconfirmBox} todlt={setpostToDlt} />) : <div className='text-white'>Oops...there's no posts. <br />
                        check your internet connection again</div>}
                </div>
                <div onClick={() => history.push('/write')} className='fixed lg:hidden bottom-20   right-10 p-3 max-w-max bg-theme shadow-lg cursor-pointer rounded-circle'>
                    <div className=' text-3xl cursor-pointer text-white '>
                        <span className="iconify" data-icon="jam:write"></span>
                    </div>
                </div>

                {confirmBox && <Confirmation close={setconfirmBox} data={postToDlt} />}

            </div> : history.push('/signin')}
        </>
    )
}

export default Homepage
