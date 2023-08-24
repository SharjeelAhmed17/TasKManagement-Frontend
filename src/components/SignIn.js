import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import background from '../assets/background.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignIn() {

    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');


  const navigate = useNavigate()

  const handleSign_in = async (event)=>{
    event.preventDefault()

    const data = {
        email : email,
        password : password,
    }

    try{
      const response = await axios.post('http://localhost:3002/sign_in', data)
      // console.log(response.data)

      if(response.status === 200){
            // console.log(response)
            
            const { user, message, token} = response.data;
            sessionStorage.setItem('userId', user.id)
            sessionStorage.setItem('user', user.fullName)
            sessionStorage.setItem('token', token)
          
            toast.success(message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            }
            )
            
              navigate('/dash')

      }
      
    }
    catch(error){
      if (error.response.status === 400) {
        console.log(error)
        const { message } = error.response.data
        toast.error(message,{
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
        )
      }  
      console.log(error)

    }
    
  }

  return (
    <>
    <ToastContainer/>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-emerald-100"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              backgroundImage:`url(${background})`,
              backgroundSize: " 100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity : 0.8,
              height : "100%"
            }}
          ></div>
          <div className="relative top-10 container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-auto mb-6 shadow-lg rounded-lg bg-gray-300 bg-opacity-5 border-0">
                  
                  {/* social Sign in */}
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h3 className="text-gray-900 text-xl font-bold">
                        Task Managment System
                      </h3>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  {/* end */}

                  {/*form */}
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-900 text-center mb-3 font-bold">
                      <large>Sign in to account</large>
                    </div>
                    <form onSubmit={handleSign_in}>

                      {/*email */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block text-black text-xs font-bold mb-2 text-left"
                          htmlFor="grid-email"
                        >
                          Email:
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder='example@abc.com' required
                          style={{ transition: "all .15s ease" }}
                          value={email} onChange={(e)=>setEmail(e.target.value)}
                        />
                      </div>

                      {/*password */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block text-black text-xs font-bold mb-2 text-left"
                          htmlFor="grid-password"
                        >
                          Password:
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder='Password' required
                          style={{ transition: "all .15s ease" }}
                          value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                      </div>
                      
                      {/* button */}
                      <div className="text-center mt-6">

                        {/* sign in */}
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button>
                        <div className="text-gray-900 text-center mb-3 font-bold">
                          <small>Create an account</small>
                        </div>
                        

                        {/* sign up */}
                        <Link to = {'/signUp'}>
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign Up
                        </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
      
    
  )
}
