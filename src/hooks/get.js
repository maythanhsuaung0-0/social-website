import { useState } from 'react'
import axios from 'axios'
import { api } from '../api'
export const GetData = () => {

    const [posts, setposts] = useState([])
    let token = JSON.parse(sessionStorage.getItem('jwt'))
    const searchData = async (kw) => {
        await axios.get(`${api}/posts?text_contains=${kw}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => { setposts(res.data) }).catch(err => { console.log(err) })
    }
    const getData = async (path) => {
        await axios.get(`${api}/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => { setposts(res.data) }).catch(err => { console.log(err) })
    }
    return {
        posts: posts,
        getData: getData,
        searchData: searchData
    }
}