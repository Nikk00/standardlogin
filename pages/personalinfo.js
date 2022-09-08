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
    //console.log(router.query.email);
    useEffect(() => {
        /* const profile = {} */
        setLoading(true)
        setLoadingProfile(true)
        info()
        async function info(){
            await fetch(`${process.env.NEXTAUTH_URL}api/users/${router.query.email}`, {
                method: "GET"
            }).then((res)=> res.json()).then((data) => {
                setData(data)
                setLoading(false)
                fetch(`${process.env.NEXTAUTH_URL}api/profile/${data[0]._id}`, {
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
      if (isLoading) return <p>Loading...</p>
      if (!data) return <p>No profile data</p>

      if (isLoadingProf) return <p>Loading...</p>
      if (!dataProfile) return <p>No profile data</p>
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
                            <div className='grid col-span-2 place-content-center justify-start pt-2 pb-2 '>
                                
                                {/* <img className='w-20 h-20 rounded-md' src={session.user.image} alt=''></img> */}
                                {dataProfile.photo ? (
                                <Image src={`/data/uploads/${dataProfile.photo.name}`} className='rounded-md' width={58} height={58} alt='' />
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
