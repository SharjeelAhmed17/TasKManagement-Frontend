import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../assets/avatar.png'
import AddTask from './AddTask';

export default function Nav() {

    const navigate = useNavigate()

    const signOut = ()=>{

        sessionStorage.clear();
        toast.success("Singout successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
        )
        navigate('/signIn')
      }
  return (
    <>
    <ToastContainer/>
    <nav>
      <div className='bg-gray-900 text-white font-bold uppercase px-6 py-3 shadow  outline-none py-4 flex inline w-full flex justify-between'>
        <div>
        <h1 className='text-[32px]'>DASHBORD</h1>
        </div>
        <div className='flex flex-row items-center'>
            <img src={avatar} alt="" className=' h-11 mr-3 rounded-full'/>
            <h1 className='mr-3'>{sessionStorage.getItem('user')}</h1>
        <button className="bg-gray-700 text-white active:bg-gray-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 "
        onClick={signOut}
        >LogOut</button>
        </div>
      </div>
    </nav>
    </>
  )
}
