/* import type { NextPage } from 'next' */
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '../components/nav'
import { useSession,getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import swal from '@sweetalert/with-react';
const logo = require('/public/data/uploads/avatar.png'); 
const Personalinfo = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { data: session } = useSession()
    //console.log(session)
    const [dataProfile, setDataProfile] = useState(null)
    const [isLoadingProf, setLoadingProfile] = useState(false)

    const router = useRouter()
    var imagen
    //console.log(router.query.email);
    useEffect(() => {
        /* const profile = {} */
        setLoading(true)
        setLoadingProfile(true)
        info()
        async function info(){
            await fetch(`/api/users/${router.query.email}`, {
                method: "GET"
            }).then((res)=> res.json()).then((data) => {
                setData(data)
                setLoading(false)
                fetch(`/api/profile/${data[0]._id}`, {
                    method: "GET"
                }).then((res)=> res.json()).then((data) => {
                    console.log(data)
                    setDataProfile(data)
                    setLoadingProfile(false)
                }).catch( (e) =>{
                    console.log(e)
                })
            }).catch( (e) =>{
                console.log(e)
            })
            
        }
    }, [])
    
      if (isLoading) return <div className='flex place-content-center mt-96' role="status">
            <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      if (!data) return <p>No profile data</p>

      if (isLoadingProf) return <div role="status" className='flex place-content-center mt-96'>
      <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
      </svg>
      <span className="sr-only">Loading...</span>
  </div>
      if (!dataProfile) return <p>No profile data</p>
      imagen = Buffer.from(dataProfile.photo.data).toString()
  return (
    <div className="font-sans bg-white">
        <Nav 
        name={dataProfile.name} 
        img={dataProfile.photo ? (dataProfile.photo.name) : (null)}
        email={router.query.email}
        />

        <div className='flex flex-col items-center'>
            <div className='grid place-content-center mb-4'>
                <h1 className='text-center font-semibold text-2xl'>Personal info</h1>
                <p className='text-center'>Basic info, like your name and photo</p>
            </div>
            
            <div className='grid w-full h-full lg:w-1/2 lg:h-1/2 md:w-1/2 md:h-1/2 grid-rows-7  bg-white lg:border-solid md:border-solid rounded-lg border-slate-200 border-2 border-hidden'>
                <div className='row-span-1 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-2 gap-2 p-8'>
                        <div>
                            <p className='font-semibold text-xl'>Profile</p>
                            <p>Some info may be visible to other people</p>
                        </div>
                        <div className='grid place-content-center justify-end'>
                            <button className='w-32 h-10 rounded-lg border-2' onClick={()=>{router.push({pathname: '/changeinfo', query: {email: data[0].email} })}}>Edit</button>
                        </div>
                    </div>
                </div>
                <div className='row-span-2 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3'>
                            <div className='pt-4 pb-4 px-7'>
                                <p className='text-gray-400'>PHOTO</p>
                            </div>
                            <div className='grid col-span-2 place-content-center justify-start pt-2 pb-2'>
                            {/* <Image src={`/data/uploads/${dataProfile.photo.name}`} className='rounded-md' width={58} height={58} alt='' /> */}
                                {/* <img className='w-20 h-20 rounded-md' src={session.user.image} alt=''></img> */}
                                {dataProfile.photo ? (
                                <Image src={`data:${dataProfile.photo.contentType};base64,${imagen}`} className='rounded-md' width={58} height={58} alt='' />
                            ) : (
                                <Image src={logo} className='rounded-md' width={58} height={58} alt='' />
                            )}
                            </div>
                    </div>
                </div>
                <div className='row-span-3 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>NAME</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>{dataProfile.name ? (
                                <p>{dataProfile.name}</p>
                            ) : (
                                <p>New User</p>
                            )}</p>
                        </div>
                    </div>
                </div>
                <div className='row-span-4 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>BIO</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>{dataProfile.bio ? (
                                <p>{dataProfile.bio}</p>
                            ) : (
                                <p>I am software developer and a big fan of devchallenges..</p>
                            )}</p>
                        </div>
                    </div>
                </div>
                <div className='row-span-5 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>PHONE</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>{dataProfile.phone ? (
                                <p>{dataProfile.phone}</p>
                            ) : (
                                <p>12345678</p>
                            )}</p>
                        </div>
                    </div>
                </div>
                <div className='row-span-6 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>EMAIL</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>{data[0].email ? (
                                <p>{data[0].email}</p>
                            ) : (
                                <p>ejemplo@gmail.com</p>
                            )}</p>
                        </div>
                    </div>
                </div>
                <div className='row-span-7'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>PASSWORD</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>****************</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Personalinfo
