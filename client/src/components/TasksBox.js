import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

const TasksBox = ({statusNames, tasks}) => {

    const testFunction = (e) => {
        console.log(e)
    }

    const deleteProject = () => {
        console.log('delete')
    }
    return (
        <div 
            className='grid grid-flow-col w-full h-full gap-2'
        >
            {(statusNames.length !== 0 || statusNames !== {}) && tasks.length !== 0 ? statusNames.map((status, index) => {
                return (
                    <div key={index} className=' space-y-6' id={status.id}>
                        <h1 className='mt-4 text-center text-3xl'>{status.name}</h1>
                        <div className='flex flex-col gap-2 items-center'>
                            {tasks.map((task, index) => {
                                if (task.taskStatus === status.name) {
                                    return (
                                        <div key={index} 
                                        className='bg-primary-accent-color rounded-lg shadow-sm shadow-primary-border-color w-full-85 p-4 border-4 border-primary-bg-color hover:border-lime-600 transition-all duration-300' 
                                        draggable={true} 
                                        onDragEnd={testFunction}>
                                            <h1 className=''>{task.taskName}</h1>
                                            <div className='flex gap-2'>
                                                <h2 className='text-xs text-gray-500'>{task.taskDate}</h2>
                                                <h2 className='text-xs text-gray-500'>{task.taskPriority}</h2>
                                                <MdDeleteForever 
                                                    className='transition-all duration-300 hover:scale-125 cursor-pointer' 
                                                    title='Delete Task'
                                                    onClick={deleteProject}/>
                                            </div>

                                        </div>

                                    )}
                                })
                                
                            }
                        </div>
                    </div>
                    )}) : <div>Loading...</div>}
        </div>
    );
}

export default TasksBox;
