import React, { useState } from 'react';
import ProjectBox from '../components/ProjectBox';
import Navbar from './../components/Navbar';

const Home = () => {
    const defaultValue =  [
        {
            projectId: 1,
            projectName: 'Discord Bot',
            projectDescription: 'This is a project description, lets test the description length to see how far it goes',
            projectDate: '2021-01-01',
            projectTime: '00:00',
            projectPriority: 'Low',
            projectStatus: 'In Progress',
        }, {
            projectId: 2,
            projectName: 'Discord Bot',
            projectDescription: 'This is a project description, lets test the description length to see how far it goes',
            projectDate: '2022-01-19',
            projectTime: '00:00',
            projectPriority: 'Low',
            projectStatus: 'In Progress',
        }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [project, setProject] = useState(defaultValue);


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
                className='items-center w-full border-4 border-slate-800 rounded-xl p-4 my-4 mr-4'
            >
                <h1 className='text-5xl text-center'>My Projects</h1>  
                <div className='grid grid-flow-row -space-y-6'>
                    
                    {project.map((project, index) => (
                        <ProjectBox proj={project} key={index} setProj={setProject}/>
                    ))}

                    {/* <div className='border-4 border-slate-800 rounded-xl p-4 my-4 mr-4 grid grid-flow-col'>
                        <div className='grid grid-flow-row'>
                            <div className='text-3xl mb-2'>{project.projectName}</div>
                            <div className='w-44 border-2 border-gray-600 rounded-full bg-gray-600'/>
                            <div className='flex flex-row gap-6'>
                                <div className='text-xs mt-2 text-gray-600'>{project.projectDate}</div>
                                <div className='text-xs mt-2 text-gray-600'>{project.projectTime}</div>
                                <div className='text-xs mt-2 text-gray-600'>{project.projectPriority}</div>
                            </div>
                        </div>
                        <div>
                            <div className='text-xl mb-2'>{project.projectDescription}</div>
                            <select 
                                className='bg-inherit text-lg py-2 hover:bg-primary-accent-color transition-all duration-200 rounded-xl text-primary-text-color' 
                                id='projectStatus'
                                value={project.projectStatus.replace(' ', '')}
                                onChange={(e) => setProject({...project, projectStatus: e.target.value})}
                            >
                                <option value='Completed' className='text-sm mt-2 text-primary-text-color'>Completed</option>
                                <option value='InProgress' className='text-sm mt-2 text-primary-text-color'>In Progress</option>
                                <option value='NotStarted' className='text-sm mt-2 text-primary-text-color'>Not Started</option>
                            </select>
                        </div>
                        <div className='flex h-full justify-end items-center'>
                            <MdDeleteForever className='scale-175 transition-all duration-300 hover:scale-200'/>

                        </div>
                    </div> */}
                </div>  
            </div>


        </div>
    );
}

export default Home;
