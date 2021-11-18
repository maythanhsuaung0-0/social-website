import React, { useState, useRef } from 'react'
import galaxy from '../assets/galaxy.jpg'
import rocket from '../assets/boosting_rocket.svg'
import { Login } from '../hooks/login'
import { Link } from 'react-router-dom'
function LoginPage() {
    let { authentic, logging } = Login()
    // for data
    const pw = useRef()
    const email = useRef()
    // for showhide
    const [show, setshow] = useState(false)

    // funcs
    const showhidepw = () => {
        console.log(pw.current.type)
        if (pw.current.type === 'password') {
            pw.current.type = 'text'
            setshow(true)
        }
        else {
            pw.current.type = 'password'
            setshow(false)
        }
    }
    const handleUser = () => {
        let data = {
            email: email.current.value,
            password: pw.current.value
        }
        logging(data)
    }
    return (
        <div className='relative min-h-screen grid place-items-center'>
            <img src={galaxy} alt="background" className='w-full h-full absolute -z-1 object-cover' />
            <div className='flex flex-col lg:flex-row  bg-white'>
                <div className='w-64 lg:w-80 lg:h-96  m-auto grid place-items-center lg:bg-blue-600 pt-8 lg:p-0'>
                    <img className='h-full' src={rocket} alt="" />
                </div>
                <div className='p-8 flex flex-col justify-between'>
                    <div className=' flex flex-col gap-5 w-max justify-center self-center'>
                        <h3 className='text-center text-lg capitalize font-bold mb-3'>
                            sign in
                        </h3>
                        <div className='relative border-1 border-gray-600  rounded-full min-w-250 md:w-80 px-4 py-3'>
                            <input ref={email} placeholder='hey' className='myinput placeholder-transparent block  w-4/5 overflow-ellipsis    focus:outline-none text-sm md:text-base' type="text" id='email' required />
                            <label className='absolute top-2 left-3 px-1 text-gray-400' htmlFor="email">Email Address</label>
                            <div className='text-2xl absolute right-4 top-2 cursor-pointer'>
                                <span className="iconify" data-icon="clarity:email-solid"></span>
                            </div>
                        </div>
                        <div className='relative  min-w-250 md:w-80 w-4/5 rounded-full py-3 px-4  border-1 border-gray-600'>

                            <input ref={pw} placeholder='hey' className='myinput placeholder-transparent  block overflow-ellipsis focus:outline-none text-sm md:text-base' type="password" id='pw' required />
                            <label className='absolute top-2 left-3 px-1 text-gray-400' htmlFor="pw">Password</label>
                            {!show ? <Show func={showhidepw} /> : <Hide func={showhidepw} />}

                        </div>
                        {authentic === false && <div className='text-red-500  text-xs pl-4'>Invalid user</div>}
                        <div>
                            <button onClick={() => { handleUser() }} className=' rounded-full py-3 px-5 bg-blue-700 text-white cursor-pointer w-full'>Log In</button>
                        </div>
                    </div>
                    <div className='px-8'>
                        <span className='text-gray-500'>don't have an account? please </span><Link to='/signup' className='text-blue-700'>sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

const Show = ({ func }) => {
    return (
        <div onClick={() => func()} className='text-2xl absolute right-4 top-2 cursor-pointer'>
            <span className="iconify" data-icon="fluent:eye-show-20-filled"></span>
        </div>
    )
}

const Hide = ({ func }) => {
    return (
        <div onClick={() => func()} className='text-2xl absolute right-4 top-2 cursor-pointer'>
            <span className="iconify" data-icon="eva:eye-off-2-outline"></span>
        </div>
    )
}
