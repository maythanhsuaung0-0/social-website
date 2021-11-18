import { useState } from 'react'
import { api } from '../api'
import axios from "axios"
const Delete = () => {
    let token = JSON.parse(sessionStorage.getItem('jwt'))
    const dlt = async (path, id) => {
        console.log(path, id)
        if (token) {
            await axios.delete(`${api}/${path}/${id}`, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },

            }).then(res => { console.log('successfully deleted', res.data) })
                .catch(err => console.log('err', err))

        }
    }
    return {
        dlt: dlt
    }
}
export default Delete