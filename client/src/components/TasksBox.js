import React from 'react';

const TasksBox = ({statusNames, tasks}) => {

    const testFunction = (e) => {
    }
    return (
        <div className='grid grid-flow-col w-full h-full gap-2'>
            {(statusNames.length !== 0 || statusNames !== {}) && tasks.length !== 0 ? statusNames.map((status, index) => {
                return (
                    <div key={index} className=' space-y-6'>
                        <h1 className='mt-4 text-center text-3xl'>{status.name}</h1>
                        <div className='flex flex-col gap-4 items-center'>
                            {tasks.map((task, index) => {
                                if (task.taskStatus === status.name) {
                                    return (
                                        <div key={index} className='bg-primary-accent-color rounded-lg shadow-sm shadow-primary-border-color w-full-85 p-4' draggable={true} onDrag={testFunction}>
                                            <h1 className=''>{task.taskName}</h1>
                                            <h2 className='text-xs text-gray-500'>{task.taskDate}</h2>

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
