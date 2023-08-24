import React from 'react'
import Tasks from './Tasks'
import { useDrop } from 'react-dnd'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Section({task, handleMap, status}) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop : (item)=>addItemtoSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

      const addItemtoSection = async (id)=>{
        console.log('dropped', id, status)
        try {
            const data = {
                taskId: id,
                taskStatus: status,
            };
    
            const response = await axios.post('http://localhost:3002/task_status', data);
    
            if (response.status === 200) {

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

                handleMap();
            }
        } catch (error) {
            console.log(error);

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
      }
  return (
    <>
    <ToastContainer/>
    <container ref={drop} className='flex items-center flex-col w-2/6 px-8 py-4'>
    <wrapper className=' flex flex-col items-center w-11/12 border-solid bg-gray-200 rounded-lg shadow-xl'>
                    <h1 className='text-center bg-gray-900 w-full text-white font-bold p-3 border-solid rounded-t-lg border-b-2 border-white'>
                        {status}
                    </h1>
                    {task.length>0?
                        task.map((item)=>{
                            return <Tasks taskId={item.id} task={item.task} status={item.status} handleMap={handleMap}/>
                        })
                        :<div className='p-3'></div>}
            </wrapper>
        </container>
        </>
  )
}
