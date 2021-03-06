import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import galaxy from '../assets/galaxy.jpg'
import Post from '../hooks/post'
import ErrorPage from './error'
function Write() {
    let history = useHistory()
    let text = useRef()
    let { img, getImage, sendData } = Post()
    const [image, setimage] = useState([])
    const [readyToPost, setreadyToPost] = useState(false)
    const formData = new FormData()
    let token = JSON.parse(sessionStorage.getItem('jwt'))
    const handleImg = (e) => {
        Object.keys(e.target.files).forEach((key) => setimage([...image, e.target.files[key]]))
    }
    const handleConfirm = () => {
        setreadyToPost(true)
        if (image.length > 0) {
            Array.from(image).forEach(i => {
                formData.append('files', i);
            });
            getImage(formData)
        }
    }
    const post = () => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        console.log(img)
        if (image.length > 0) {
            if (img) {
                let mydata = {
                    text: text.current.value,
                    image: img,
                    user: user,
                }
                sendData(mydata, 'posts')
                history.push('/')
            }
        }
        else {
            console.log('no img')
            let mydata = {
                text: text.current.value,
                image: null,
                user: user,
            }
            sendData(mydata, 'posts')
            history.push('/')
        }
    }
    const deleteImage = (e, i) => {
        let filtered = image.filter(ele => ele !== e)
        console.log(filtered)
        setimage(filtered)
    }
    return (
        <>
            {token ? <div className='relative min-h-screen'>
                <img src={galaxy} alt="background" className='w-full h-full absolute -z-1 object-cover' />
                <div className='pt-16 pb-4 w-5/6 m-auto flex flex-col gap-5'>
                    <div onClick={() => history.push('/')} className='cursor-pointer'>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5L3 10L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 10H11C16.523 10 21 14.477 21 20V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className=''>
                        <textarea ref={text} className='p-5 w-full' placeholder={`write down what's on your mind and we're gonna boost it to the space...`} name="" id="" cols="30" rows="10"></textarea>
                        <div className='grid grid-cols-responsive gap-1 content-center'>
                            {image.map((e, i) =>
                                <div className='relative' key={i} style={{ backgroundImage: `url('${URL.createObjectURL(e)}')` }} className=' justify-self-center w-full relative bg-cover sm:bg-contain bg-center m-auto block w-60 h-60 bg-no-repeat bg-gray-300'>
                                    <div onClick={() => deleteImage(e, i)} className='absolute right-1 top-1 text-3xl text-white shadow-lg bg-black cursor-pointer '>
                                        <span className="iconify" data-icon="topcoat:cancel"></span>
                                    </div>
                                </div>)}
                        </div>

                        :</div>
                    {/* btns */}
                    <div className='flex gap-5 bg-white p-2'>
                        <div className='self-center'>
                            <label htmlFor='img' className='cursor-pointer' >
                                <svg width="35" height="35" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.3497 20.13L17.4699 20.2373L26.4185 29.5872C25.7574 30.0215 24.9957 30.2511 24.2188 30.25H9.36466C8.58793 30.2515 7.8262 30.0224 7.16496 29.5886L16.1136 20.2373L16.2208 20.1396C16.3844 20.0126 16.5813 19.9434 16.7838 19.9417C16.9863 19.9399 17.1842 20.0058 17.3497 20.13ZM24.2188 5.5C24.7701 5.5 25.316 5.61559 25.8253 5.84016C26.3346 6.06474 26.7974 6.3939 27.1872 6.80887C27.577 7.22383 27.8862 7.71646 28.0972 8.25863C28.3082 8.80081 28.4167 9.38191 28.4167 9.96875V25.7812C28.4167 26.6434 28.1868 27.4491 27.7903 28.1325L18.8274 18.7646L18.6621 18.6051C18.1399 18.1377 17.4799 17.8807 16.7977 17.8792C16.1154 17.8777 15.4544 18.1318 14.9305 18.5969L14.7561 18.766L5.79321 28.1311C5.38248 27.4254 5.16548 26.6114 5.16675 25.7812V17.1902C6.7027 17.8726 8.39452 18.0536 10.0273 17.7103C11.6601 17.367 13.1602 16.5148 14.3371 15.262C15.514 14.0092 16.3145 12.4123 16.637 10.6742C16.9596 8.93602 16.7895 7.13505 16.1485 5.5H24.2188ZM8.39591 1.375C9.32885 1.375 10.2526 1.57061 11.1146 1.95066C11.9765 2.33071 12.7596 2.88776 13.4193 3.59C14.079 4.29225 14.6023 5.12593 14.9593 6.04346C15.3163 6.96098 15.5001 7.94438 15.5001 8.9375C15.5001 9.93062 15.3163 10.914 14.9593 11.8315C14.6023 12.7491 14.079 13.5828 13.4193 14.285C12.7596 14.9872 11.9765 15.5443 11.1146 15.9243C10.2526 16.3044 9.32885 16.5 8.39591 16.5C6.51177 16.5 4.7048 15.7032 3.37251 14.285C2.04022 12.8668 1.29175 10.9432 1.29175 8.9375C1.29175 6.9318 2.04022 5.00825 3.37251 3.59001C4.7048 2.17176 6.51177 1.375 8.39591 1.375ZM21.6381 9.625C20.8666 9.625 20.1267 9.95124 19.5812 10.5319C19.0357 11.1126 18.7292 11.9003 18.7292 12.7215C18.7292 13.5427 19.0357 14.3303 19.5812 14.9111C20.1267 15.4918 20.8666 15.818 21.6381 15.818C22.4096 15.818 23.1494 15.4918 23.6949 14.9111C24.2404 14.3303 24.5469 13.5427 24.5469 12.7215C24.5469 11.9003 24.2404 11.1126 23.6949 10.5319C23.1494 9.95124 22.4096 9.625 21.6381 9.625ZM21.6381 11.6875C21.8957 11.6875 22.1428 11.7964 22.3249 11.9904C22.5071 12.1843 22.6094 12.4473 22.6094 12.7215C22.6094 12.9957 22.5071 13.2587 22.3249 13.4526C22.1428 13.6466 21.8957 13.7555 21.6381 13.7555C21.3805 13.7555 21.1334 13.6466 20.9512 13.4526C20.7691 13.2587 20.6667 12.9957 20.6667 12.7215C20.6667 12.4473 20.7691 12.1843 20.9512 11.9904C21.1334 11.7964 21.3805 11.6875 21.6381 11.6875ZM8.39591 4.125L8.27966 4.13462C8.15062 4.15972 8.03182 4.22605 7.93906 4.3248C7.8463 4.42354 7.78399 4.55001 7.76041 4.68737L7.75008 4.8125V8.25H4.51833L4.40208 8.261C4.27304 8.2861 4.15423 8.35243 4.06148 8.45117C3.96872 8.54991 3.90641 8.67638 3.88283 8.81375L3.8725 8.9375L3.88283 9.06125C3.90641 9.19862 3.96872 9.32509 4.06148 9.42383C4.15423 9.52257 4.27304 9.5889 4.40208 9.614L4.51833 9.625H7.75008V13.0666L7.76041 13.1904C7.78399 13.3277 7.8463 13.4542 7.93906 13.553C8.03182 13.6517 8.15062 13.718 8.27966 13.7431L8.39591 13.7555L8.51216 13.7431C8.64121 13.718 8.76001 13.6517 8.85277 13.553C8.94553 13.4542 9.00784 13.3277 9.03141 13.1904L9.04175 13.0666V9.625H12.2774L12.3936 9.614C12.5227 9.5889 12.6415 9.52257 12.7342 9.42383C12.827 9.32509 12.8893 9.19862 12.9129 9.06125L12.9232 8.9375L12.9129 8.81375C12.8892 8.67619 12.8267 8.54959 12.7337 8.45083C12.6407 8.35206 12.5216 8.28584 12.3923 8.261L12.2761 8.25H9.04175V4.8125L9.03141 4.68875C9.00808 4.55113 8.94587 4.42436 8.85309 4.32535C8.76032 4.22634 8.64139 4.15981 8.51216 4.13462L8.39591 4.125Z" fill="#004583" />
                                </svg>
                            </label>
                            <input type="file" id='img' className='hidden' onChange={(e) => { handleImg(e) }} />
                        </div>
                        <div className='self-center cursor-pointer'>
                            <svg width="35" height="35" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.6667 20.9896C20.6667 22.1029 20.2245 23.1707 19.4372 23.958C18.6499 24.7452 17.5822 25.1875 16.4688 25.1875H16.3875C16.9638 23.4077 16.9293 21.4865 16.2893 19.7286C15.6494 17.9707 14.4406 16.4769 12.8549 15.4843C11.2692 14.4916 9.39744 14.057 7.53659 14.2494C5.67575 14.4418 3.93247 15.2502 2.58341 16.5463V10.0104C2.58341 8.89706 3.02569 7.8293 3.81296 7.04204C4.60022 6.25478 5.66797 5.8125 6.78133 5.8125H16.4688C17.5822 5.8125 18.6499 6.25478 19.4372 7.04204C20.2245 7.8293 20.6667 8.89706 20.6667 10.0104V20.9896ZM28.1093 7.61179C28.3079 7.84546 28.4169 8.14215 28.4167 8.44879V22.5512C28.4168 22.7979 28.3463 23.0394 28.2135 23.2472C28.0806 23.4551 27.8911 23.6206 27.6672 23.7241C27.4433 23.8276 27.1944 23.8649 26.9501 23.8314C26.7057 23.798 26.476 23.6953 26.2881 23.5355L21.9584 19.8529V11.1445L26.2881 7.46454C26.4173 7.35458 26.5669 7.27116 26.7284 7.21905C26.8899 7.16694 27.0601 7.14715 27.2292 7.16083C27.3983 7.1745 27.5631 7.22137 27.7141 7.29875C27.8652 7.37612 27.9994 7.4825 28.1093 7.61179ZM15.5001 22.6042C15.5001 21.6712 15.3163 20.7474 14.9593 19.8855C14.6023 19.0236 14.079 18.2404 13.4193 17.5808C12.7596 16.9211 11.9765 16.3978 11.1146 16.0408C10.2526 15.6838 9.32885 15.5 8.39592 15.5C7.46298 15.5 6.53919 15.6838 5.67727 16.0408C4.81535 16.3978 4.03219 16.9211 3.37251 17.5808C2.71283 18.2404 2.18954 19.0236 1.83252 19.8855C1.4755 20.7474 1.29175 21.6712 1.29175 22.6042C1.29175 24.4883 2.04022 26.2953 3.37251 27.6276C4.7048 28.9599 6.51177 29.7083 8.39592 29.7083C10.2801 29.7083 12.087 28.9599 13.4193 27.6276C14.7516 26.2953 15.5001 24.4883 15.5001 22.6042ZM9.04175 23.25L9.04304 26.483C9.04304 26.6543 8.975 26.8186 8.85388 26.9397C8.73276 27.0608 8.56849 27.1289 8.39721 27.1289C8.22592 27.1289 8.06165 27.0608 7.94053 26.9397C7.81942 26.8186 7.75137 26.6543 7.75137 26.483V23.25H4.51575C4.34446 23.25 4.18019 23.182 4.05907 23.0608C3.93796 22.9397 3.86992 22.7755 3.86992 22.6042C3.86992 22.4329 3.93796 22.2686 4.05907 22.1475C4.18019 22.0264 4.34446 21.9583 4.51575 21.9583H7.75008V18.7292C7.75008 18.5579 7.81812 18.3936 7.93924 18.2725C8.06036 18.1514 8.22463 18.0833 8.39592 18.0833C8.5672 18.0833 8.73147 18.1514 8.85259 18.2725C8.97371 18.3936 9.04175 18.5579 9.04175 18.7292V21.9583H12.267C12.4383 21.9583 12.6026 22.0264 12.7237 22.1475C12.8448 22.2686 12.9129 22.4329 12.9129 22.6042C12.9129 22.7755 12.8448 22.9397 12.7237 23.0608C12.6026 23.182 12.4383 23.25 12.267 23.25H9.04175Z" fill="#004583" />
                            </svg>
                        </div>
                        {
                            readyToPost ? <div onClick={() => post()} className='ml-auto p-3 max-w-max bg-theme shadow-lg cursor-pointer rounded-circle'>
                                <svg width="30" height="30" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.5 4.58331C27.5 4.58331 16.0416 9.16665 16.0416 27.5C16.0416 34.6041 17.7833 40.6771 19.8687 45.4437C20.2352 46.2472 20.8259 46.9276 21.5699 47.4033C22.3139 47.8789 23.1794 48.1295 24.0625 48.125H30.9375C31.8205 48.1295 32.686 47.8789 33.43 47.4033C34.174 46.9276 34.7648 46.2472 35.1312 45.4437C37.2395 40.6771 38.9583 34.6041 38.9583 27.5C38.9583 9.16665 27.5 4.58331 27.5 4.58331ZM30.9375 43.5416H24.0625C21.7708 38.4083 20.625 33.0229 20.625 27.5C20.625 16.8666 24.9791 11.9166 27.5 9.9229C30.0208 11.9166 34.375 16.8666 34.375 27.5C34.375 33.0229 33.2291 38.4083 30.9375 43.5416ZM45.8333 50.4166L36.9875 46.8646C38.5916 43.3583 39.7375 39.7375 40.4479 36.0479L45.8333 50.4166ZM18.0125 46.8646L9.16663 50.4166L14.552 36.0479C15.2625 39.7375 16.4083 43.3583 18.0125 46.8646ZM27.5 27.5C24.9791 27.5 22.9166 25.4375 22.9166 22.9166C22.9166 20.3958 24.9791 18.3333 27.5 18.3333C30.0208 18.3333 32.0833 20.3958 32.0833 22.9166C32.0833 25.4375 30.0208 27.5 27.5 27.5Z" fill="#fff" />
                                </svg>
                            </div> : <div onClick={() => handleConfirm()} className='p-2 bg-white text-theme border-theme border-2  cursor-pointer ml-auto rounded-sm'>confirm</div>
                        }
                    </div>
                </div>

            </div> : <>
                <ErrorPage />
            </>}
        </>
    )
}

export default Write
