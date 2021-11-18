import React from 'react'
import Delete from '../hooks/delete'
function Confirmation({ data, close }) {
    console.log('to delete', data)
    let { dlt } = Delete()
    const handledlt = (path, data) => {
        dlt(path, data.id)
        if (data.interacts.length > 0) {
            data.interacts.map(e => dlt('interacts', e.id))
        }
        if (data.likes.length > 0) {
            data.likes.map(e => dlt('likes', e.id))
        }
        if (data.image.length > 0) {
            data.image.map(e => dlt('upload/files', e.id))
        }
    }
    return (
        <div className='w-full h-screen fixed inset-0'>
            <div onClick={() => close(false)} className='bg-gray-700 absolute inset-0 w-full h-full z-10 opacity-50 '></div>
            <div className='bg-white p-6  flex flex-col gap-3 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <p>Are you sure to delete??</p>
                <div className='flex flex-row gap-2 font-semibold'>
                    <button onClick={() => close(false)} className='w-full py-2 px-3 rounded-sm cursor-pointer bg-gray-300'>cancel</button>
                    <button onClick={() => { handledlt('posts', data); close(false) }} className='w-full py-2 px-3 rounded-sm cursor-pointer bg-red-700 text-white'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation
