import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
import AddTask from '../AddTask';
import Section from './Section';




export default function Dashboard() {
    
    const [todo, setTodo] = useState([])
    const [inprogress, setInprogress] = useState([])
    const [completed, setCompleted] = useState([])
    const [showModal, setShowModal] = useState(false)

    const closeModal = ()=> setShowModal(false)



    const handleMap = async () => {
        try {
          const data = {
            userId: sessionStorage.getItem('userId'),
          }
    
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
    
          const response = await axios.post('http://localhost:3002/task_map', data, { headers, withCredentials: true });
          console.log(response);
      
          if (response.status === 200) {
            const { todo, inProgress, completed } = response.data;
            setTodo(todo);
            setInprogress(inProgress);
            setCompleted(completed);
          }

        }catch (error) {
          console.log(error);
          if (error.response && error.response.status === 400) {
            const { message } = error.response.data;
            toast.error(message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'colored',
            });
          }
        }
      }

      useEffect(()=>{
        handleMap()
      },[])
    

  return (
    <>
    <ToastContainer/>
    <Nav/>
    <container  className='flex flex-row py-8'>

        {/*To-do */}
            <Section task={todo} handleMap={handleMap} status={"To-do"}/>
        

        {/*To-do */}
            <Section task={inprogress} handleMap={handleMap} status={"In-progress"}/>

        {/*completed */}
            <Section task={completed} handleMap={handleMap} status={"Completed"}/>

        <button className="fixed bottom-0 right-0 m-4 bg-lime-700 text-white active:bg-lime-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 mb-1 "
        onClick={() => setShowModal(true)}
        >Add Task</button>
        {showModal && <AddTask closeModal={closeModal} handleMap={handleMap}/>}
    </container>
    </>
  )
}
