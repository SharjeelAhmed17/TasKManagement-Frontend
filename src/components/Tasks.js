import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDrag } from 'react-dnd';

export default function Tasks({taskId, task, status, handleMap}) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item : { id: taskId},
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
      }))

      console.log(isDragging)

    const handleDelete = async (event, taskId)=>{
        event.preventDefault()
    
        const data = {
            taskId : taskId,
            userId : sessionStorage.getItem('userId'),
        }
    console.log(data)
        try{
          const response = await axios.post('http://localhost:3002/delete_task', data)
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
    <>
    <ToastContainer/>
    <task ref = {drag} className= {`flex flex-row justify-between items-center p-3 bg-gray-400 w-4/5 my-2 border-solid rounded-md cursor-grab ${isDragging ? "opactity-75" : "opacity-100"}`}>
        <p className='text-white font-bold'>{task}</p>
        <button className='bg-gray-900 text-white active:bg-gray-700 text-sm  px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto'
        onClick={(event)=>handleDelete(event,taskId)}>Delete</button>
    </task>
    </>

  )
}
