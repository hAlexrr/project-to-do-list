import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './../components/Navbar';
import TasksBox from './../components/TasksBox';
import { MdCreate } from 'react-icons/md';
import CreateTasks from '../components/modal/CreateTasks';

const Project = () => {
    const params = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [tasksStatusNames, setTasksStatusNames] = useState([]);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [projectUsers, setProjectUsers] = useState([]);

    useEffect(() => {
        let main = document.getElementById('main-box')

        const api_call = fetch('http://localhost:9000/checkProjectAccess/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectid': params.id,
                'userId': 1
            },
        })

        const apiJson = api_call.then(res => res.json())

        apiJson.then(data => {
            setToken(data.token);
            if(data.token !== ''){
                getProjectData(data.token);
                getProjectTasks(data.token);
                getTasksStatusNames(data.token);
                getProjectUsers(data.token);
            }
        })
        setTimeout(() => {
            main.style.transform = 'translateY(0%)';
        }, 2000);
        
    }, [])

    const getProjectUsers = (strToken) => {
        const api_call = fetch('http://localhost:9000/projectUsers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectid': params.id,
                'userId': 1,
                'token': strToken
            },
        })

        api_call.then(res => res.json())
        .then(data => {
            setProjectUsers(data.data);
        })
    }

    const getProjectData = (strToken) => {
        const api_call = fetch('http://localhost:9000/projectData/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectid': params.id,
                'userId': 1,
                'token': strToken
            },
        })

        const apiJson = api_call.then(res => res.json())

        apiJson.then(data => {
            setProjectData(data.data);
        })
    }

    const getProjectTasks = (strToken) => {
        const api_call = fetch('http://localhost:9000/projectTasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectid': params.id,
                'userid': 1,
                'token': strToken
            },
        })

        const apiJson = api_call.then(res => res.json())

        apiJson.then(data => {
            setTasks(data.data);
        })
    }

    const getTasksStatusNames = (strToken) => {
        const api_call = fetch('http://localhost:9000/tasksStatusNames/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectid': params.id,
                'userid': 1,
                'token': strToken
            },
        })

        const apiJson = api_call.then(res => res.json())

        apiJson.then(data => {
            setTasksStatusNames(data.data);
        })
    }

    const navbar_controller = () => {
        const navBar = document.querySelector('#main-navbar');

        setIsOpen(prevIsOpen => !prevIsOpen);

        // Translate the navbar to the left if it is open
        if (isOpen) {
            navBar.style.transform = 'translateX(-100%)';
        }
        // Translate the navbar to the right if it is closed
        else {
            navBar.style.transform = 'translateX(0%)';
        }
    }

    return (
        <div className='w-screen h-screen bg-primary-bg-color inline-flex gap-4 text-primary-text-color'>
            <Navbar/>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 hover:scale-125 transition-all duration-200 absolute left-4 top-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="white"
                onClick={navbar_controller}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <div
                id='main-box' 
                className='flex flex-col items-center w-full border-4 border-gray-800 my-4 mr-4 rounded-lg p-4 transition-all duration-500' style={{transform: 'translateY(-150%)'}} >
                <h1 className='text-4xl'>{projectData.projectName}</h1>
                <h2 className='text-2xl'>Project ID: {params.id}</h2>                        

                <div className='flex w-full bg-primary-accent-color rounded-lg p-4 mt-4'>
                    <MdCreate 
                        className='hover:scale-125 transition-all duration-200 cursor-pointer select-none'
                        title='Create Task'
                        size={25}          
                        onClick={() => setShowCreateTaskModal(prevShowCreateTasksModal => !prevShowCreateTasksModal)}                      
                    />

                </div>

                <CreateTasks 
                    ShowCreateTasks={showCreateTaskModal} 
                    SetCreateTasks={setShowCreateTaskModal} 
                    Statuses={tasksStatusNames} 
                    ProjectUsers={projectUsers} 
                    SetTasks={setTasks}
                    ProjectId={params.id} 
                    UserId={1} 
                    Token={token}
                    GetTasks={getProjectTasks}
                    />

                {tasks.length !== 0 && tasksStatusNames.length !== 0 ? <TasksBox statusNames={tasksStatusNames} tasks={tasks}></TasksBox> : <h1>Loading...</h1>}
            </div>
            
        </div>
    );
}

export default Project;
