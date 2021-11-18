import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { api } from '../api'
export const Register = () => {
    const [success, setsuccess] = useState(null)
    let history = useHistory()
    const register = async (user) => {
        console.log(user)
        await axios.post(`${api}/auth/local/register`, user).then(res => { console.log('success', res.data.jwt); setsuccess(true) }).catch(err => { console.log(err); setsuccess(false) })
        success && history.push('/')
    }
    return {
        success: success,
        register: register,
    }
}