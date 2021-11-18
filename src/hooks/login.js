import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { api } from '../api'
export const Login = () => {
    let history = useHistory()
    const [authentic, setauthentic] = useState(null)
    const store = (data) => {
        console.log('fk')
        if (data) {
            console.log(data)
            sessionStorage.setItem('user', JSON.stringify(data.user))
            sessionStorage.setItem('jwt', JSON.stringify(data.jwt))
        }

    }
    const logging = async (user) => {
        let info = {
            identifier: user.email,
            password: user.password
        }

        await axios.post(`${api}/auth/local`, info).then(res => {
            console.log('login success'); store(res.data); setauthentic(true); history.push('/')
        })
            .catch(err => { console.log(err); setauthentic(false) })
    }
    return {
        authentic: authentic,
        logging: logging
    }
}