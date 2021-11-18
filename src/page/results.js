import React from 'react'
import Card from '../components/card'
import Nav from '../components/nav'
import { GetData } from '../hooks/get'
import ErrorPage from './error'

function Results() {
    let { posts, searchData } = GetData()
    let token = JSON.parse(sessionStorage.getItem('jwt'))
    return (
        <>
            {token ? <div>
                <Nav search={searchData} />
                <div className='w-3/4 m-auto flex flex-col gap-2 pt-16 '>
                    {posts.length > 0 ? posts.map((e, i) =>
                        <Card data={e} key={e.id} />) :
                        <div className='pt-16'>Oops....sorry! There is no posts</div>}
                </div>
            </div> : <>
                <ErrorPage />
            </>}
        </>
    )
}

export default Results
