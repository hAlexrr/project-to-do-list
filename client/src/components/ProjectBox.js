import React, { lazy, useState } from 'react';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";


const ProjectBox = ({proj, setProj, loading}) => {

    const [isOpening, setIsOpening] = useState(false);

    const project = proj;
    const setProject = setProj;

    const boxClassname = 'border-4 border-slate-800 rounded-xl p-4 my-4 mr-4 grid grid-flow-col hover:border-primary-accent-color transition-all duration-200 ' + (loading ? 'animate-pulse opacity-5' : '') ;

    const deleteProject = () => {
        setProject(prevProject => prevProject.filter((proj) => proj.projectId !== project.projectId));
    }

    const openProject = () => {

        console.log('Opening project -> ' + project.projectId);
    }

    return (
        <div>
            <div className={boxClassname}>
                        <div className='grid grid-flow-row'>
                            <div className='text-xl font-bold mb-2'>{project.projectName}</div>
                            <div className='w-44 border-2 border-gray-600 rounded-full bg-gray-600 '/>
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
                                value={project.projectStatus.indexOf(' ') !== -1 ? project.projectStatus.replace(' ', '') : project.projectStatus}
                                onChange={(e) => setProject(prevProject => prevProject.map((proj) => proj.projectId === project.projectId ? {...proj, projectStatus: e.target.value} : proj))}
                            >
                                <option value='Completed' className='text-sm mt-2 text-primary-text-color'>Completed</option>
                                <option value='InProgress' className='text-sm mt-2 text-primary-text-color'>In Progress</option>
                                <option value='NotStarted' className='text-sm mt-2 text-primary-text-color'>Not Started</option>
                            </select>
                        </div>
                        <div className='flex h-full justify-end items-center'>
                            <MdModeEdit className='scale-175 mr-4 transition-all duration-300 hover:scale-200' onClick={openProject}/>
                            <MdDeleteForever className='scale-175 transition-all duration-300 hover:scale-200' onClick={deleteProject}/>

                        </div>
                    </div>
        </div>
    );
}

export default ProjectBox;
