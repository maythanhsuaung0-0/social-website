import React, { useRef, useState } from 'react'
// import { useHistory } from 'react-router'
import { Register } from '../hooks/register'
import galaxy from '../assets/galaxy.jpg'
import rocket from '../assets/boosting_rocket.svg'
import Post from '../hooks/post'

function RegisterPage() {
    let username = useRef()
    let email = useRef()
    let pw = useRef()
    let pf = useRef()
    const [uname, setuname] = useState('')
    const [em, setem] = useState('')
    const [psw, setpsw] = useState('')

    let { img, getImage } = Post()
    const [valid, setvalid] = useState(null)
    const [step, setstep] = useState(1)
    const [profileimg, setprofileimg] = useState(null)
    const [media, setmedia] = useState(img)
    let { register, success } = Register()
    const registerValidUser = () => {
        console.log(email.current.value)
        setuname(username.current.value)
        setem(email.current.value)
        setpsw(pw.current.value)
        email.current.value.includes('@' && '.com') ? setvalid(true) : setvalid(false)
        username.current.value && email.current.value && pw.current.value ? setstep(2) : setstep(1)
    }
    const getImgfile = (e) => {
        setprofileimg(e.target.files[0])
        let file = new FormData()
        file.append('files', e.target.files[0])
        getImage(file)

    }
    const postToServer = () => {
        console.log('img data', img)
        let data = {
            username: uname,
            email: em,
            password: psw,
            profile: img

        }
        data && register(data)
    }
    return (
        <>
            <div>
                <div className='relative min-h-screen grid place-items-center'>
                    <img src={galaxy} alt="background" className='w-full h-full absolute -z-1 object-cover' />
                    <div className='flex flex-col lg:flex-row  bg-white relative'>
                        <div className='w-64 lg:w-80 lg:h-96 m-auto grid place-items-center lg:bg-blue-600 pt-8 lg:p-0'>
                            <img src={rocket} alt="" />
                        </div>
                        <div className=' flex flex-col gap-5 w-max justify-center p-8'>
                            <h3 className='text-center text-lg capitalize font-bold mb-3'>
                                sign up {step}
                            </h3>
                            {step === 1 ? <div className='flex flex-col gap-5'>
                                <div className='relative border-1 border-gray-600  rounded-full min-w-250 md:w-80 px-4 py-3'>
                                    <input ref={username} placeholder='hey' className='myinput placeholder-transparent block  w-4/5 overflow-ellipsis    focus:outline-none text-sm md:text-base' type="text" id='username' required />
                                    <label className='absolute top-3 left-3 px-1 text-gray-400' htmlFor="username">Username</label>
                                </div>

                                <div>
                                    <div className='relative border-1 border-gray-600  rounded-full min-w-250 md:w-80 px-4 py-3'>
                                        <input ref={email} placeholder='hey' className='myinput placeholder-transparent block  w-4/5 overflow-ellipsis    focus:outline-none text-sm md:text-base' type="text" id='email' required />
                                        <label className='absolute top-3 left-3 px-1 text-gray-400' htmlFor="email">Email Address</label>

                                    </div>
                                    {valid === false && <div className='text-xs text-red-500 pl-4'>invalid email address! make sure include @</div>}
                                </div>
                                <div className='relative  min-w-250 md:w-80 w-4/5 rounded-full py-3 px-4  border-1 border-gray-600'>
                                    <input ref={pw} placeholder='hey' className='myinput placeholder-transparent  block overflow-ellipsis focus:outline-none text-sm md:text-base' type="password" id='pw' required />
                                    <label className='absolute top-3 left-3 px-1 text-gray-400' htmlFor="pw">Password</label>
                                </div>


                                <div onClick={() => registerValidUser()} className=' self-center w-max py-3 px-5 text-white rounded-full cursor-pointer bg-blue-400'>
                                    next step
                                </div>
                            </div>
                                :
                                <div className='flex flex-col gap-5'>

                                    <div>
                                        <label style={profileimg ? { background: `url(${URL.createObjectURL(profileimg)})`, backgroundSize: 'cover' } : null} htmlFor="profile" className='block w-52 h-60 bg-gray-400 rounded-2xl relative bg-center  no-repeat'>
                                            <input onChange={(e) => getImgfile(e)} className='hidden absolute top-0 left-0' type="file" id='profile' ref={pf} />
                                        </label>
                                    </div>
                                    <div onClick={() => postToServer()}>
                                        <button className=' rounded-full py-3 px-5 bg-blue-700 text-white cursor-pointer w-full'>Create Account</button>
                                    </div>
                                </div>
                            }

                        </div>

                        {success === false && <div className='absolute right-2 bottom-4'>Oops error occurred</div>}
                    </div>

                </div>
            </div>

        </>
    )
}

export default RegisterPage
