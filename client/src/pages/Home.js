import React, { useEffect, useState } from 'react';
import ProjectBox from '../components/ProjectBox';
import Navbar from './../components/Navbar';

const Home = () => {
    const loadingValue =  [
        {
            projectId: 1,
            projectName: 'Loading',
            projectDescription: 'Loading',
            projectDate: 'Loading',
            projectTime: 'Loading',
            projectPriority: 'Loading',
            projectStatus: 'Loading',
        }, 
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [project, setProject] = useState([]);
    const [noData, setNoData] = useState(false);
    
    useEffect(() => {
        // Fetch the projects from the database
        // setProject(data);
        const api_call = fetch('http://localhost:9000/userProjects/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': 1
            },

        })

        api_call.then(res => res.json())
        .then(data => {
            setTimeout(() => {
                if (data.data.length === 0) {
                    setNoData(true);
                }
                setProject(data.data);
            }, 2000);
        })
        
    }, []);


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
                <h1 className='text-5xl text-center mb-4'>My Projects</h1>  
                <div className='h-full-85 overflow-y-auto rounded-md'>
                    
                    { project.length !== 0 ? project.map((project, index) => (
                        <ProjectBox proj={project} key={index} setProj={setProject} loading={false}/>
                    )) : noData === false ? <ProjectBox proj={loadingValue[0]} key={1} setProj={setProject} loading={true}
                    /> : <h1 className='text-3xl text-center text-primary-text-color'>No Projects</h1>
                    }

                </div>  
                <h2 className='text-sm text-right mt-2 text-gray-600'>Project Count: {project.length}</h2>
            </div>


        </div>
    );
}

export default Home;
