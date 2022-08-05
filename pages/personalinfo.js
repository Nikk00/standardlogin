/* import type { NextPage } from 'next' */
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';
import Nav from '../components/nav'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const logo = require('/public/avatar.png'); 

const Personalinfo = () => {

  return (
    <div className="font-sans bg-white">
        <Nav />
        <div className='flex flex-col items-center'>
            <div className='grid place-content-center mb-4'>
                <h1 className='text-center font-semibold text-2xl'>Personal info</h1>
                <p className='text-center'>Basic info, like your name and photo</p>
            </div>
            
            <div className='grid w-1/2 h-1/2 grid-rows-7  bg-white border-solid rounded-lg border-slate-200 border-2'>
                <div className='row-span-1 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-2 gap-2 p-8'>
                        <div>
                            <p className='font-semibold text-xl'>Profile</p>
                            <p>Some info may be visible to other people</p>
                        </div>
                        <div className='grid place-content-center justify-end'>
                            <Link href='/changeinfo'><button className='w-32 h-10 rounded-lg border-2'>Edit</button></Link>
                        </div>
                    </div>
                </div>
                <div className='row-span-2 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3'>
                            <div className='pt-4 pb-4 px-7'>
                                <p className='text-gray-400'>PHOTO</p>
                            </div>
                            <div className='grid col-span-2 place-content-center justify-start pt-2 pb-2 '>
                                <Image src={logo} className='rounded-md' width={58} height={58} alt='' />
                                {/* <img className='w-20 h-20 rounded-md' src={session.user.image} alt=''></img> */}
                            </div>
                    </div>
                </div>
                <div className='row-span-3 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>NAME</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>asdasd</p>
                        </div>
                    </div>
                </div>
                <div className='row-span-4 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>BIO</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>I am software developer and a big fan of devchallenges..</p>
                        </div>
                    </div>
                </div>
                <div className='row-span-5 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>PHONE</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>+569 58597458</p>
                        </div>
                    </div>
                </div>
                <div className='row-span-6 border-solid border-slate-300 border-b-2'>
                    <div className='grid grid-cols-3 p-8'>
                        <div>
                            <p className='text-gray-400'>EMAIL</p>
                        </div>
                        <div className='grid col-span-2 place-content-center justify-start'>
                            <p>asdas</p>
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

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
  
    /* if(!session) return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    } */
    
    console.log(session)
    return {
      props:{ session }
    }
}

export default Personalinfo
