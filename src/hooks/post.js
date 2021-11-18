import { useState } from 'react'
import { useHistory } from 'react-router'
import axios from "axios"
import { api } from '../api'
const Post = () => {
    let history = useHistory()
    const [img, setimg] = useState(null)
    const [message, setmessage] = useState(null)
    let token = JSON.parse(sessionStorage.getItem('jwt'))
    const getImage = async (imgfile) => {
        if (token) {
            await axios.post(`${api}/upload`, imgfile, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },

            }).then(res => { setimg(res.data); console.log('success getting images', res.data) })
                .catch(err => console.log('err', err))

        }
        else {
            alert('sign in or sign up firstly')
        }
    }
    const sendData = async (data, path) => {
        console.log('data', data)
        if (data) {
            if (token) {
                await axios.post(`${api}/${path}`, data, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                }).then(res => { console.log('successfully posted', res.data); setmessage(true); history.push('/') })
                    .catch(err => { console.log('err', err); setmessage(false) })
            }
            else {
                alert('sign in or sign up firstly')
            }
        }
    }
    return {
        message: message,
        img: img,
        setmessage: setmessage,
        sendData: sendData,
        getImage: getImage
    }
}
export default Post