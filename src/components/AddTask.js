import React, {useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask({closeModal, handleMap}) {
  const [task, setTask] = useState('')
  console.log(task)


  const handleAddtask = async (event, task)=>{
    event.preventDefault()

    const data = {
        task : task,
        userId : sessionStorage.getItem('userId'),
        status : "To-do"
    }
console.log(data)
    try{
      const response = await axios.post('http://localhost:3002/add_task', data)
      // console.log(response.data)

      if(response.status === 200){
            // console.log(response)
            
            const { message } = response.data;

            toast.success(message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            })

            closeModal()
            handleMap()
        }
      
    }
    catch(error){
      if (error.response.status === 400) {
        // console.log(response.status)
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
    <div>
      <ToastContainer/>
    <div className='modal-wrapper fixed top-0 left-0 right-0 bottom-0 bg-gray-300 opacity-75 '
    onClick={closeModal}></div>
    <div className='modal-container flex flex-col items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 bg-white p-4 border-solid rounded-md'>
        <h1 className='font-bold text-xl'>Add Task</h1>
            <textarea 
            type="text"
            className="border-4 border-gray-400 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-4/5 h-4/5 my-4"
            placeholder="Task Description"
            required
            value={task} onChange={(e)=>setTask(e.target.value)}></textarea>

            <button className="self-end bg-lime-700 text-white active:bg-lime-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 mb-1 "
            onClick={(event)=>handleAddtask(event, task)}
            >Add Task</button>
        
    </div>
    
    </div>
  )
}
