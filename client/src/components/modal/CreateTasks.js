import React, { useState } from 'react';

const CreateTasks = ({ShowCreateTasks, SetCreateTasks, Statuses, ProjectUsers, ProjectId, UserId, Token, GetTasks}) => {

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState(0);
    const [taskPriority, setTaskPriority] = useState(0);
    const [taskUser, setTaskUser] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const closeModal = () => {
        setTaskName('');
        setTaskDescription('');
        setTaskStatus(0);
        setTaskPriority(0);
        SetCreateTasks(false);
    }

    const taskNameChange = (e) => {
        setTaskName(e.target.value);
    }

    const taskDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    }

    const taskStatusChange = (e) => {
        setTaskStatus(e.target.value);
    }

    const taskPriorityChange = (e) => {
        setTaskPriority(e.target.value);
    }

    const taskUserChange = (e) => {
        console.log(e.target.value);
        setTaskUser(e.target.value);
    }

    const createTask = () => {
        setErrorMessage('');
        console.log(taskName, taskDescription, taskStatus, taskPriority, taskUser);
        if(taskName === '' || taskDescription === '' || taskStatus === 0 || taskPriority === 0 || taskUser === 0){
            setErrorMessage('All fields are required');
            return
        } 

        const modalDiv = document.getElementById('modalDiv')

        // Add animate-bounce class to modalDiv
        if(modalDiv.classList.contains('animate-pulse')){
            modalDiv.classList.remove('animate-pulse');
        }
        modalDiv.classList.add('animate-pulse');


        const headers = {
            'Content-Type': 'application/json',
            'projectid': ProjectId,
            'userId': UserId,
            'token': Token,
            taskName: taskName,
            taskDescription: taskDescription,
            taskStatus: taskStatus,
            taskPriority: taskPriority,
            taskuserid: taskUser
        }

        console.log(headers)

        const api_call = fetch('http://localhost:9000/createTask/', {
            method: 'POST',
            headers: headers,
        })

        const response = api_call.then(res => res.json())

        response.then(data => {
            if(modalDiv.classList.contains('animate-pulse')){
                modalDiv.classList.remove('animate-pulse');
            }
            if(data.message === 'Success'){
                GetTasks(Token)
                closeModal();
            } else {
                setErrorMessage(data.message);
            }
        })
    }


    return ShowCreateTasks === true ? (
        <div className='bg-inherit opacity-80 fixed'>
            <div className="flex h-full-85 justify-center items-center">
                <div id='modalDiv' className="flex-col justify-center bg-inherit py-12 px-24 border-4 border-blue-500 rounded-xl text-white text-2xl bg-primary-bg-color">
                    <h1 className="text-3xl text-center mb-4">Create Tasks</h1>
                    <h2 className="text-center text-red-500">{errorMessage}</h2>
                    <div className="grid grid-flow-col items-center">
                        <input 
                            className="text-lg bg-primary-accent-color border-2 border-blue-500 rounded-lg p-2 m-2 hover:scale-105 transition-all" 
                            type="text" 
                            value={taskName}
                            placeholder="Task Name" 
                            id='taskName'
                            autoComplete='off'
                            onChange={taskNameChange}
                        />

                        <select
                            className='text-lg bg-primary-accent-color border-2 border-blue-500 rounded-lg p-2 m-2 hover:scale-105 transition-all'
                            value={taskUser}
                            onChange={taskUserChange}
                        >
                            <option value={0}>Select User</option>
                            {ProjectUsers.map((user, index) => {
                                return (
                                    <option key={index} value={user.userId}>{user.username}</option>
                                )
                            })}
                        </select>
                        
                    </div>
                        <textarea 
                            id="taskDescription" 
                            className='rounded-lg p-2 border-2 border-inherit hover:scale-105 transition-all duration-300 bg-primary-accent-color m-2 resize-none scale-102' 
                            cols="30" 
                            rows="3" 
                            placeholder='Enter task description'
                            value={taskDescription}
                            onChange={taskDescriptionChange}
                        />
                    
                    <div className="grid grid-flow-col items-center gap-4">
                        <select 
                            className='text-lg h-10 pl-1 bg-primary-accent-color transition-all duration-200 rounded-xl text-primary-text-color hover:scale-105 border-2 border-blue-500 mb-2' 
                            value={taskStatus}
                            onChange={taskStatusChange}   
                        >
                            <option 
                                id='taskStatus'                           
                            >Select Status</option>
                            {Statuses.map((status, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={status.id}

                                    >
                                        {status.name}
                                    </option>
                                )
                            })}
                        </select>
                        <select 
                            className='text-lg h-10 pl-1 bg-primary-accent-color transition-all duration-200 rounded-xl text-primary-text-color hover:scale-105 border-2 border-blue-500 mb-2' 
                            id="taskPriority"
                            value={taskPriority}
                            onChange={taskPriorityChange}
                        >
                            <option value="0">Select Priority</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="bg-primary-accent-color border-2 border-blue-500 rounded-lg p-2 m-2 hover:scale-105 transition-all hover:bg-lime-600" onClick={createTask}>Create</button>
                        <button className="bg-primary-accent-color border-2 border-blue-500 rounded-lg p-2 m-2 hover:scale-105 transition-all hover:bg-red-600" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (<></>);
}

export default CreateTasks;
