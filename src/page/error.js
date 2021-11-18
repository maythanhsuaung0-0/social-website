import React from 'react'
import err from '../assets/error.svg'
import { Link } from 'react-router-dom'
function ErrorPage() {
    return (
        <div className=' w-3/5 m-auto grid grid-cols-2 gap-3 h-screen'>
            <img src={err} alt="" className=' self-center' />
            <div className=' self-center flex flex-col gap-3'>
                <h1 className='text-2xl'>Oops...sorry you can't access the page.</h1>
                <p className='text-sm'>You need to <Link to='/signin' className='text-blue-700 px-1'>Sign in</Link> firstly.</p>
            </div>
        </div>
    )
}

export default ErrorPage
